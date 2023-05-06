import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
import BlurImage from "./BlurImage";
import { Dispatch, MouseEventHandler, useEffect, useState } from "react";
import { postDataType } from "./CreateModal";
import { useDispatch, useSelector } from "react-redux";
import { rootReducertype } from "@/redux/store";
import { editPost } from "@/redux/postdata/post.actions";
import { useRouter } from "next/router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type cardSwiperType = {
  data:postDataType
}
export default function CardSwiper({data}: cardSwiperType) {
  const user = useSelector((val: rootReducertype) => val?.user?.user)
  const [state,setsState]= useState(false)
  const [hide, setHide] = useState(false)
  const dispatch:Dispatch<any> = useDispatch()
  const Router = useRouter()
  let images = data.imgUrl
  useEffect(()=>{
    const isLiked = data.likes.filter((el)=>{
      return el === user?.id
    })
    if(isLiked.length>0){
      setsState(true)
    }else{
      setsState(false)
    }
  },[data.likes, user?.id])
  const handleDoubleTap= (data:postDataType)=>{
    setHide(!hide)
    if (user) {
      if (state) {
          data?.likes?.push(user.id)
          if (data._id) {
              dispatch(editPost({ likes: data.likes }, data._id))
          }
      }
      else {
          let newLikedel = data.likes.filter((e) => {
              return e !== user.id
          })
          if (data._id) {
              data.likes = newLikedel;
              dispatch(editPost({ likes: data.likes }, data._id))
          }
      }
  } else {
      Router.push("/login")
  }
   
  }
  return (
    <div className="relative">
      <Swiper autoHeight={true} pagination={true} modules={[Pagination,Autoplay]} className="h-full" autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}>
        {images?.map((el: string, id: number) => <SwiperSlide key={id}  onDoubleClick={()=>handleDoubleTap(data)}>
          {el ? <Image  src={el} alt="Post Image" width={1000} height={800} placeholder='blur' blurDataURL={"/imgLoader.gif"} /> : <Image src="/emgerror.png" alt="error Image" width={1000} height={800}/>
          }
        </SwiperSlide>)}
      </Swiper>
      <div className=" absolute border-2  top-0 left-0 right-0 bottom-0 flex justify-center items-center">
     {state?
     <AiFillHeart className="text-6xl z-10 text-red-700 animate-in zoom-in duration-500"/>:
     <AiOutlineHeart className="text-6xl text-red-700 z-10 animate-out zoom-out duration-500"/>
      }
      </div>
    </div>
  );
}
