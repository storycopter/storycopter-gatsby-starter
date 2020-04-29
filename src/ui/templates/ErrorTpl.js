import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { componentMap } from '@ui';
import constructImageObj from '@ui/utils/constructImageObj';

export default function ErrorTpl({
  data: {
    page: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
  },
  pageContext,
  ...pageProps
}) {
  console.group('ErrorTpl.js');
  console.log('pageElements', pageElements);
  console.log('pageFiles', pageFiles);
  console.log('pageMeta', pageMeta);
  console.log('pageProps', pageProps);
  console.groupEnd();

  return (
    <>
      {_.sortBy(pageElements, [o => o.order]).map(({ id, type, settings }, i) => {
        const Component = componentMap[type];

        // construct backgImage object
        const backgImage = {
          ...settings?.backgImage,
          ...constructImageObj(pageFiles, settings?.backgImage?.name),
        };

        return <Component {...settings} key={id} backgImage={backgImage} fullSize />;
      })}
    </>
  );
}

export const pageQuery = graphql`
  query ErrorTplQuery($uid: String!) {
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
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 1400, height: 900, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
          }
          publicURL
        }
      }
    }
  }
`;
