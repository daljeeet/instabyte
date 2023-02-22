import axios from "axios"

export const getOneUserPostApi = async(id:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_POST}/${id}`)
        return res.data.data
    }catch(err){
        console.log(err)
    }
}

export const getUserDataApi = async(id:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/${id}`)
        console.log(res)
        // return res.data.data
    }catch(err){
        console.log(err)
    }
}