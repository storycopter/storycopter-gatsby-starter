import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import { lighten } from 'polished';

import Button from '@material-ui/core/Button';
import useTheme from '@material-ui/core/styles/useTheme';

import { componentMap } from '@ui';
import constructImageObj from '@ui/utils/constructImageObj';

export default function HomeTpl({
  data: {
    page: { elements, meta },
    files,
  },
  pageContext: { allPages },
  ...props
}) {
  const theme = useTheme();

  // console.group('HomeTpl.js');
  // console.log('meta', meta);
  // console.log('pageContext', pageContext);
  // console.log('files.edges', files.edges);
  // console.log(elements[0].settings.title);
  // console.groupEnd();

  return (
    <>
      {_.sortBy(elements, [o => o.order]).map(({ id, type, settings }, i) => {
        const Component = componentMap[type];

        // construct backgImage object
        const backgImage = {
          ...settings?.backgImage,
          ...constructImageObj(files.edges, settings?.backgImage?.name),
        };

        // construct images object (e.g. Gallery)
        const images = settings?.images?.map(image => ({
          ...image,
          ...constructImageObj(files.edges, image.name),
        }));

        return (
          <Component
            {...settings}
            key={`${meta.uid}-${id}`}
            backgImage={backgImage}
            images={images}
            fullSize
            children={
              <>
                <Button
                  component={React.forwardRef((props, ref) => (
                    <span ref={ref}>
                      <AniLink
                        color={theme.palette.primary.main}
                        paintDrip
                        to={_.sortBy(allPages, o => o.order)[0].path}
                        {...props}
                      />
                    </span>
                  ))}
                  style={{
                    background: elements[0].settings.backgColor,
                    color: elements[0].settings.textColor,
                  }}
                  variant="contained">
                  Continue
                </Button>
                {allPages.length > 1 ? (
                  <Button
                    component={React.forwardRef((props, ref) => (
                      <span ref={ref}>
                        <AniLink color={theme.palette.primary.main} paintDrip to={'/contents'} {...props} />
                      </span>
                    ))}
                    style={{
                      background: lighten(0.4, elements[0].settings.backgColor),
                      color: elements[0].settings.textColor,
                    }}
                    variant="contained">
                    Explore
                  </Button>
                ) : null}
              </>
            }
          />
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
