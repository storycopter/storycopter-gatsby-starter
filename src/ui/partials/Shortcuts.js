import Img from 'gatsby-image';
import Link from 'gatsby-link';
import React from 'react';
import _ from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = hasCover =>
  makeStyles(theme => ({
    root: {
      padding: theme.spacing(5),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(10),
      },
      [theme.breakpoints.up('xl')]: {
        padding: theme.spacing(15),
      },
    },
    shortcut: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: hasCover ? 'space-between' : 'center',
      textAlign: hasCover ? 'left' : 'center',
      minHeight: '50vh',
      width: '100%',
    },
    text: {
      flex: '0 0 50%',
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
    },
    summary: {
      marginBottom: theme.spacing(1.5),
    },
    cover: {
      flex: '0 0 50%',
    },
  }));

export default function Shortcuts({ allPages, allEssentials, pageIndex }) {
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
                ...GatsbyImageSharpFluid
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
                ...GatsbyImageSharpFluid
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
          <Typography className={classes.title} component="h3" variant="h3">
            <Link to={nextPage?.path}>{nextPage?.title}</Link>
          </Typography>
          {nextPage?.summary ? (
            <Typography className={classes.summary} color="textSecondary" component="p" variant="h5">
              {nextPage.summary}
            </Typography>
          ) : null}
          <Link to={nextPage?.path}>
            <IconButton color="primary">
              <ArrowForwardIcon />
            </IconButton>
          </Link>
        </div>
        {nextCover?.childImageSharp ? (
          <div
            className={classes.cover}
            style={{
              maxHeight: '100%',
              // height: '100px'
            }}>
            <Link to={nextPage?.path}>
              <Img
                fluid={nextCover.childImageSharp.fluidLandscape}
                imgStyle={{ objectFit: 'contain' }}
                style={{ maxHeight: '100%' }}
              />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
