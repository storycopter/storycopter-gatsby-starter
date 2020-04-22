import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { componentMap } from '@storycopter/ui';

import Layout from './partials/Layout';
import constructImageObj from './utils/constructImageObj';
import docTheme from './theme/docTheme';

export default function PageTpl({
  data: {
    essential: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
  },
  pageContext,
  ...pageProps
}) {
  // console.group('PageTpl.js');
  // console.log('pageMeta', pageMeta);
  // console.log('pageFiles', pageFiles);
  // console.log('pageContext', pageContext);
  // console.log('pageElements', pageElements);
  // console.groupEnd();

  return (
    <ThemeProvider theme={docTheme}>
      <Layout pageContext={pageContext} location={pageProps.location}>
        {_.sortBy(pageElements, [o => o.order]).map(({ id, type, settings }, i) => {
          const Component = componentMap[type];

          // construct backgImage object (e.g. Headline)
          const backgImage = {
            ...settings?.backgImage,
            ...constructImageObj(pageFiles, settings?.backgImage?.name),
          };

          // construct images object (e.g. Gallery)
          const images = settings?.images?.map(image => ({
            ...image,
            ...constructImageObj(pageFiles, image.name),
          }));

          return <Component {...settings} key={id} backgImage={backgImage} images={images} />;
        })}
      </Layout>
    </ThemeProvider>
  );
}

export const pageQuery = graphql`
  query PageTplQuery($uid: String!) {
    essential: pagesJson(meta: { uid: { eq: $uid } }) {
      meta {
        path
        title
        uid
      }
      elements {
        id
        order
        type
        settings {
          align
          backgColor
          backgImageEnabled
          backgImage {
            name
          }
          images {
            backgImageEnabled
            caption
            name
            order
          }
          fullSize
          maskColor
          subtitle
          text
          textColor
          title
        }
      }
    }
    files: allFile(filter: { relativeDirectory: { eq: $uid } }) {
      edges {
        node {
          base
          childImageSharp {
            resize(quality: 95, width: 1000) {
              originalName
              src
            }
            fluid(maxHeight: 800, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            fixed(height: 800, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
          publicURL
        }
      }
    }
  }
`;
