import React, { useRef } from 'react';
import Slider from 'react-slick';
import sortBy from 'lodash/sortBy';

import Slide from './Slide';
import SlideshowStyles from './SlideshowStyles';

export default function Slideshow({ backgColor, fullSize, images, maskColor, style, textColor, ...props }) {
  const sliderRef = useRef();

  const sliderSettings = {
    adaptiveHeight: false,
    arrows: false,
    dots: false,
    fade: true,
    slidesToShow: 1,
    variableWidth: false,
  };

  // console.group('Slideshow.js');
  // console.log({ backgColor });
  // console.log(images.length);
  // console.groupEnd();

  return (
    <>
      <SlideshowStyles />
      <Slider {...sliderSettings} ref={sliderRef} style={style}>
        {sortBy(images, [o => o.order]).map((image, i) => {
          const settings = {
            backgColor,
            fullSize,
            image: {
              ...image,
              order: i + 1,
            },
            maskColor,
            textColor,
          };
          return (
            <Slide
              canvasHeight={props.canvasHeight}
              count={images.length}
              key={image.order}
              onCallNext={() => sliderRef.current.slickNext()}
              onCallPrev={() => sliderRef.current.slickPrev()}
              settings={settings}
              sliderRef={sliderRef}
            />
          );
        })}
      </Slider>
    </>
  );
}

Slideshow.propTypes = {};
