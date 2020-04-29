import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import { lighten } from 'polished';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import useTheme from '@material-ui/styles/useTheme';

import componentMap from '@ui/components/componentMap';
import constructImageObj from '@ui/utils/constructImageObj';

const useStyles = (pageCount, isHovered) => makeStyles(theme => ({}));

export default function CreditsTpl({
  data: {
    page: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
  },
  pageContext: { allEssentials, allPages, allSiteData },
  ...pageProps
}) {
  const { motivation } = allSiteData;
  const classes = useStyles()();
  const theme = useTheme();
  // console.group('CreditsTpl.js');
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

        return (
          <Component
            {...settings}
            key={id}
            backgImage={backgImage}
            fullSize
            children={
              <>
                {motivation?.enabled && motivation?.label?.length > 0 && motivation.link?.length > 0 ? (
                  <Button
                    component="a"
                    href={motivation.link}
                    style={{
                      background: pageElements[0].settings.backgColor,
                      color: pageElements[0].settings.textColor,
                    }}
                    variant="contained">
                    {motivation.label}
                  </Button>
                ) : null}
                <Button
                  component={React.forwardRef((props, ref) => (
                    <span ref={ref}>
                      <AniLink color={theme.palette.primary.main} paintDrip to={'/'} {...props} />
                    </span>
                  ))}
                  style={{
                    background: lighten(0.4, pageElements[0].settings.backgColor),
                    color: pageElements[0].settings.textColor,
                  }}
                  variant="contained">
                  Return home
                </Button>
              </>
            }
          />
        );
      })}
    </>
  );
}

export const pageQuery = graphql`
  query CreditsTplQuery($uid: String!) {
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
