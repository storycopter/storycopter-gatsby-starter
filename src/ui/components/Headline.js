import PropTypes from 'prop-types';
import React from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = (align, backgColor, fullSize, maskColor, textColor) =>
  makeStyles(theme => ({
    root: {
      // ...console.log('HEADLINE THEME', theme),
      backfaceVisibility: 'hidden',
      backgroundColor: backgColor || 'transparent',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: textColor || 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: fullSize ? '100vh' : '50vh',
      paddingBottom: theme.spacing(15),
      paddingTop: theme.spacing(15),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      [theme.breakpoints.up('xl')]: {
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
      },
      '&:before': {
        backgroundColor: maskColor ? maskColor : 'transparent',
        bottom: 0,
        content: maskColor ? `' '` : 'none',
        display: maskColor ? 'block' : 'none',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
    },
    child: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      position: 'relative',
      textAlign: align === 'center' ? 'center' : 'left',
      zIndex: 2,
      [theme.breakpoints.up('sm')]: {
        // maxWidth: `${(100 / 5) * 4}%`,
      },
      [theme.breakpoints.up('md')]: {
        // maxWidth: `${(100 / 5) * 4}%`,
      },
      [theme.breakpoints.up('xl')]: {
        // maxWidth: '50%',
      },
    },
    headlineContent: {
      [theme.breakpoints.up('md')]: {
        flex: `0 0 ${(100 / 5) * 3}%`,
      },
      [theme.breakpoints.up('lg')]: {
        flex: `0 0 ${(100 / 5) * 3}%`,
      },
    },
    headlineTitle: {
      ...theme.typography.h1,
    },
    headlineSubtitle: {
      ...theme.typography.h3,
      marginTop: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4),
      },
      [theme.breakpoints.up('lg')]: {
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.up('xl')]: {
        marginTop: theme.spacing(4),
      },
    },
    headlineText: {
      ...theme.typography.h6,
      marginTop: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(4),
      },
      [theme.breakpoints.up('lg')]: {
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.up('xl')]: {
        marginTop: theme.spacing(4),
      },
    },
    headlineTitleInput: {
      ...theme.typography.h1,
    },
    headlineSubtitleInput: {
      ...theme.typography.h3,
    },
    headlineTextInput: {
      ...theme.typography.h5,
    },
    actionbar: {
      display: 'flex',
      flexDirection: align === 'center' ? 'row-reverse' : 'row',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      marginTop: theme.spacing(5),
      '& > * ': {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
      '& > *:first-child': {
        marginLeft: align !== 'center' ? 0 : theme.spacing(2),
      },
      '& > *:last-child': {
        marginRight: align !== 'center' ? 0 : theme.spacing(2),
      },
    },
  }));

export default function Headline({
  align = 'left',
  backgColor = null,
  backgImage = null,
  backgImageEnabled = false,
  children = null,
  fullSize = false,
  isEditable = false,
  maskColor = null,
  style = null,
  textColor = null,
  ...props
}) {
  const classes = useStyles(align, backgColor, fullSize, maskColor, textColor)();

  const onInputBlur = (e, key) => {
    props.onElementUpdate({
      [key]: e.target.value,
    });
  };

  const textFieldProps = {
    fullWidth: true,
    margin: 'none',
    multiline: true,
    rowsMax: '5',
    size: 'small',
    type: 'text',
    variant: 'outlined',
  };

  // console.group('Headline.js');
  // console.log({ backgImage });
  // console.groupEnd();

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: backgImageEnabled && backgImage?.name ? `url("${backgImage.publicURL}")` : 'none',
        ...style,
      }}>
      <Container className={classes.child} maxWidth={'lg'}>
        <div className={classes.headlineContent}>
          {isEditable || props.title ? (
            <Typography className={classes.headlineTitle} component="div" variant="h1" style={{ color: textColor }}>
              {isEditable ? (
                <TextField
                  {...textFieldProps}
                  defaultValue={props.title}
                  id="title"
                  inputProps={{
                    className: classes.headlineTitleInput,
                    maxLength: 150,
                    onBlur: e => onInputBlur(e, 'title'),
                    style: { textAlign: align === 'center' ? 'center' : 'left', color: textColor },
                  }}
                  name="title"
                  placeholder="Add title…"
                />
              ) : (
                <h1>{props.title}</h1>
              )}
            </Typography>
          ) : null}
          {isEditable || props.subtitle ? (
            <Typography className={classes.headlineSubtitle} component="div" variant="h3" style={{ color: textColor }}>
              {isEditable ? (
                <TextField
                  {...textFieldProps}
                  defaultValue={props.subtitle}
                  id="subtitle"
                  inputProps={{
                    className: classes.headlineSubtitleInput,
                    maxLength: 150,
                    onBlur: e => onInputBlur(e, 'subtitle'),
                    style: { textAlign: align === 'center' ? 'center' : 'left', color: textColor },
                  }}
                  name="subtitle"
                  placeholder="Add subtitle…"
                />
              ) : (
                <h2>{props.subtitle}</h2>
              )}
            </Typography>
          ) : null}
          {isEditable || props.text ? (
            <Typography className={classes.headlineText} component="div" variant="h5" style={{ color: textColor }}>
              {isEditable ? (
                <TextField
                  {...textFieldProps}
                  defaultValue={props.text}
                  id="text"
                  inputProps={{
                    className: classes.headlineTextInput,
                    maxLength: 250,
                    onBlur: e => onInputBlur(e, 'text'),
                    style: { textAlign: align === 'center' ? 'center' : 'left', color: textColor },
                  }}
                  name="text"
                  placeholder="Add text…"
                />
              ) : (
                <p>{props.text}</p>
              )}
            </Typography>
          ) : null}
          {children ? <div className={classes.actionbar}>{children}</div> : null}
        </div>
      </Container>
    </div>
  );
}

Headline.propTypes = {
  align: PropTypes.string,
  backgColor: PropTypes.string,
  backgImage: PropTypes.shape({
    name: PropTypes.string,
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  fullSize: PropTypes.bool,
  isEditable: PropTypes.bool,
  maskColor: PropTypes.string,
  onElementUpdate: PropTypes.func,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string,
};
