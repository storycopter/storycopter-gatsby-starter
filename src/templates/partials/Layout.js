import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { Baseline } from '@storycopter/ui';

export default function Layout({
  pageContext: {
    contextData: { allSiteData: siteData },
  },
  ...props
}) {
  console.group('Layout.js');
  console.log({ siteData });
  console.groupEnd();

  const { brand, sound } = siteData;

  const audio = sound.enabled && sound.track.name ? `/${sound.track.name}` : null;
  const favicon = brand.favicon.name ? `/${brand.favicon.name}` : null;
  const image = brand.coverEnabled && brand.cover.name ? `/${brand.cover.name}` : null;

  return (
    <>
      <Baseline />
      <Helmet
        defer={false}
        encodeSpecialCharacters={true}
        titleTemplate={`${siteData.meta.title} • %s`}
        defaultTitle="My Default Title">
        {/* <html lang="en" amp /> */}

        {/* title attributes and value */}
        <title itemProp="name" lang="en">
          My Plain Title or {`dynamic`} title
        </title>

        <link rel="icon" href={favicon} type="image/ico" sizes="16x16" />

        <meta name="description" content={siteData.meta.summary} />
        <meta property="og:audio" content={audio} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div {...props} />
    </>
  );
}

Layout.propTypes = {};
