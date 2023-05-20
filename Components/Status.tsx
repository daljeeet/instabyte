
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper";
const Status = () => {

    const data = ["🆆","🅴","🅻","🅲","🅾","🅼","🅴"," 🆃","🅾"," 🅸","🅽","🆂","🆃","🅰","🅱","🆈","🆃","🅴"]
  return (
    <div className="md:block mt-2 h-20 w-full">
    <Swiper
      slidesPerView={7}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      spaceBetween={5}
      className="md:h-[50%] h-full"
      modules={[Autoplay]}
    >
      {data.map((el,id)=><SwiperSlide key={id} className='rounded-full flex justify-center items-center text-4xl'>{el}</SwiperSlide>)}
    </Swiper>
  </div>
  )
}
export default Status