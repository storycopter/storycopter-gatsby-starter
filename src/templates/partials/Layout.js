import React from 'react';
import { Helmet } from 'react-helmet';

import Baseline from './Baseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme';

export default function Layout({
  pageContext: {
    contextData: { allSiteData },
  },
  location,
  children,
  ...props
}) {
  const { brand, meta, sound } = allSiteData;

  const audio = sound.enabled && sound.track.name ? `/${sound.track.name}` : null;
  const favicon = brand.favicon.name ? `/${brand.favicon.name}` : null;
  const image = brand.coverEnabled && brand.cover.name ? `/${brand.cover.name}` : null;

  console.group('Layout.js');
  console.log({ props });
  console.groupEnd();

  return (
    <>
      <Baseline />
      <Helmet defer={false} encodeSpecialCharacters={true} titleTemplate={`${meta.title} • %s`} defaultTitle="Chapter">
        <link rel="icon" href={favicon} type="image/ico" sizes="16x16" />
        <meta name="description" content={meta.summary} />
        <meta property="og:audio" content={audio} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
      </Helmet>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}

Layout.propTypes = {};
