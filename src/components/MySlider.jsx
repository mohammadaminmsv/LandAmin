import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MySlider = ({ slides = [] }) => {
  if (!slides.length) return null;

  return (
    <div className="relative group w-full mx-auto">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`slide-${i}`}
                className="w-full h-[400px] object-fill rounded-xl"
              />
              {slide.caption && (
                <div className="absolute bottom-6 right-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-xl text-lg">
                  {slide.caption}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* فلش‌های Swiper - مخفی تا Hover */}
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .group:hover .swiper-button-next,
          .group:hover .swiper-button-prev {
            opacity: 1;
          }
        `}
        {`
    .swiper-button-next::after,
    .swiper-button-prev::after {
      color: #E8C766;
      font-size: 40px;
    }
  `}
      </style>
    </div>
  );
};

export default MySlider;
