
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const Status = () => {
    const data = [1,2,3,4,2,3,1,122,2,3,23,4,3,42,]

  return (
    <div className="hidden md:block mt-5 h-20 w-full">
    <Swiper
      slidesPerView={6}
      spaceBetween={18}
      className="md:h-[80%] h-full"
    >
      {data.map((el,id)=><SwiperSlide key={id} className='border-2 rounded-full flex justify-center items-center'>slide {el}</SwiperSlide>)}
    </Swiper>
  </div>
  )
}
export default Status