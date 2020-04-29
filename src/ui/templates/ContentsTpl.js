import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Img from 'gatsby-image';
import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = () =>
  makeStyles(theme => ({
    root: {
      paddingBottom: theme.spacing(15),
      paddingTop: theme.spacing(15),
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(3),
      },
    },
    tile: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(15),
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        // minHeight: `${100 / 2}vh`,
      },
    },
    text: {
      flex: '0 0 50%',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10),
      },
      [theme.breakpoints.up('xl')]: {
        padding: theme.spacing(15),
      },
    },
    title: {
      marginTop: theme.spacing(1),
    },
    summary: {
      marginTop: theme.spacing(1),
    },
    cta: {
      marginTop: theme.spacing(1),
    },
    cover: {
      flex: '0 0 50%',
      maxHeight: '100%',
      height: '100%',
      position: 'relative',
      width: '100%',
      [theme.breakpoints.only('xs')]: {
        marginTop: theme.spacing(1.5),
      },
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

  // console.group('ContentsTpl.js');
  // console.log('allPagesFiles', allPagesFiles);
  // console.log('theme', theme);
  // console.log('allPages', allPages);
  // console.groupEnd();

  return (
    <Container className={classes.root} maxWidth={'lg'}>
      {allPages.map(page => {
        // console.log({ page });

        // construct cover image obj
        const coverImage = {
          ...page.coverImage,
          ..._.find(
            allPagesFiles.map(e => e.node),
            o => o.relativeDirectory === page.uid && o.base === page.coverImage.name && page.coverEnabled
          ),
        };

        return (
          <div
            className={classes.tile}
            style={{ justifyContent: coverImage?.childImageSharp ? 'space-between' : 'center' }}
            key={page.uid}>
            <div className={classes.text}>
              <AniLink color={theme.palette.primary.main} paintDrip to={page.path}>
                <Typography gutterBottom variant="h4" component="h2">
                  {page.title}
                </Typography>
              </AniLink>
              {page.summary ? (
                <Typography className={classes.summary} color="textSecondary" component="p" variant="h6">
                  {page.summary}
                </Typography>
              ) : null}
              <Typography className={classes.cta} color="textSecondary" variant="body1">
                <AniLink color={theme.palette.primary.main} paintDrip to={page.path}>
                  Continue
                </AniLink>
                <IconButton color="primary">
                  <ArrowForwardIcon />
                </IconButton>
              </Typography>
            </div>
            {coverImage.childImageSharp ? (
              <div className={classes.cover}>
                <AniLink color={theme.palette.primary.main} paintDrip to={page.path}>
                  <Img
                    fluid={coverImage.childImageSharp.fluid}
                    imgStyle={{ objectFit: 'contain' }}
                    style={{ maxHeight: '100%' }}
                  />
                </AniLink>
              </div>
            ) : null}
          </div>
        );
      })}
    </Container>
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
            fluid: fluid(maxHeight: 500, maxWidth: 800, cropFocus: CENTER, quality: 95, fit: COVER) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
          publicURL
        }
      }
    }
  }
`;
