import Card from "../Components/Post/AllPosts";
import Status from "../Components/Status";
import Navbar from "../Components/Navbar/Navbar";
import CardSkl from "@/Components/Skulls/CardSkl";
import { useSelector } from "react-redux";
import { rootReducertype } from "@/redux/store";
import { useEffect, useState } from "react";
import { resPostDataType } from "@/helpers/dataTypes";

export default function Home() {
  const [showPost, setShowPost] = useState<any>(false)
  const postData:resPostDataType[] = useSelector((val: rootReducertype) => val?.allPosts?.postData)
  useEffect(()=>{
    if(postData?.length){
      setShowPost(false)
    }else{
      setShowPost(true)
    }
  },[postData])
    return (
    <>
    <Navbar/>
    <div className="md:w-[450px] px-1 md:m-auto pt-6 ">
      <div >
      <Status/>
      </div>
      {
       showPost?<CardSkl/>:<Card/>
      }
    </div>
    </>
  )
}
