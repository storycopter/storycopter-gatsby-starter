const path = require('path');
const _ = require('lodash');

exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      // 'react-dom': '@hot-loader/react-dom',
    };
  }
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src/templates'), 'node_modules'],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const tpls = {
    page: path.resolve(__dirname, 'src/templates/PageTpl.js'),
    contents: path.resolve(__dirname, 'src/templates/ContentsTpl.js'),
    credits: path.resolve(__dirname, 'src/templates/CreditsTpl.js'),
    error: path.resolve(__dirname, 'src/templates/ErrorTpl.js'),
    home: path.resolve(__dirname, 'src/templates/HomeTpl.js'),
  };

  const allEssentials = await graphql(`
    {
      allEssentialsJson {
        edges {
          node {
            meta {
              path
              title
              uid
            }
          }
        }
      }
    }
  `);
  const allPages = await graphql(`
    {
      allPagesJson(sort: { fields: meta___order }) {
        edges {
          node {
            meta {
              coverEnabled
              coverImage {
                name
              }
              order
              path
              summary
              title
              uid
            }
          }
        }
      }
    }
  `);
  const allSiteData = await graphql(`
    {
      allSiteJson {
        edges {
          node {
            meta {
              coverEnabled
              coverImage {
                name
              }
              publisher
              summary
              title
              uid
            }
            brand {
              backgColor
              brandColor
              faviconEnabled
              logoEnabled
              favicon {
                name
              }
              logo {
                name
              }
              textColor
              typography
            }
            motivation {
              enabled
              label
              link
            }
            sound {
              enabled
              track {
                name
              }
            }
          }
        }
      }
    }
  `);

  const creators = [
    {
      gql: 'allEssentialsJson',
      src: allEssentials,
      tpl: null,
    },
    {
      gql: 'allPagesJson',
      src: allPages,
      tpl: tpls.page,
    },
  ];

  creators.forEach(creator => {
    const { edges } = creator.src.data[creator.gql];
    edges.forEach(({ node }) => {
      const { path, uid } = node.meta;

      const dummyPages = ['essentialsDummy', 'pagesDummy', 'siteDummy'];

      // skip the dummy pages (used to sanitise Gatsby’s graphql queries)
      if (dummyPages.includes(uid)) return null;

      const pages = _.filter(allPages.data.allPagesJson.edges, function (o) {
        if (!dummyPages.includes(o.node.meta.uid)) return o.node.meta;
      }).map(o => o.node.meta);

      const essentials = _.filter(allEssentials.data.allEssentialsJson.edges, function (o) {
        if (!dummyPages.includes(o.node.meta.uid)) return o.node.meta;
      }).map(o => o.node.meta);

      const siteData = _.filter(allSiteData.data.allSiteJson.edges, o =>
        !dummyPages.includes(o.node.meta.uid) ? o : null
      ).map(o => o.node)[0];

      console.log('—— this', uid, creator.tpl, creator.tpl || tpls[uid]);

      createPage({
        component: creator.tpl || tpls[uid],
        context: {
          uid: uid,
          contextData: {
            allEssentials: essentials,
            allPages: pages,
            allSiteData: siteData,
          },
        },
        path: path,
      });
    });
  });
};
