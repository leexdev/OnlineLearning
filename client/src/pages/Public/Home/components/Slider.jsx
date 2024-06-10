import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Correct import for modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

const Slider = () => {
  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        className="relative overflow-hidden rounded-lg h-30vh xs:h-40vh xl:h-90vh object-cover"
      >
        <SwiperSlide>
          <img
            src={images.banner}
            className="block w-full h-full object-cover"
            alt="Slide 1" 
          />
        </SwiperSlide>
      </Swiper>

      {/* Navigation Buttons */}
      <button
        type="button"
        className="swiper-button-prev absolute top-1/2 transform -translate-y-1/2 left-0 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="swiper-button-next absolute top-1/2 transform -translate-y-1/2 right-0 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default Slider;
