import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import DocBaseline from '@theme/Baseline';
import DocTheme from '@theme/theme';
import Foobar from '@theme/partials/Foobar';
import Topbar from '@theme/partials/Topbar';

export default function Layout({
  pageContext: {
    contextData: { allEssentials, allPages, allSiteData },
  },
  location,
  children,
  ...props
}) {
  const { brand, meta, sound } = allSiteData;
  const pageData = props.data;

  const audio = sound.enabled && sound.track.name ? `/${sound.track.name}` : null;
  const favicon = brand.favicon.name ? `/${brand.favicon.name}` : null;
  const image = brand.coverEnabled && brand.cover.name ? `/${brand.cover.name}` : null;

  console.group('Layout.js');
  // console.log({ allSiteData });
  // console.log({ DocTheme });
  console.log({ props });
  console.groupEnd();

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          allStaticFiles: allFile(filter: { sourceInstanceName: { eq: "static" } }) {
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
      `}
      render={({ allStaticFiles }) => {
        const barProps = {
          allPages,
          allSiteData,
          allStaticFiles,
          pageData,
          props,
        };
        return (
          <>
            <DocBaseline />
            <Helmet
              defer={false}
              encodeSpecialCharacters={true}
              titleTemplate={`${meta.title} • %s`}
              defaultTitle="Chapter">
              <link rel="icon" href={favicon} type="image/ico" sizes="16x16" />
              <meta name="description" content={meta.summary} />
              <meta property="og:audio" content={audio} />
              <meta property="og:image" content={image} />
              <meta property="og:type" content="website" />
            </Helmet>
            <ThemeProvider theme={DocTheme}>
              <Topbar {...barProps} />
              {children}
              <Foobar {...barProps} />
            </ThemeProvider>
          </>
        );
      }}
    />
  );
}

Layout.propTypes = {};
