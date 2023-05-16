// await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_AUTH}`)  // for Authencating the user
import axios from "axios";
import { initialLoginData, initialUserData, userSocialData } from "./auth.actions";


export const registerUserApi = async(data:initialUserData)=>{
    try{
        let res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/register`,data)
        return res;
    }catch(err){
        throw err
    }
}
export const signInWithSocialMediaApi = async (data:userSocialData)=>{
try{
    let res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/social`,data)
    return res
}catch(err){
    throw err
}
}

export const loginUserApi = async (data:initialLoginData)=>{
    try{
        let res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/login`,data)
        console.log(data,res)
        return res
    }catch(err){
        throw err
    }
}
export const logoutUserApi = async()=>{
    try{
        let res = await axios.post(`${process.env.NEXT_PUBLIC_PROTECTED_URL}/logout`)
        return res
    }catch(err){
        throw err
    }
}
