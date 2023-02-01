import axios from 'axios'
import React,{useState,Dispatch,useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import { postUrl, resetPost } from '../redux/ImageUrl/actions'
import { getAllPosts, postDetails } from '../redux/postdata/post.actions'

type createmodalTypes = {
    createModal: boolean,
    handleModal: ()=>void
}
export type commontsType = {user:string,comment:string}
export type postDataType={
        caption: string,
        imgUrl: string[],
        owner: string,
        posted_on:string,
        likes: string[],
        id: string | number,
        comments:commontsType[],
}

const CreateModal = (props: createmodalTypes) => {
    const {loading,error, user} = useSelector((val:any)=>val?.user)
    const {isloading,img,iserror,isdone} = useSelector((val:any)=>val?.imgUrl)
    const dispatch:Dispatch<any> = useDispatch()
    const [caption, setCaption]  = useState("Caption...")
    useEffect(() => {
      dispatch(getAllPosts())
    }, [dispatch])
    const handleCaption = (e: { target: { value: React.SetStateAction<string> } })=>{
        setCaption(e.target.value)
    }
    const handleImage = (e: { target: any })=>{
    let form = new FormData()
    form.append("image",e.target.files[0])
    dispatch(postUrl(form))
}
const handleClose = ()=>{
    dispatch(resetPost())
    props.handleModal()
}
const handlePost = ()=>{
    let datestr = new Date().toLocaleDateString()
    const postData:postDataType = {
        caption: caption,
        imgUrl:[img],
        owner: user.name,
        likes: [],
        id: user.id,
        posted_on:datestr,
        comments:[
          {
            user:"",
            comment:""
          }
        ]
      }
      dispatch(postDetails(postData))
      props.handleModal()
      dispatch(getAllPosts())
}
   return (<>
        {props.createModal||<div className={`fixed top-0 left-0 bg-black/60 right-0 w-full h-screen flex items-center justify-center z-10`} >
            {
                iserror?<div> Image Upload Failed ☹️ <span onClick={handleClose} className='underline font-bold text-sm'>close</span> </div>:                
                <div className='m-auto h-fit w-11/12 md:w-96 bg-gray-700 text-center text-white rounded-lg'>
                <div className='w-full relative'>
               {isloading?<h3 className='text-2xl'>Please Wait...</h3> :<h3 className='text-2xl'>Create a Post </h3> }
                <AiOutlineClose onClick={handleClose} className='absolute right-0 top-0 text-xl mt-2 mr-2 font-bold cursor-pointer'/>
                </div>
                {
                    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                    isloading?<img src="https://cdn.dribbble.com/users/563824/screenshots/3633228/media/d876c7712d969c0656302b16b16af2cc.gif" />:
                    //  eslint-disable-next-line @next/next/no-img-element
                    <img className='w-5/6 m-auto bg-black/80 my-4' src={img} alt="" />
                }
                {isdone?<div className='flex w-11/12 m-auto justify-around py-1 mb-4' > 
                    <input type="text" placeholder='Post Caption here' className='bg-gray-600 rounded-lg pl-2  outline-none' value={caption} onChange={handleCaption} />
                    <button onClick={handlePost} className='bg-blue-800 px-4 py-1 rounded-lg w-fit m-auto'>Post</button>
                     </div>:
                <div className='bg-blue-700 py-1 px-4 w-fit m-auto mb-4'>
                 <label htmlFor='imageUpload'>Select from Device
                    <input onChange={handleImage} type="file" className='hidden' id="imageUpload" accept="image"/>
                </label>
                </div>}
            </div>}
        </div>}
        </>
    )
}

export default CreateModal