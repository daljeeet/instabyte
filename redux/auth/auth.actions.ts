import {
    signOut,
    signInWithPopup,
    getAuth,
    getIdToken
  } from "firebase/auth";
  import{
    AUTH_LOADING,
AUTH_ERROR,
AUTH_SUCCESS,
AUTH_RESET,
AUTH_CHECK,
  }from './auth.actions.types';
  
import {auth,google,github} from '../../config'
import { addUserApi, updateUserDataApi, userLogoutApi } from "./auth.api";
export type userdataType = {
    name:string|null,
    username?:string|null;
    email:string|null,
    id:string|null,
    profile:string|null,
    cover?:string
    _id?:string
}
export const loginwithGoogle =()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:AUTH_LOADING})
    try{
       let user = await signInWithPopup(auth,google)
       const userData:userdataType = {
        name:user?.user?.displayName,
        email:user?.user?.email,
        username:user?.user?.displayName?.split(' ')[0],
        id:user?.user?.uid,
        profile:user?.user.photoURL,
        cover:"/logod.png"
    }  
    let res = addUserApi(userData)
    if(!res){
        signoutUser()
    }
    dispatch({type:AUTH_SUCCESS,payload:userData})
    }catch(err){
        dispatch({type:AUTH_ERROR})
    }
}

export const  loginwithGithub = ()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:AUTH_LOADING})
    try{
        let res = await signInWithPopup(auth,github)
        dispatch({type:AUTH_SUCCESS,payload:res})
    }catch(er){
        dispatch({type:AUTH_ERROR})
    }
}

export const signoutUser =()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    try{
        await signOut(auth)
        await userLogoutApi()
        dispatch({type:AUTH_RESET})
    }catch(err){
        console.log(err)
    }
}
export const isUserLogin = ()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:AUTH_LOADING})
    try{
        await auth.onAuthStateChanged((user)=>{
            const userData = {
                name:user?.displayName,
                email:user?.email,
                id:user?.uid,
                profile:user?.photoURL,
            }
            dispatch({type:AUTH_CHECK,payload:userData})
           })
    }catch(err){
        dispatch({type:AUTH_ERROR})
    }
}

export const updateUserdata =  (data:userdataType)=>async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    try{
     let res = await updateUserDataApi(data)
     console.log(res)
    }catch(err){
        console.log(err)
    }

}