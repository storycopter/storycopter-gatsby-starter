import Img from 'gatsby-image';
import Link from 'gatsby-link';
import React from 'react';
import _ from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import PointerIcon from '@theme/elements/icons/PointerIcon';
import ShareIcon from '@theme/elements/icons/ShareIcon';
import colors from '@theme/settings/colors';
import constructImageObj from '@theme/utils/constructImageObj';

const useStyles = () =>
  makeStyles(theme => ({
    root: {
      background: 'transparent',
      boxShadow: 'none',
      padding: theme.spacing(1),
      '&:hover': {
        background: colors.shadow[800],
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up('xl')]: {
        padding: theme.spacing(3),
      },
      // '&:before': {
      // backgroundImage: `linear-gradient(${colors.shadow[500]}, transparent)`,
      // content: `' '`,
      // height: '33%',
      // left: '-50px',
      // maxHeight: '300px',
      // filter: 'blur(3px)',
      // position: 'fixed',
      // right: '-50px',
      // top: '-50px',
      // },
    },
    left: {},
    middle: {
      textAlign: 'center',
    },
    right: {
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    logo: {
      height: '60px',
      maxWidth: '150px',
    },
    titleLink: {
      display: 'inline-block',
    },
    titleText: {
      display: 'inline-block',
      letterSpacing: `${theme.spacing(0.5)}px`,
    },
  }));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Topbar({ allPages, allSiteData, allStaticFiles, pageData, ...props }) {
  const classes = useStyles()();

  const isEssential = ['home', 'credits', 'contents', 'error'].includes(pageData.page.meta.uid);
  const pageIndex = _.findIndex(allPages, o => o.uid === pageData.page.meta.uid);

  // construct logo object
  const logo = logo?.name
    ? {
        ...allSiteData?.brand?.logo,
        ...constructImageObj(allStaticFiles?.edges, allSiteData?.brand?.logo?.name),
      }
    : null;

  console.group('Topbar.js');
  // console.log({ allSiteData });
  // console.log({ allStaticFiles });
  // console.log({ props });
  console.groupEnd();

  return (
    <HideOnScroll {...props}>
      <AppBar className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid className={classes.left} container item xs spacing={2}>
              {isEssential ? (
                <Grid item>
                  <Link to="/">
                    {logo?.childImageSharp ? (
                      <Img alt={allSiteData?.meta?.publisher} fluid={logo?.childImageSharp?.fluid} />
                    ) : logo?.publicURL ? (
                      <img alt={allSiteData?.meta?.publisher} className={classes.logo} src={logo?.publicURL} />
                    ) : (
                      <Typography variant="h6">{allSiteData?.meta?.publisher}</Typography>
                    )}
                  </Link>
                </Grid>
              ) : (
                <>
                  <Grid item>
                    <Tooltip title="Table of Contents">
                      <IconButton className={classes.menuToggle} edge="start">
                        <MenuIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  {allPages.length > 1 && !isEssential ? (
                    <>
                      <Grid item>
                        <Tooltip title="Previous page">
                          <Link to={pageIndex - 1 >= 0 ? allPages[pageIndex - 1].path : '/'}>
                            <IconButton>
                              <NavigateBeforeIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Next page">
                          <Link to={pageIndex + 1 >= allPages.length ? '/credits' : allPages[pageIndex + 1].path}>
                            <IconButton>
                              <NavigateNextIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      </Grid>
                    </>
                  ) : null}
                </>
              )}
            </Grid>
            <Grid className={classes.middle} item xs={6}>
              <Link to="/" className={classes.titleLink}>
                <Typography className={classes.titleText} component="h1" variant="button">
                  {allSiteData.meta.title}
                </Typography>
              </Link>
            </Grid>
            <Grid className={classes.right} container item xs spacing={2}>
              <Grid item>
                <Tooltip title="Share…">
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={allSiteData.motivation.label || 'Take action'}>
                  <a href={allSiteData.motivation.link} target="_blank">
                    <IconButton edge="end">
                      <PointerIcon />
                    </IconButton>
                  </a>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
