import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import colors from '@ui/settings/colors';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger();
  return (
    <Fade appear={false} direction="down" in={!trigger}>
      {children}
    </Fade>
  );
}

const useStyles = () =>
  makeStyles(theme => ({
    root: {
      backfaceVisibility: 'hidden',
      bottom: '-1%',
      boxShadow: `0 0 100px ${colors.shadow[700]} inset`,
      filter: 'blur(1px) grayscale(100%)',
      left: '-6%',
      pointerEvents: 'none',
      position: 'fixed',
      right: '-6%',
      top: '-1%',
      zIndex: 100,
      [theme.breakpoints.up('md')]: {
        boxShadow: `0 0 150px ${colors.shadow[800]} inset`,
      },
      [theme.breakpoints.up('xl')]: {
        boxShadow: `0 0 200px ${colors.shadow[900]} inset`,
      },
    },
  }));

export default function Vignette() {
  const classes = useStyles()();
  return (
    <HideOnScroll>
      <div className={classes.root} />
    </HideOnScroll>
  );
}
