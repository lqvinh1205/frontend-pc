import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './style.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function CarouselDetailProduct({ imageUrls }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(imageUrls);
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff'
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2">
        {imageUrls &&
          imageUrls.map((item) => (
            <SwiperSlide>
              <img alt="" src={item} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper">
        {imageUrls &&
          imageUrls.map((item) => (
            <SwiperSlide>
              <img alt="" src={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
