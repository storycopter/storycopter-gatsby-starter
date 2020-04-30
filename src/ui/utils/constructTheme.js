import { createMuiTheme } from '@material-ui/core/styles';
import { darken, lighten } from 'polished';

import setType from '@ui/mixins/setType';
import { colors } from '@ui';

const mui = createMuiTheme();

export default function constructTheme({ backgColor, brandColor, fonts, textColor, typography }) {
  return createMuiTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    palette: {
      text: {
        disabled: lighten(0.4, textColor),
        hint: lighten(0.4, textColor),
        primary: textColor,
        secondary: lighten(0.4, textColor),
      },
      background: {
        default: darken(0.4, backgColor),
        paper: backgColor,
      },
      primary: {
        contrastText: backgColor,
        dark: darken(0.3, brandColor),
        light: lighten(0.3, brandColor),
        main: brandColor,
      },
      storycopter: { ...colors },
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontFamily: fonts?.body || 'Arial, sans-serif',
      h1: {
        ...setType(900),
        fontFamily: fonts?.head || 'Gill Sans, sans-serif',
        fontWeight: '700',
        letterSpacing: '0.05em',
      },
      h2: {
        ...setType(700),
        fontFamily: fonts?.head || 'Gill Sans, sans-serif',
        fontWeight: '700',
      },
      h3: {
        ...setType(700),
        fontFamily: fonts?.body || 'Gill Sans, sans-serif',
        fontWeight: '400',
      },
      h4: {
        ...setType(600),
        fontFamily: fonts?.head || 'Gill Sans, sans-serif',
        fontWeight: '700',
        letterSpacing: '0.05em',
      },
      h5: {
        ...setType(500),
        fontFamily: fonts?.head || 'Gill Sans, sans-serif',
        fontWeight: '400',
      },
      h6: {
        ...setType(400),
        fontFamily: fonts?.head || 'Gill Sans, sans-serif',
        fontWeight: '500',
      },
      subtitle1: {
        ...setType(300),
        fontFamily: fonts?.body || 'Arial, sans-serif',
        fontWeight: '500',
      },
      subtitle2: {
        ...setType(300),
        fontFamily: fonts?.body || 'Arial, sans-serif',
        fontWeight: '400',
      },
      body1: {
        ...setType(400),
        fontFamily: fonts?.body || 'Arial, sans-serif',
        fontWeight: 'normal',
        letterSpacing: '0.02em',
      },
      body2: {
        ...setType(300),
        fontFamily: fonts?.body || 'Arial, sans-serif',
        fontWeight: 'normal',
        letterSpacing: '0.02em',
      },
      button: {
        ...setType(100),
        fontWeight: '700',
        letterSpacing: '0.2em',
      },
      caption: {
        ...setType(200),
        fontFamily: fonts?.body || 'Arial, sans-serif',
        fontWeight: '700',
      },
      overline: {
        ...setType(100),
        fontFamily: fonts?.body || 'Arial, sans-serif',
        fontWeight: '700',
        letterSpacing: '0.05em',
      },
    },
    overrides: {
      MuiIconButton: {
        root: {
          borderRadius: mui.spacing(1),
          color: colors.flare[900],
          padding: mui.spacing(0.75),
          transition: `background ${mui.transitions.duration.standard}ms, backdropFilter ${mui.transitions.duration.standard}ms`,
          '&:hover': {
            backgroundColor: colors.flare[200],
          },
        },
      },
      MuiButton: {
        root: {
          padding: `${mui.spacing(1.5)}px ${mui.spacing(2)}px`,
        },
        contained: {
          boxShadow: 'none',
          padding: `${mui.spacing(1.5)}px ${mui.spacing(2)}px`,
        },
        outlined: {
          borderWidth: '2px',
          padding: `${mui.spacing(1.5)}px ${mui.spacing(2)}px`,
        },
      },
      MuiTooltip: {
        tooltip: {
          ...setType(100),
          letterSpacing: '0.05em',
          backgroundColor: textColor,
          color: backgColor,
        },
      },
    },
  });
}
