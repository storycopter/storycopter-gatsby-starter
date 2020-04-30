import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = (fullSize, textColor) =>
  makeStyles(theme => ({
    root: {
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
    child: {
      bottom: 0,
      height: '100%',
      left: 0,
      padding: 0,
      position: fullSize ? 'absolute' : 'static',
      right: 0,
      top: 0,
      width: '100%',
    },
    mask: {
      color: textColor || 'inherit',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      margin: 0,
      padding: `${theme.spacing(5)}px ${theme.spacing(3)}px`,
      position: 'relative',
      width: '100%',
      zIndex: 5,
    },
    object: {
      alignItems: 'center',
      display: 'flex',
      flex: '1 0 auto',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    caption: {
      padding: `${theme.spacing(2.5)}px ${theme.spacing(7)}px ${theme.spacing(0)}px`,
      [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(5)}px ${theme.spacing(7)}px ${theme.spacing(0)}px`,
      },
    },
  }));

export default function Figure({
  backgColor = null,
  fullSize = false,
  image,
  textColor = null,
  title = null,
  ...props
}) {
  const classes = useStyles(fullSize, textColor)();

  const [winDimensions, setWinDimensions] = useState(null);
  const [objDimensions, setObjDimensions] = useState(null);

  const getDimensions = () => {
    if (!window || !image?.childImageSharp) return null;

    const { aspectRatio } = image?.childImageSharp?.fluid;

    const wh = window.innerHeight;
    const ww = window.innerWidth;

    const h = fullSize ? wh : wh / 2;
    const w = ww;
    const r = w / h;

    setWinDimensions({ wh, ww });
    setObjDimensions({
      oh: aspectRatio < r ? (h / 5) * 3 : ((w / 5) * 3) / aspectRatio,
      ow: aspectRatio < r ? (h / 5) * 3 * aspectRatio : (w / 5) * 3,
    });
  };

  useEffect(() => {
    getDimensions();
  }, []);

  useEffect(() => {
    window?.addEventListener('resize', getDimensions);
    return () => window?.removeEventListener('resize', getDimensions);
  });

  // console.group('Figure');
  // console.log(props);
  // console.groupEnd();

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: backgColor || 'transparent',
        minHeight: fullSize ? '100vh' : 'auto',
        ...props?.style,
      }}>
      <div className={classes.child}>
        <figure
          className={classes.mask}
          style={{
            height: fullSize ? `${winDimensions?.wh}px` : `auto`,
          }}>
          <div className={classes.object}>
            {image?.childImageSharp ? (
              <Img
                alt={title}
                fluid={image?.childImageSharp?.fluid}
                style={{
                  height: objDimensions?.oh,
                  width: objDimensions?.ow,
                }}
              />
            ) : (
              <img alt={title} src={image.publicURL} style={{ maxHeight: '300px', height: '33vh' }} />
            )}
          </div>
          <figcaption className={classes.caption}>
            <Typography align="center" component="p" style={textColor ? { color: textColor } : null} variant="h6">
              {title}
            </Typography>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
