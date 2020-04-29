import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import Shortcuts from '@ui/partials/Shortcuts';
import componentMap from '@ui/components/componentMap';
import constructImageObj from '@ui/utils/constructImageObj';

export default function PageTpl({
  data: {
    page: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
  },
  pageContext: { allPages, allEssentials, allSiteData },
  ...props
}) {
  const pageIndex = _.findIndex(allPages, o => o.uid === pageMeta.uid);

  console.group('PageTpl.js');
  // console.log('allPages', allPages);
  // console.log('nextPage', nextPage);
  // console.log('whaterver', whaterver);
  console.log('allSiteData', allSiteData);
  // console.log('pageFiles', pageFiles);
  // console.log('pageElements', pageElements);
  console.groupEnd();

  return (
    <>
      {_.sortBy(pageElements, [o => o.order]).map(({ id, type, settings }, i) => {
        // if (type !== 'headline') return;
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

        return <Component {...settings} key={`${pageMeta.uid}-${id}`} backgImage={backgImage} images={images} />;
      })}
      <Shortcuts allPages={allPages} allEssentials={allEssentials} pageIndex={pageIndex} />
    </>
  );
}

export const pageQuery = graphql`
  query PageTplQuery($uid: String!) {
    page: pagesJson(meta: { uid: { eq: $uid } }) {
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
            fluid: fluid(maxHeight: 800, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed: fixed(height: 800, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed_withWebp_tracedSVG
            }
            fluidLandscape: fluid(maxHeight: 500, maxWidth: 800, cropFocus: CENTER, quality: 95, fit: COVER) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
          publicURL
        }
      }
    }
  }
`;
