import { postUrl, resetPost } from '@/redux/ImageUrl/actions'
import { rootReducertype } from '@/redux/store'
import React,{Dispatch, useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillImageFill} from 'react-icons/bs'
import { BiImageAdd} from 'react-icons/bi'
import Image from 'next/image'
import Loader from './Loader'
import { updateUserData } from '@/redux/user_data/user_data_acitons'
import BlurImage from './BlurImage'

type addType = {
  isProfile:boolean
  closeAddMorePhotos:()=>void
}
const ChangeProfile = (props:addType) => {
  const dispatch:Dispatch<any> = useDispatch()
  const { userData,patch_loading,patch_error} = useSelector((val: rootReducertype) => val.userDetails)
    useEffect(()=>{
        return ()=>{
            dispatch(resetPost())
        }
    },[dispatch])
  const {closeAddMorePhotos,isProfile,} = props;
    const {isloading,img,iserror,isdone} = useSelector((val:rootReducertype)=>val?.imgUrl)
    useEffect(() => {
      document.body.className="overflow-y-hidden";
      return ()=>{
      document.body.className="overflow-y-auto";
      }
  }, [])
    const handleClose = ()=>{
      closeAddMorePhotos()
    }
    const handleImage = (e:any)=>{
        let form = new FormData()
        form.append("image",e.target.files[0])
        dispatch(postUrl(form))
    }
    const PostAddImage = ()=>{
      if(userData._id){
        if(isProfile){
          dispatch(updateUserData({profile:img},userData._id))
          if(!patch_loading&&!patch_error){
            userData.profile=img;
          }
        }else{
          dispatch(updateUserData({cover:img},userData._id))
          if(!patch_loading&&!patch_error){
            userData.cover=img;
          }
        }
      }
    //   data.imgUrl.push(img)
    //   if(data._id){
        // dispatch(editPost(data.imgUrl,data._id))
    //   }
      handleClose()
    }
  return (
  <>
    <div onClick={handleClose} className={`fixed top-0 left-0 bg-black/60 right-0 w-full min-h-screen flex items-center justify-center z-10`} >
    {iserror?<div> Image Upload Failed ☹️ <span onClick={handleClose} className='underline font-bold text-sm'>close</span> </div>:
    <div onClick={(e)=>{e.stopPropagation()}} className='m-auto w-5/6 md:w-96 bg-gray-900 text-center text-white rounded-lg max-h-[80vh] overflow-auto animate-in zoom-in'>
                <div className='w-full relative my-4'>
               {isloading?<div className='w-3/4 m-auto h-12 overflow-hidden'><Loader text="Please Wait..." /></div>:<h3 className='text-xl'>Update {isProfile?"Profile":"Cover"} Photo</h3> }
                <AiOutlineClose onClick={handleClose} className='absolute right-0 top-0 text-xl mt-2 mr-2 font-bold cursor-pointer'/>
                </div>
                <div className='m-auto w-1/2 flex items-center justify-center'>
                  {
                    isdone? isProfile?<Image src={img} width={200} height={180} alt='updated Profile' className='rounded-full h-32 md:h-40 w-32 md:w-40' blurDataURL={BlurImage}/>:<Image src={img} width={800} height={1200} alt='updated cover' blurDataURL={BlurImage}/>  : isProfile?<Image src={(userData?.profile)||"/demo_img.png"} width={200} height={200} alt='Profile' className='rounded-full h-32 md:h-40 w-32 md:w-40' blurDataURL={BlurImage} />:<Image src={(userData.cover)||"/demo_img.png"} width={500} height={200} alt='cover image' blurDataURL={BlurImage}/>
                  }
                </div>
                <div className='p-2 my-4 w-fit m-auto flex w-1/2 justify-around'>
                 <label htmlFor='imageUpload' className='border-blue-700 border-2 rounded-md px-2 py-1'><BiImageAdd className='text-4xl cursor-pointer ' />
                    <input onChange={handleImage} type="file" className='hidden' id="imageUpload" accept="image"/>
                </label>
                <button onClick={PostAddImage} disabled={!isdone} className='border-blue-500 border-2 rounded-md px-2 font-bold'>
                  Done
                </button>
                </div>
            </div>}
    </div>
    </>
  )
}

export default ChangeProfile