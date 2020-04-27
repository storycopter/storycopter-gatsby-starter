import Link from 'gatsby-link';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import _ from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import CreditsIcon from '@theme/elements/icons/CreditsIcon';
import FullScreenIcon from '@theme/elements/icons/FullScreenIcon';
import SoundIcon from '@theme/elements/icons/SoundIcon';

const useStyles = () =>
  makeStyles(theme => ({
    root: {
      background: 'transparent',
      bottom: 0,
      boxShadow: 'none',
      color: theme.brand.textColor,
      padding: theme.spacing(1),
      top: 'auto',
      transition: `background ${theme.transitions.duration.standard}ms`,
      zIndex: 2,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1),
      },
      [theme.breakpoints.up('xl')]: {
        padding: theme.spacing(1),
      },
    },
    left: {},
    middle: { textAlign: 'center' },
    right: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      filter: 'none',
    },
  }));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Foobar({ allSiteData, allStaticFiles, ...props }) {
  const classes = useStyles()();
  const withWindow = typeof window !== `undefined`;

  const soundtrack = _.find(allStaticFiles.edges, ({ node }) => node.base === allSiteData.sound.track.name)?.node
    ?.publicURL;

  const [sound, setSound] = useState(withWindow && localStorage.getItem('sound') === 'false' ? false : true);

  useEffect(() => {
    withWindow ? localStorage?.setItem('sound', sound) : null;
  }, [sound]);

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <Grid alignItems="center" container justify="space-between">
              <Grid className={classes.left} item xs>
                <Tooltip title="Credits">
                  <Link to="/credits">
                    <IconButton edge="start">
                      <CreditsIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Grid>
              <Grid className={classes.right} container item xs spacing={1}>
                {allSiteData?.sound?.enabled && allSiteData?.sound?.track ? (
                  <Grid item>
                    <Tooltip title="Background sound">
                      <IconButton onClick={() => setSound(state => !state)}>
                        <SoundIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ) : null}
                <Grid item>
                  <Tooltip title="Full screen">
                    <IconButton edge="end" onClick={props.onFullScreenToggle}>
                      <FullScreenIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <ReactPlayer
        height="1px"
        loop
        playing={sound}
        playsinline
        style={{ opacity: 0, position: 'absolute', right: 0, top: 0, visibility: 'hidden' }}
        url={soundtrack}
        volume={0.35}
        width="1px"
      />
    </>
  );
}
