import axios from "axios";
import {userdataType } from "./auth.actions";
export const addUserApi = async(data:userdataType)=>{
    try{
     let res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}`,data)
     await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_AUTH}`)
     return res.data.user;
    }catch(err){
        console.log(err)
    }
}

export const userLogoutApi = async()=>{
    try{
        let res = await axios.post(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/logout`)
        return res
    }catch(err){
        return err
    }
}

export const getUserDataApi = async(id:string)=>{
    try{
        let res = await axios.get(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/userdata/${id}`)
        return res.data.data
    }catch(err){

    }
}

export const upageUserDataApi = async(data:any,id:string)=>{
    try{
        let res = await axios.patch(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/userdata/${id}`,data)
        return res.data.data
    }catch(err){
        console.log(err)
    }
}