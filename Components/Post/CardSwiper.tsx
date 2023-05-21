import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
import { postDataType, resPostDataType } from "@/helpers/dataTypes";

type cardSwiperType = {
  data: resPostDataType|postDataType
}
export default function CardSwiper({ data }: cardSwiperType) {
  let images = data.imgUrl
  return (
    <>
      <Swiper autoHeight={true} pagination={true} modules={[Pagination, Autoplay]} className="" autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}>
        {images?.map((el: string, id: number) => <SwiperSlide key={id}>
          <Image className="w-full h-fit" src={el} alt="Post Image" width={600} height={500} placeholder='blur' blurDataURL={"/imgLoader.gif"} />
        </SwiperSlide>)}
      </Swiper>
    </>
  );
}
