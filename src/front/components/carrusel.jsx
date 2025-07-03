/* eslint-disable @next/next/no-img-element */
"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // estilos del autoplay

import { IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import logo1 from "../assets/img/carruselimg1.png";
import logo2 from "../assets/img/carruselimg3.png";
import logo3 from "../assets/img/carruselimg2.png";



/* -------------------------------------------------------------------------- */
/*  Bullets de paginación                                                     */
/* -------------------------------------------------------------------------- */
function customPagination(_, className) {
  return `<span class="${className} w-4 h-4 !opacity-50
      [&.swiper-pagination-bullet-active]:!opacity-100
      [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))]"></span>`;
}

/* -------------------------------------------------------------------------- */
/*  Carrusel                                                                  */
/* -------------------------------------------------------------------------- */
const Carousel = () => {
  return (
    <div className="max-w-[686px] shadow-2xl shadow-purple-500/60">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3500,            // milisegundos entre slides
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: customPagination,
        }}
        className="relative rounded-lg"
      >
        {[logo2, logo1, logo3].map((logo, index) => (
          <SwiperSlide key={index} className="select-none">
            <img
              src={logo}
              alt={`slide-${index}`}
              className="mx-auto w-[65%] sm:w-full h-[500px] sm:h-[700px]
                         md:h-[750px] lg:h-[800px]  shadow-3xl
                         rounded-lg"
            />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default Carousel;


