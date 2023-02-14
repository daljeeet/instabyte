import { postDataType } from "../../Components/CreateModal" 
import axios from "axios";
export const postDetailsApi = async(data:postDataType)=>{
    try{
        const res = await axios.post("/api/insta",data)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const getAllPostsApi = async(page:number)=>{
    try{
        const res = await axios.get(`/api/insta?page=${page}`)
        return res.data.data
    }catch(err){
        console.log(err)
    }
}

export const deletePostApi = async(id:number|string)=>{
    try{
        const res = await axios.delete(`/api/insta/${id}`)
        return res;
    }catch(err){
        console.log(err)
    }
}

export const editPostApi = async(data:postDataType)=>{
    try{
        const res = await axios.patch(`/api/insta/${data._id}`,data)
        return res
    }catch(err){
        console.log(err)
    }
}