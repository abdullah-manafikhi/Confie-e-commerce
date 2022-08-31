import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Navigation , Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";



function BestSeller() {
  return (
    <div className='h-screen w-screen'>
        <Swiper
            slidesPerView={3}
            spaceBetween={60}
            navigation
            autoplay ={{
                delay: 500,
            }}
            pagination={{
            clickable: true,
            }}
            modules={[Pagination , Autoplay , Navigation]}
            className="mySwiper h-72"
        >
            <SwiperSlide className='bg-red-600 '>Slide 1</SwiperSlide>
            <SwiperSlide className='bg-green'>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
    </div>      
  )

}

export default BestSeller
