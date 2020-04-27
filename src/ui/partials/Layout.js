import Fullscreen from 'react-full-screen';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Baseline from '@ui/components/Baseline/Baseline';
import Foobar from '@ui/partials/Foobar';
import Topbar from '@ui/partials/Topbar';
import Vignette from '@ui/partials/Vignette';
import theme from '@ui/theme';

export default function Layout({
  pageContext: { allEssentials, allPages, allSiteData },
  location,
  children,
  ...props
}) {
  const { brand, meta, sound } = allSiteData;
  const pageData = props.data;

  const [fullScreen, setFullScreen] = useState(false);

  const audio = sound.enabled && sound.track.name ? `/${sound.track.name}` : null;
  const favicon = brand.favicon.name ? `/${brand.favicon.name}` : null;
  const image = brand.coverEnabled && brand.cover.name ? `/${brand.cover.name}` : null;

  // console.group('Layout.js');
  // console.log({ theme });
  // console.log({ props });
  // console.groupEnd();

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
          <Fullscreen enabled={fullScreen} onChange={val => setFullScreen(val)}>
            <ThemeProvider theme={{ ...theme, brand: brand }}>
              <Baseline theme={{ ...theme, brand: brand }} />
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
              <Vignette />
              <Topbar {...barProps} />
              {children}
              <Foobar {...barProps} onFullScreenToggle={() => setFullScreen(prevState => !prevState)} />
            </ThemeProvider>
          </Fullscreen>
        );
      }}
    />
  );
}

Layout.propTypes = {};
