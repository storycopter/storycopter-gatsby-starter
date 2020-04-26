import React from 'react';
import Link from 'gatsby-link';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import colors from '@theme/settings/colors';
import CreditsIcon from '@theme/elements/icons/CreditsIcon';
import SoundIcon from '@theme/elements/icons/SoundIcon';
import FullScreenIcon from '@theme/elements/icons/FullScreenIcon';

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

export default function Foobar(props) {
  const classes = useStyles()();
  return (
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
              <Grid item>
                <Tooltip title="Background sound">
                  <IconButton>
                    <SoundIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Full screen">
                  <IconButton edge="end">
                    <FullScreenIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
