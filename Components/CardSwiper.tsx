import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
import BlurImage from "./BlurImage";
import { useSelector } from "react-redux";
import { rootReducertype } from "@/redux/store";
import { useState } from "react";

type cardSwiperType = {
  data: string[]
}
export default function CardSwiper(props: cardSwiperType) {
  let images = props?.data
  const {postData} = useSelector((val: rootReducertype) => val?.allPosts)
  const [post, setPost] = useState({})
  const handleLikePost=()=>{
    console.log('clicked')
  }
  return (
    <>
      <Swiper autoHeight={true} pagination={true} modules={[Pagination,Autoplay]} className="h-full" autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}>
        {images?.map((el: string, id: number) => <SwiperSlide key={id}>
          <div onClick={handleLikePost}>
          {el ? <Image 
            blurDataURL={BlurImage} placeholder="blur" src={el} alt="Post Image" width={1000} height={800} /> : <Image src="/emgerror.png" alt="error Image" width={1000} height={800} />
          }
          </div>
        </SwiperSlide>)}
      </Swiper>
    </>
  );
}
