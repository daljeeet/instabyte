import axios from "axios";
import {auth} from '../../config'
import {signOut} from "firebase/auth";

export const getUserDataApi = async(id:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/userdata/${id}`)
        return res.data.data[0]
    }catch(err){
        await signOut(auth)
    }
}

export const upageUserDataApi = async(data:any,id:string)=>{
    try{
        let res = await axios.patch(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/userdata/${id}`,data)
        return res.data
    }catch(err){
        console.log(err)
    }
}