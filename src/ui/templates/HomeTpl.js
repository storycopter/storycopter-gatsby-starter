import Link from 'gatsby-link';
import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import useTheme from '@material-ui/styles/useTheme';

import componentMap from '@ui/components/componentMap';
import constructImageObj from '@ui/utils/constructImageObj';

const useStyles = (pageCount, isHovered) =>
  makeStyles(theme => ({
    actionbar: {
      alignItems: 'center',
      display: 'flex',
    },
    cta: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
      '&:first-child': {
        marginLeft: 0,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
  }));

export default function HomeTpl({
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

  console.group('HomeTpl.js');
  // console.log('pageMeta', pageMeta);
  // console.log('pageContext', pageContext);
  // console.log('pageFiles', pageFiles);
  console.log('brand', brand);
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

        // construct images object (e.g. Gallery)
        const images = settings?.images?.map(image => ({
          ...image,
          ...constructImageObj(pageFiles, image.name),
        }));

        return (
          <Component
            {...settings}
            key={`${pageMeta.uid}-${id}`}
            backgImage={backgImage}
            images={images}
            fullSize
            children={
              allPages.length > 1 ? (
                <>
                  <Link className={classes.cta} to={_.sortBy(allPages, o => o.order)[0].path}>
                    <Button
                      component="span"
                      style={{
                        background: pageElements[0].settings.backgColor,
                        color: pageElements[0].settings.textColor,
                      }}
                      variant="contained">
                      Launch story
                    </Button>
                  </Link>{' '}
                  <Typography className={classes.cta} component="span" variant="body2" style={{ opacity: 0.5 }}>
                    or
                  </Typography>{' '}
                  <Link className={classes.cta} to={'/contents'}>
                    <Button
                      component="span"
                      style={{
                        background: theme.palette.storycopter.flare[200],
                        color: pageElements[0].settings.textColor,
                      }}
                      variant="contained">
                      Explore pages
                    </Button>
                  </Link>
                </>
              ) : (
                <Link className={classes.cta} to={_.sortBy(allPages, o => o.order)[0].path}>
                  <Button
                    component="span"
                    style={{
                      background: pageElements[0].settings.backgColor,
                      color: pageElements[0].settings.textColor,
                    }}
                    variant="contained">
                    Launch story
                  </Button>
                </Link>
              )
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
