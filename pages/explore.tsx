import Navbar from '@/Components/Navbar'
import {Post} from  "@/models/Post.js"
import dbConnect from '../lib/dbConnect'
import React, { useEffect, useState } from 'react'
import { postDataType } from '@/Components/CreateModal.jsx';
import Image from 'next/image';
import PostDetails from '@/Components/PostDetails';
import {elem} from '../Components/Card'
import BlurImage from '@/Components/BlurImage';
type dataTypes = {
  data:postDataType[]
}
const Explore = ({data}:dataTypes) => {
  const posts = data
  const [images, setImages ] = useState([""])
  const [modal, setModal] = useState(false)
  const [postObj,setPostObj] = useState(elem)
  //===================================extracting all Images from all posts======================
  useEffect(()=>{
    let imgs:string[]=[]
    posts.map((el:postDataType)=>{
      el?.imgUrl.forEach(e=>{
        imgs?.push(e)
      })
    })
    setImages(imgs)
  },[posts])

  //=================================view Post on click of Image====================================
  const handleImagePost = (e:string)=>{
    let viewPost = posts.filter((el:postDataType)=>{
      for(let i=0;i<el.imgUrl.length;i++){
        if(e===el.imgUrl[i]){
          return el
        }
      }
    })
    setModal(true)
    setPostObj(viewPost[0])
  }
 
const closePostDtlModal = ()=>{
  setModal(false)
}

  return (
    <>
     <Navbar/>
    <div className='md:ml-52 pt-14 h-fit' >
      <div className='grid gap-4 p-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 grid-rows-auto'>
       {images?.map((el:string,id:number)=><Image key={id} placeholder='blur' blurDataURL={BlurImage} onClick={()=>handleImagePost(el)} src={el||"/demo_img.png"} alt='allpics' width={400} height={800} onLoad={(e:any)=>{e.target.naturalHeight>550?e.target.className="rounded-lg row-span-2 cursor-zoom-in ":e.target.className="rounded-lg self-center cursor-zoom-in"}} />
        )}
    </div>
    </div>
    {modal&&<PostDetails data={postObj} closeModal={closePostDtlModal}  />}
    </>
  )
}
export const getServerSideProps= async ()=>{
  await dbConnect()

  let result =  await Post.aggregate([
    {
      $lookup: {
          from: "users",
          localField: "author",
          foreignField: "id", 
          as: "result"
      }
    }
  ]).sort({_id: -1})
//  const res = await Post.find().sort({_id:-1})
      return { props: {data:JSON.parse(JSON.stringify(result))}}
    // return { props: {data:JSON.parse(JSON.stringify(result))}}
    
}
export default Explore;