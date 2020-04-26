import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import componentMap from '@theme/components/componentMap';
import constructImageObj from '@theme/utils/constructImageObj';

export default function HomeTpl({
  data: {
    page: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
  },
  pageContext,
  ...pageProps
}) {
  // console.group('HomeTpl.js');
  // console.log('pageMeta', pageMeta);
  // console.log('pageFiles', pageFiles);
  // console.log('pageContext', pageContext);
  // console.groupEnd();

  return (
    <>
      {_.sortBy(pageElements, [o => o.order]).map(({ id, type, settings }, i) => {
        const Component = componentMap[type];

        // construct backgImage object
        const backgImage = {
          ...settings?.backgImage,
          ...constructImageObj(pageFiles, settings?.backgImage?.name),
        };

        // construct images object (e.g. Gallery)
        const images = settings?.images?.map(image => ({
          ...image,
          ...constructImageObj(pageFiles, image.name),
        }));

        return (
          <Component {...settings} key={`${pageMeta.uid}-${id}`} backgImage={backgImage} images={images} fullSize />
        );
      })}
    </>
  );
}

export const pageQuery = graphql`
  query HomeTplQuery($uid: String!) {
    page: essentialsJson(meta: { uid: { eq: $uid } }) {
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
            resize(quality: 95, width: 1400) {
              originalName
              src
            }
            fluid(maxWidth: 2000, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1400, height: 900, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
          publicURL
        }
      }
    }
  }
`;
