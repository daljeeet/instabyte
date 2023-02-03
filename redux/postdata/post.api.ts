import { postDataType } from "../../Components/CreateModal" 
import axios from "axios";
export const postDetailsApi = async(data:postDataType)=>{
    try{
        const res = await axios.post("https://instabyte.glitch.me/posts",data)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const getAllPostsApi = async()=>{
    try{
        const res = await axios.get("https://instabyte.glitch.me/posts")
        return res.data
    }catch(err){
        console.log(err)
    }
}