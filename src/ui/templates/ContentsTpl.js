import AniLink from 'gatsby-plugin-transition-link/AniLink';
import BackgroundImage from 'gatsby-background-image';
import HorizontalScroll from 'react-scroll-horizontal';
import Img from 'gatsby-image';
import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = (pageCount, isHovered) =>
  makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      height: '100vh',
      width: '100vw',
      flexWrap: 'nowrap',
      // padding: theme.spacing(5),
      position: 'relative',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      // [theme.breakpoints.up('md')]: {
      // padding: theme.spacing(10),
      // },
      // [theme.breakpoints.up('xl')]: {
      // padding: theme.spacing(15),
      // },
    },
    scroll: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
    },
    tile: {
      display: 'flex',
      flexDirection: 'column',

      height: '100vh',
      justifyContent: 'center',
      marginLeft: theme.spacing(10),
      '&:first-child': {},
      '&:last-child': {
        marginRight: theme.spacing(10),
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(15),
        '&:last-child': {
          marginRight: theme.spacing(15),
        },
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: theme.spacing(20),
        '&:last-child': {
          marginRight: theme.spacing(20),
        },
      },
    },
    link: {
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
    },
    card: {
      background: 'transparent',
      height: '50vh',
      maxHeight: '500px',
      maxWidth: '400px',
      minWidth: '280px',
      minHeight: '400px',
      padding: `${100 / 3}% ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px`,
      width: `${100 / 4}vw`,
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

export default function ContentsTpl({
  data: {
    page: { elements: pageElements, meta: pageMeta },
    files: { edges: pageFiles },
    allPagesFiles: { edges: allPagesFiles },
  },
  pageContext: { allPages },
  ...pageProps
}) {
  const theme = useTheme();
  const classes = useStyles()();

  console.group('ContentsTpl.js');
  console.log('allPagesFiles', allPagesFiles);
  console.log('theme', theme);
  console.log('allPages', allPages);
  console.groupEnd();

  return (
    <>
      <GridList className={classes.gridList} cols={2.5}>
        <HorizontalScroll
          // pageLock
          reverseScroll
          // config={{ stiffness: int, damping: int }}
          className={classes.scroll}
          // animValues={int}
        >
          {allPages.map(page => {
            console.log({ page });

            // construct cover image obj
            const coverImage = {
              ...page.coverImage,
              ..._.find(
                allPagesFiles.map(e => e.node),
                o => o.relativeDirectory === page.uid && o.base === page.coverImage.name && page.coverEnabled
              ),
            };
            console.log({ coverImage });

            return (
              <div className={classes.tile} key={page.uid}>
                <AniLink className={classes.link} color={theme.palette.primary.main} paintDrip to={page.path}>
                  <BackgroundImage
                    fluid={coverImage.childImageSharp.fluid}
                    style={{ backgroundPosition: 'bottom right' }}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                          {page.title}
                        </Typography>
                        {page.summary ? (
                          <Typography variant="body1" color="textSecondary" component="p">
                            {page.summary}
                          </Typography>
                        ) : null}
                      </CardContent>
                      <CardActions>
                        <Button size="small">Continue</Button>
                      </CardActions>
                    </Card>
                  </BackgroundImage>
                </AniLink>
              </div>
            );
          })}
        </HorizontalScroll>
      </GridList>
    </>
  );
}

export const pageQuery = graphql`
  query ContentsTplQuery($uid: String!) {
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
    allPagesFiles: allFile(
      filter: { extension: { ne: "json" }, relativeDirectory: { ne: "schema" }, sourceInstanceName: { eq: "pages" } }
    ) {
      edges {
        node {
          base
          relativePath
          relativeDirectory
          childImageSharp {
            resize(quality: 95, width: 1000) {
              originalName
              src
            }
            fluid: fluid(maxHeight: 500, maxWidth: 400, cropFocus: CENTER, quality: 95, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
      }
    }
  }
`;
