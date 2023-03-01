import { getComments } from '@/redux/comments/comments.action'
import Image from 'next/image'
import React, { useState,useEffect,useRef,Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import BlurImage from './BlurImage'
import { postDataType } from './CreateModal'
import PostDetails from './PostDetails'
type postdataObj={
    data:postDataType
    isLast:boolean;
    newLimit:()=>void
}
const ExploreImg = (props:postdataObj) => {
    const [modal, setModal]= useState(false)
    const {data,isLast,newLimit} = props;
    const [dta,setDta]= useState(data)
    const cardRef: any = useRef()
    const dispatch:Dispatch<any> = useDispatch()
    useEffect(() => {
        if (!cardRef?.current) return
        const observe = new IntersectionObserver(([entry]) => {
            if (isLast&& entry.isIntersecting) {
                newLimit();
                observe.unobserve(entry.target)
            } else {
            }
        })
        observe.observe(cardRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLast])


    const handleImagePost = (data:postDataType)=>{
        setModal(true)
        if(data._id){
            setDta(data)
            dispatch(getComments(data._id))
        }
    }
    const closePostDtlModal = ()=>{
        setModal(false)
    }
  return (
    <>
       {data?.imgUrl.map((el,id)=><Image ref={cardRef} key={id} src={el} width={400} height={400} placeholder="blur" alt="image" onClick={()=>handleImagePost(data)} onLoad={(e:any)=>{e.target.naturalHeight>500?e.target.className="rounded-lg row-span-2 cursor-zoom-in ":e.target.className="rounded-lg self-center cursor-zoom-in"}} blurDataURL={BlurImage} />
       )}
    {modal&&<PostDetails data={dta} closeModal={closePostDtlModal}  />}
    </>
  )
}

export default ExploreImg