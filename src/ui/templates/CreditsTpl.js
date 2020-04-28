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

const useStyles = (pageCount, isHovered) =>
  makeStyles(theme => ({
    actionbar: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: theme.spacing(2),
      position: 'absolute',
      top: '100%',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        top: 'auto',
      },
    },
    cta: {
      marginTop: theme.spacing(1.5),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      '&:first-child': {
        marginLeft: 0,
      },
      '&:last-child': {
        marginRight: 0,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
      },
    },
  }));

export default function CreditsTpl({
  data: {
    page: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
  },
  pageContext: { allEssentials, allPages, allSiteData },
  ...pageProps
}) {
  const { brand } = allSiteData;
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
              <div className={classes.actionbar}>
                <a className={classes.cta} href="https://storycopter.com">
                  <Button
                    component="span"
                    style={{
                      background: pageElements[0].settings.backgColor,
                      color: pageElements[0].settings.textColor,
                    }}
                    variant="contained">
                    Visit Storycopter
                  </Button>
                </a>
                <AniLink color={theme.palette.primary.main} paintDrip className={classes.cta} to={'/'}>
                  <Button
                    component="span"
                    style={{
                      background: lighten(0.4, pageElements[0].settings.backgColor),
                      color: pageElements[0].settings.textColor,
                    }}
                    variant="contained">
                    Return home
                  </Button>
                </AniLink>
              </div>
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
