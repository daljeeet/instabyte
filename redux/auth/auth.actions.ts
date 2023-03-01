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
GET_USER_LOADING,
GET_USER_ERROR,
GET_USER_SUCCESS,
UPDATE_USER_LOADING,
UPDATE_USER_ERROR,
UPDATE_USER_SUCCESS
  }from './auth.actions.types';
import {auth,google,github} from '../../config'
import { addUserApi, getUserDataApi, userLogoutApi,upageUserDataApi } from "./auth.api";

export type userdataType = {
    name:string|null,
    username?:string|null;
    email:string|null,
    id:string|null,
    profile:string|null,
    cover?:string
    _id?:string
    bookmarks?:string[]
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
        cover:"/cover.jpg",
        bookmarks:[]
    }  
    let res = await addUserApi(userData)
    dispatch({type:AUTH_SUCCESS,payload:res})
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
    dispatch({type:GET_USER_LOADING})
    try{
        auth.onAuthStateChanged(async(user)=>{
            if(user){
            let userDta = await getUserDataApi(user.uid)
            dispatch({type:GET_USER_SUCCESS,payload:userDta})
            }else{
            dispatch({type:GET_USER_ERROR})
            }
           })
    }catch(err){
        dispatch({type:GET_USER_ERROR})
    }
}

export const updateUserdata =  (data:any,id:string)=>async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    try{
     dispatch({type:UPDATE_USER_LOADING})
    let res =  await upageUserDataApi(data,id)
     dispatch({type:UPDATE_USER_SUCCESS,payload:{...res,...data}})
    }catch(err){
    dispatch({type:UPDATE_USER_ERROR})
    }
}