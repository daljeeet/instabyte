import axios from "axios";

export const postUrlApi = async (data:any)=>{
    const api_key = '28637f54cd49bcfaf5a6e92f18203898';
    try{
        let res = await axios.post(`https://api.imgbb.com/1/upload?key=${api_key}`,data)
        return res.data.data.url
    }catch(err){
        console.log(err)
    }
}