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
  }from './auth.actions.types'
  
import {auth,google,github} from '../../config'
export type userdataType = {
    name:string|null,
    email:string|null,
    id:string|null,
    profile:string|null
}
export const loginwithGoogle =()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:AUTH_LOADING})
    try{
       let user = await signInWithPopup(auth,google)
       const userData:userdataType = {
        name:user?.user?.displayName,
        email:user?.user?.email,
        id:user?.user?.uid,
        profile:user?.user.photoURL,
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
        console.log("firebase Auth", res)
        dispatch({type:AUTH_SUCCESS,payload:res})
    }catch(er){
        dispatch({type:AUTH_ERROR})
    }
}

export const signoutUser =()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    console.log('signout request')
    try{
        const res = await signOut(auth)
        console.log('after signout',res)
        dispatch({type:AUTH_RESET})
    }catch(err){
        console.log(err)
    }
}
export type userDetails ={
    name:string,
    email:string,
    id:string,
    profile:string
}

export const isUserLogin = ()=> async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    dispatch({type:AUTH_LOADING})
    try{
        auth.onAuthStateChanged((user)=>{
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
