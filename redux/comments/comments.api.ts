import { commentType } from "@/Components/Comment"
import axios from "axios"

export const addCommentApi = async(comment:commentType)=>{
    try{    
        let res = await axios.post(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/addcomment`,comment)
        return res
    }catch(err){
        console.log(err)
    }
}
export const getCommentsApi = async(id:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/getcomments/${id}`)
        return res.data.data
    }catch(err){
        console.log(err)
    }
}
export const deleteCommentApi = async(id:string)=>{
    try{
        let res = await axios.post(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/getcomments/${id}`)
        console.log(res)
    }catch(err){
        console.log(err)
    }
}