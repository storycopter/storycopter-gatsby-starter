import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import _ from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import CreditsIcon from '@ui/elements/icons/CreditsIcon';
import FullScreenIcon from '@ui/elements/icons/FullScreenIcon';
import SoundIcon from '@ui/elements/icons/SoundIcon';

const useStyles = () =>
  makeStyles(theme => ({
    root: {
      background: 'transparent',
      pointerEvents: 'none',
      bottom: 0,
      boxShadow: 'none',
      color: theme.palette.text.primary,
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
    left: {
      '& > *': {
        pointerEvents: 'auto',
      },
    },
    middle: { textAlign: 'center' },
    right: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      filter: 'none',
      '& > *': {
        pointerEvents: 'auto',
      },
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
  const theme = useTheme();
  const isBrowser = typeof window !== `undefined`;

  const soundtrack = _.find(allStaticFiles.edges, ({ node }) => node.base === allSiteData.sound.track.name)?.node
    ?.publicURL;

  const [sound, setSound] = useState(true);

  const onSoundToggle = () => {
    const newPref = !sound;
    setSound(newPref);
    if (isBrowser) localStorage.setItem('sound', newPref);
  };

  useEffect(() => {
    if (isBrowser) setSound(localStorage.getItem('sound') === 'false' ? false : true);
  }, []);

  console.group('Foobar.js');
  console.log({ theme });
  console.groupEnd();

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <Grid alignItems="center" container justify="space-between">
              <Grid className={classes.left} item xs>
                <AniLink color={theme.palette.primary.main} paintDrip to="/credits">
                  <Tooltip title="Credits">
                    <IconButton edge="start">
                      <CreditsIcon />
                    </IconButton>
                  </Tooltip>
                </AniLink>
              </Grid>
              <Grid className={classes.right} container item xs spacing={1}>
                {allSiteData?.sound?.enabled && allSiteData?.sound?.track ? (
                  <Grid item>
                    <Tooltip title="Background sound">
                      <IconButton onClick={onSoundToggle}>
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
      <NoSsr>
        <ReactPlayer
          height="1px"
          loop
          playing={sound}
          playsinline
          style={{ opacity: 0, position: 'absolute', right: 0, top: 0, visibility: 'hidden' }}
          url={soundtrack}
          volume={0.5}
          width="1px"
        />
      </NoSsr>
    </>
  );
}
