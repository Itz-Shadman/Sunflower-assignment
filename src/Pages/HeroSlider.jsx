import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <div className="w-full mx-auto my-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        <SwiperSlide>
          <div className="h-64 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-3xl font-bold">
            Learn Local Skills — Connect Locally
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white text-3xl font-bold">
            Teach, Learn, Swap.
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 flex items-center justify-center bg-gradient-to-r from-rose-500 to-orange-500 text-white text-3xl font-bold">
            Grow Together with SkillSwap 🌻
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
