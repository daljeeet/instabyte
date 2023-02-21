import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Image from "next/image";
import BlurImage from "./BlurImage";

type cardSwiperType = {
  data: string[]
}
export default function CardSwiper(props: cardSwiperType) {
  let images = props?.data
  return (
    <>
      <Swiper autoHeight={true} pagination={true} modules={[Pagination]} className="h-full">
        {images?.map((el: string, id: number) => <SwiperSlide key={id}>
          {el ? <Image 
            blurDataURL={BlurImage} src={el} alt="Post Image" width={1000} height={800} /> : <Image src="/emgerror.png" alt="error Image" width={1000} height={800} />
          }
        </SwiperSlide>)}
      </Swiper>
    </>
  );
}
