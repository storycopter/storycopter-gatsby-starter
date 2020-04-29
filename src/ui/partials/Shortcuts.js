import AniLink from 'gatsby-plugin-transition-link/AniLink';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import React from 'react';
import _ from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = hasCover =>
  makeStyles(theme => ({
    root: {
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(3),
      },
    },
    shortcut: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: hasCover ? 'space-between' : 'center',
        minHeight: '50vh',
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
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
    summary: {
      display: 'none',
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    cta: {
      // marginRight: theme.spacing(1.5),
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

export default function Shortcuts({ allPages, allEssentials, pageIndex }) {
  const theme = useTheme();
  const allSiteFiles = useStaticQuery(graphql`
    query ShortcutsQuery {
      pages: allFile(
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
              fluidLandscape: fluid(maxHeight: 500, maxWidth: 800, cropFocus: CENTER, quality: 95, fit: COVER) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
            publicURL
          }
        }
      }
      essentials: allFile(
        filter: {
          extension: { ne: "json" }
          relativeDirectory: { ne: "schema" }
          sourceInstanceName: { eq: "essentials" }
        }
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
              fluidLandscape: fluid(maxHeight: 500, maxWidth: 800, cropFocus: CENTER, quality: 95, fit: COVER) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
            publicURL
          }
        }
      }
    }
  `);

  const nextPage = allPages[pageIndex + 1] || _.find(allEssentials, o => o.uid === 'credits');
  // const prevPage = allPages[pageIndex - 1] || _.find(allEssentials, o => o.uid === 'home');

  const nextCover = {
    ...nextPage.coverImage,
    ..._.find(
      allSiteFiles.pages.edges.map(e => e.node),
      o => o.relativeDirectory === nextPage?.uid && o.base === nextPage?.coverImage?.name && nextPage?.coverEnabled
    ),
  };

  const classes = useStyles(nextCover.childImageSharp ? true : false)();

  console.group('Shortcuts');
  // console.log({ allEssentials });
  // console.log({ allPages });
  // console.log({ allSiteFiles });
  // console.log({ nextPage });
  // console.log({ nextCover });
  console.groupEnd();

  return (
    <div className={classes.root}>
      <div className={classes.shortcut}>
        <div className={classes.text}>
          <Typography component="span" variant="overline" color="textSecondary">
            Coming next:
          </Typography>
          <Typography className={classes.title} component="h3" variant="h2">
            <AniLink color={theme.palette.primary.main} paintDrip to={nextPage?.path}>
              {nextPage?.title}
            </AniLink>
          </Typography>
          {nextPage?.summary ? (
            <Typography className={classes.summary} color="textSecondary" component="p" variant="h6">
              {nextPage.summary}
            </Typography>
          ) : null}
          <AniLink color={theme.palette.primary.main} paintDrip to={nextPage?.path}>
            <Typography className={classes.cta} color="textSecondary" component="span" variant="body1" display="inline">
              Continue
            </Typography>
            <IconButton color="primary">
              <ArrowForwardIcon />
            </IconButton>
          </AniLink>
        </div>
        {nextCover?.childImageSharp ? (
          <div className={classes.cover}>
            <AniLink color={theme.palette.primary.main} paintDrip to={nextPage?.path}>
              <Img
                fluid={nextCover.childImageSharp.fluidLandscape}
                imgStyle={{ objectFit: 'contain' }}
                style={{ maxHeight: '100%' }}
              />
            </AniLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
