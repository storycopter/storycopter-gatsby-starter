import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import colors from '@ui/settings/colors';

const useStyles = () =>
  makeStyles(theme => ({
    root: {
      boxShadow: `0 0 100px ${colors.shadow[700]} inset`,
      filter: 'blur(1px) grayscale(100%)',
      bottom: '-1%',
      left: '-6%',
      pointerEvents: 'none',
      position: 'fixed',
      right: '-6%',
      top: '-1%',
      zIndex: 1,
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
  return <div className={classes.root} />;
}
