import Fullscreen from 'react-full-screen';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Baseline from '@ui/components/Baseline/Baseline';
import Foobar from '@ui/partials/Foobar';
import Topbar from '@ui/partials/Topbar';
import Vignette from '@ui/partials/Vignette';
import constructTheme from '@ui/utils/constructTheme';

export default function Layout({
  pageContext: { allEssentials, allPages, allSiteData },
  location,
  children,
  ...props
}) {
  const { allStaticFiles } = useStaticQuery(graphql`
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
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
              fixed(height: 800, quality: 95, cropFocus: CENTER, fit: COVER) {
                ...GatsbyImageSharpFixed_withWebp_tracedSVG
              }
            }
            publicURL
          }
        }
      }
    }
  `);
  const { brand, sound } = allSiteData;
  const pageData = props.data;

  const isEssential = ['contents', 'credits', 'error', 'home'].includes(props.data.page.meta.uid);

  // const [fullScreen, setFullScreen] = useState(false);

  const audio = sound.enabled && sound.track.name ? `/${sound.track.name}` : null;
  const favicon = brand.favicon.name ? `/${brand.favicon.name}` : null;
  const image = brand.coverEnabled && brand.cover.name ? `/${brand.cover.name}` : null;

  // console.group('Layout.js');
  // console.log({ allSiteData });
  // console.log({ props });
  // console.groupEnd();

  const barProps = {
    allPages,
    allSiteData,
    allStaticFiles,
    pageData,
    props,
  };

  // <Fullscreen enabled={fullScreen} onChange={val => setFullScreen(val)}></Fullscreen>;

  return (
    <ThemeProvider theme={constructTheme(brand)}>
      <Baseline theme={constructTheme(brand)} />
      <Helmet
        defer={false}
        encodeSpecialCharacters={true}
        titleTemplate={`${allSiteData.meta.title} ⋅ %s`}
        defaultTitle="Chapter">
        <link rel="icon" href={favicon} type="image/ico" sizes="16x16" />
        <link rel="stylesheet" type="text/css" href="raleway/style.css" />
        <link rel="stylesheet" type="text/css" href="poppins/style.css" />
        <meta name="description" content={allSiteData.meta.summary} />
        <meta property="og:audio" content={audio} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        <title>{isEssential ? allSiteData.meta.summary : pageData.page.meta.title}</title>
      </Helmet>
      <Vignette />
      <Topbar {...barProps} />
      {children}
      <Foobar
        {...barProps}
        // onFullScreenToggle={() => setFullScreen(prevState => !prevState)}
      />
    </ThemeProvider>
  );
}

Layout.propTypes = {};
