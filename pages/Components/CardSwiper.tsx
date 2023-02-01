import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Image from "next/image";


export default function CardSwiper(props:any) {
  let images = props?.data
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="h-full">
      { images?.map((el:string,id:number)=><SwiperSlide key={id}>
        {el?<Image src={el} alt="Post Image" width={1000} height={800}/>:<Image src="/emgerror.png" alt="error Image" width={1000} height={800} />  
      }
      </SwiperSlide>)}
      </Swiper>
    </>
  );
}
