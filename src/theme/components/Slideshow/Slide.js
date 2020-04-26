import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const MIN_HEIGHT = 300;

const useStyles = (image, textColor) =>
  makeStyles(theme => ({
    root: {
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      overflow: 'hidden',
      position: 'relative',
      height: '100%',
      width: '100%',
    },
    child: {
      bottom: 0,
      height: '100%',
      left: 0,
      padding: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
      '&:before, &:after': {
        backgroundImage: image?.backgImageEnabled ? `url("${image.publicURL}")` : 'none',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        bottom: 0,
        content: image?.backgImageEnabled ? `" "` : 'none',
        display: image?.backgImageEnabled ? 'block' : 'none',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      '&:before': {
        filter: 'blur(5px)',
        webkitFilter: 'blur(5px)',
        zIndex: 1,
      },
      '&:after': {
        filter: 'blur(5px)',
        webkitFilter: 'blur(5px)',
        zIndex: 2,
      },
    },
    mask: {
      color: textColor || 'inherit',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      margin: 0,
      padding: theme.spacing(3),
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
      display: 'flex',
      flex: '0 1 auto',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      position: 'relative',
      textAlign: 'center',
      zIndex: 50,
    },
    arrows: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    arrow: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }));

export default function Slide({
  canvasHeight = null,
  count,
  maxHeight,
  onCallNext,
  onCallPrev,
  sliderRef,
  settings: { backgColor = null, fullSize = null, image = null, maskColor = null, textColor = null },
  ...props
}) {
  const slideClasses = useStyles(image, textColor)();

  const [winDimensions, setWinDimensions] = useState(null);
  const [objDimensions, setObjDimensions] = useState(null);

  const getDimensions = () => {
    if (!window || !image?.childImageSharp) return null;

    const { aspectRatio } = image?.childImageSharp?.fluid;

    const wh = window.innerHeight;
    const ww = window.innerWidth;

    const h = fullSize ? wh : wh / 2 < MIN_HEIGHT ? MIN_HEIGHT : wh / 2;
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

  // console.group('Slide');
  // console.log(props);
  // console.log(backgColor);
  // console.groupEnd();

  return (
    <div {...props}>
      <div
        className={slideClasses.root}
        style={{
          ...props.style,
          backgroundColor: backgColor || 'transparent',
          backgroundImage: image.backgImageEnabled ? `url("${image.publicURL}")` : 'none',
          minHeight: fullSize ? canvasHeight || '100vh' : '50vh',
        }}>
        <div className={slideClasses.child}>
          <figure
            className={slideClasses.mask}
            style={{
              backgroundColor: maskColor || 'transparent',
              height: fullSize
                ? `${winDimensions?.wh}px`
                : `${winDimensions?.wh / 2 < MIN_HEIGHT ? MIN_HEIGHT : winDimensions?.wh / 2}px`,
            }}>
            <div className={slideClasses.object}>
              {image?.childImageSharp ? (
                <Img
                  alt={image.caption}
                  fluid={image?.childImageSharp?.fluid}
                  style={{
                    height: objDimensions?.oh,
                    width: objDimensions?.ow,
                  }}
                />
              ) : (
                <img alt={image.caption} src={image.publicURL} style={{ maxHeight: '300px', height: '33vh' }} />
              )}
            </div>
            <figcaption className={slideClasses.caption}>
              {count > 1 ? (
                <Typography className={slideClasses.arrows} variant="caption" component="div">
                  <IconButton className={slideClasses.arrow} color="inherit" onClick={onCallPrev} size="small">
                    <ArrowBackIcon fontSize="inherit" />
                  </IconButton>
                  {image.order < 10 ? `0${image.order}` : image.order} / {count < 10 ? `0${count}` : count}
                  <IconButton className={slideClasses.arrow} color="inherit" onClick={onCallNext} size="small">
                    <ArrowForwardIcon fontSize="inherit" />
                  </IconButton>
                </Typography>
              ) : null}
              <Typography noWrap variant="body1">
                {image.caption}
              </Typography>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

Slide.propTypes = {};
