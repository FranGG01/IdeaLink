"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import * as React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import logo1 from '../assets/img/carruselimg1.png';
import logo2 from '../assets/img/carruselimg3.png';


function CustomNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <IconButton
        size="lg"
        variant="gradient"
        color="black"
        onClick={() => swiper.slidePrev()}
        className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
      </IconButton>
      <IconButton
        size="lg"
        variant="gradient"
        color="black"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowRight className="h-7 w-7 translate-x-px stroke-2" />
      </IconButton>
    </>
  );
}

function customPagination(_, className) {
  return `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))] !opacity-50 ![background:rgb(var(--color-background))]"></span>`;
}



 const Carousel = () => {
  return (
    <div className="max-w-[686px] mt-15 shadow-purple-500/100 ">
      <Swiper
        pagination={{
          enabled: true,
          clickable: true,
          dynamicBullets: true,
          renderBullet: customPagination,
        }}
        modules={[Navigation, Pagination]}
        className="relative rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background "
      >
        {[
          logo2,
          logo1
        ].map((logo, index) => (
          <SwiperSlide key={index} className="select-none ">
            <img
              src={logo}
              alt={`image-${index}`}
              className="h-[800px] w-full object-cover shadow-3xl"
            />
          </SwiperSlide>
        ))}
        <CustomNavigation />
      </Swiper>
    </div>
  );
}
export default Carousel