import axios from "axios";
export const postUrlApi = async (data:any)=>{
    try{
        let res = await axios.post("https://api.imgbb.com/1/upload?key=28637f54cd49bcfaf5a6e92f18203898",data)
        return res.data.data.url
    }catch(err){
        console.log("error from api",err)
    }
} 
// https://instabyte.glitch.me/users