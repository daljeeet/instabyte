import { postDataType } from "../../Components/CreateModal" 
import axios from "axios";
export const postDetailsApi = async(data:postDataType)=>{
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}`,data)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const getAllPostsApi = async(page:number)=>{
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}?page=${page}`)
        return res.data.data
    }catch(err){
        console.log(err)
    }
}

export const deletePostApi = async(id:number|string)=>{
    try{
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`)
        return res;
    }catch(err){
        console.log(err)
    }
}

export const editPostApi = async(data:postDataType)=>{
    try{
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/${data._id}`,data)
        return res
    }catch(err){
        console.log(err)
    }
}