import Img from 'gatsby-image';
import Link from 'gatsby-link';
import React, { useRef, useState } from 'react';
import _ from 'lodash';
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks';
import Popover from 'material-ui-popup-state/HoverPopover';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';

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

const PAGE_DETAILS_CARD_WIDTH = 200;

const useStyles = (pageCount, isHovered) =>
  makeStyles(theme => ({
    root: {
      backgroundColor: isHovered ? colors.shadow[800] : 'transparent',
      boxShadow: 'none',
      padding: theme.spacing(1),
      transition: `background ${theme.transitions.duration.standard}`,
      '&:hover': {
        backgroundColor: colors.shadow[800],
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1),
      },
      [theme.breakpoints.up('xl')]: {
        padding: theme.spacing(1),
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
      display: 'block',
      letterSpacing: `${theme.spacing(0.5)}px`,
      position: 'relative',
      textAlign: 'center',
      width: '100%',
    },
    breadcrumbs: {
      height: theme.spacing(4),
      left: 0,
      position: 'absolute',
      right: 0,
      top: '100%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    breadcrumbsTrack: {
      background: colors.shadow[200],
      borderTop: `1px solid ${colors.flare[400]}`,
      bottom: 0,
      height: theme.spacing(2),
      left: 0,
      position: 'absolute',
      right: 0,
    },
    breadcrumbsProgress: {
      background: colors.grey[100],
      height: '2px',
      transform: 'translateY(-1px)',
    },
    breadcrumbsPages: {
      alignContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      height: theme.spacing(4),
    },
    breadcrumb: {
      flex: ` 0 0 ${100 / pageCount}%`,
      textAlign: 'center',
    },
    breadcrumbLink: {
      display: 'inline-block',
    },
    breadcrumbMarker: {
      borderRadius: theme.spacing(1),
      display: 'inline-block',
      height: theme.spacing(3.5),
      overflow: 'hidden',
      position: 'relative',
      transition: `background ${theme.transitions.duration.standard}`,
      width: theme.spacing(3.5),
      zIndex: 2,
      '&:hover': {
        background: 'transparent',
      },
    },
    breadcrumbTick: {
      background: 'white',
      borderRadius: '1px',
      color: 'transparent',
      fontSize: '1px',
      height: theme.spacing(1.5),
      left: '50%',
      position: 'absolute',
      textIndent: '-9000px',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      width: theme.spacing(0.5),
      zIndex: 3,
    },
    popover: {
      marginTop: theme.spacing(1.5),
    },
    card: {
      width: `${PAGE_DETAILS_CARD_WIDTH}px`,
    },
    cardHead: {
      lineHeight: 0,
    },
    cardBody: {
      padding: theme.spacing(1),
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
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const [barHover, setBarHover] = useState(null);
  const [popperPage, setPopperPage] = useState(null);

  const isEssential = ['home', 'credits', 'contents', 'error'].includes(pageData.page.meta.uid);
  const pageIndex = _.findIndex(allPages, o => o.uid === pageData.page.meta.uid);

  // construct logo object
  const logo = logo?.name
    ? {
        ...allSiteData?.brand?.logo,
        ...constructImageObj(allStaticFiles?.edges, allSiteData?.brand?.logo?.name),
      }
    : null;

  const classes = useStyles(allPages.length, popupState.isOpen || barHover)();

  console.group('Topbar.js');
  // console.log({ allPages });
  // console.log({ allSiteData });
  // console.log({ allStaticFiles });
  // console.log({ pageData });
  // console.log({ popperPage });
  console.groupEnd();

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          className={classes.root}
          onMouseEnter={() => setBarHover(true)}
          onMouseLeave={() => setTimeout(() => setBarHover(false), 100)}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid className={classes.left} container item xs spacing={1}>
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
              <Grid className={classes.middle} item sm={6}>
                <Box display={{ xs: 'none', md: 'block' }}>
                  <Typography className={classes.titleText} component="h1" noWrap variant="button">
                    {allSiteData.meta.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid className={classes.right} container item xs spacing={1}>
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
          {allPages.length > 1 && (barHover || popupState.isOpen) && !isEssential ? (
            <div className={classes.breadcrumbs}>
              <div className={classes.breadcrumbsTrack}>
                <div
                  className={classes.breadcrumbsProgress}
                  style={{ width: `${(100 / (allPages.length * 2)) * (pageIndex + 0.5) * 2}%` }}></div>
              </div>
              <div className={classes.breadcrumbsPages}>
                {_.sortBy(allPages, o => o.order).map((page, i) => {
                  // construct cover object
                  const coverImage = page.coverImage?.name
                    ? {
                        ...page?.coverImage,
                        ...constructImageObj(pageData?.files.edges, page?.coverImage?.name),
                      }
                    : null;

                  console.log('page: ', { coverImage });

                  return (
                    <div
                      className={classes.breadcrumb}
                      key={page.uid}
                      onMouseEnter={() => setPopperPage({ ...page, coverImage })}>
                      <Link className={classes.breadcrumbLink} to={page.path}>
                        <IconButton className={classes.breadcrumbMarker} {...bindHover(popupState)}>
                          <span className={classes.breadcrumbTick}>{i + 1}</span>
                        </IconButton>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </AppBar>
      </HideOnScroll>
      <Popover
        {...bindPopover(popupState)}
        PaperProps={{
          className: classes.popover,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Grid
          alignItems="stretch"
          className={classes.card}
          container
          direction="column"
          justify="flex-start"
          spacing={0}>
          <Grid className={classes.cardHead} item style={{ width: `${PAGE_DETAILS_CARD_WIDTH}px` }}>
            {popperPage?.coverImage?.childImageSharp ? (
              <Img fluid={popperPage?.coverImage?.childImageSharp?.fluidLandscape} width={PAGE_DETAILS_CARD_WIDTH} />
            ) : (
              <img src={popperPage?.coverImage?.publicURL} width={PAGE_DETAILS_CARD_WIDTH} />
            )}
          </Grid>
          <Grid className={classes.cardBody} item>
            <Typography className={classes.typography} component="h2" variant="subtitle2">
              {popperPage?.title}
            </Typography>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}
