import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '700px',
  color: '#fff',
  lineHeight: '700px',
  textAlign: 'center',
  background: '#364d79'
};

const CarouselBanner = () => {
  return (
    <Carousel autoplay>
      <div style={contentStyle}>
        <img
          src="https://phucanhcdn.com/media/banner/18_Novf807eebd013970830161e4b14f3549df.jpg"
          alt=""
        />
      </div>
      <div style={contentStyle}>
        <img
          src="https://phucanhcdn.com/media/banner/05_Dec2f736ea6cf46316b80ccbbdd3059e198.jpg"
          alt=""
        />
      </div>
      <div style={contentStyle}>
        <img
          src="https://phucanhcdn.com/media/banner/14_Nove131737062f753b9fa5818e0523e7ae5.jpg"
          alt=""
        />
      </div>
      <div style={contentStyle}>
        <img
          src="https://phucanhcdn.com/media/banner/30_Nov6ee529bc20bba5397ecb8f07cd25fcc6.jpg"
          alt=""
        />
      </div>
    </Carousel>
  );
};

export default CarouselBanner;
