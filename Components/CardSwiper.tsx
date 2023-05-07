import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootReducertype } from "@/redux/store";
import { editPost } from "@/redux/postdata/post.actions";
import { useRouter } from "next/router";
import { AiFillHeart } from "react-icons/ai";
import { postDataType } from "@/helpers/dataTypes";

type cardSwiperType = {
  data: postDataType
}
export default function CardSwiper({ data }: cardSwiperType) {
  const user = useSelector((val: rootReducertype) => val?.user?.user)
  const [hide, setHide] = useState(false)
  const dispatch: Dispatch<any> = useDispatch()
  const Router = useRouter()
  let images = data.imgUrl
  useEffect(() => {
    let id: any;
    if (id) {
      clearInterval(id)
    }
    if (hide) {
      id = setTimeout(() => {
        setHide(false);
        clearTimeout(id)
      }, 500);
    }

  }, [hide])

  const handleDoubleTap = (data: postDataType) => {
    setHide(true)
    if (user && data._id) {
      const exist = data?.likes?.filter((el) => {
        return el === user?.id
      })
      if(exist.length===0){
        data.likes.push(user.id)
        dispatch(editPost({ likes: data.likes }, data._id))
      }else{
      ""
      }
    } else {
      Router.push("/login")
    }

  }
  return (
    <>
      <Swiper autoHeight={true} pagination={true} modules={[Pagination, Autoplay]} className="" autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}>
        {images?.map((el: string, id: number) => <SwiperSlide key={id} onDoubleClick={() => handleDoubleTap(data)}>
          <Image className="w-auto h-fit" src={el} alt="Post Image" width={1000} height={800} placeholder='blur' blurDataURL={"/imgLoader.gif"} />
        </SwiperSlide>)}
      </Swiper>
      {hide &&
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
           <AiFillHeart className="text-6xl z-10 text-red-700 animate-in spin-in-90 zoom-in duration-200" />
          </div>
      }
    </>
  );
}
