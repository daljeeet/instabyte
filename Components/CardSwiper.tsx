import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
import BlurImage from "./BlurImage";

type cardSwiperType = {
  data: string[]
}
export default function CardSwiper(props: cardSwiperType) {
  let images = props?.data
  const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  return (
    <>
      <Swiper autoHeight={true} pagination={true} modules={[Pagination,Autoplay]} className="h-full" autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}>
        {images?.map((el: string, id: number) => <SwiperSlide key={id}>
          {el ? <Image  src={el} alt="Post Image" width={1000} height={800} placeholder='blur' blurDataURL={rgbDataURL(243,153,211)} /> : <Image src="/emgerror.png" alt="error Image" width={1000} height={800} />
          }
        </SwiperSlide>)}
      </Swiper>
    </>
  );
}
