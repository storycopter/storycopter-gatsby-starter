import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = () =>
  makeStyles(theme => ({
    root: {
      background: 'transparent',
      bottom: 0,
      boxShadow: 'none',
      top: 'auto',
    },
    left: {},
    middle: { textAlign: 'center' },
    right: { textAlign: 'right' },
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
          <Grid container>
            <Grid className={classes.left} item xs>
              Item
            </Grid>
            <Grid className={classes.middle} item xs={6}>
              Item
            </Grid>
            <Grid className={classes.right} item xs>
              Item
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
