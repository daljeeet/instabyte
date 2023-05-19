import { Dispatch } from 'redux';
import{
    LOGIN_USER_LOADING,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_LOADING,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER_LOADING,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_SUCCESS,
  }from './auth.actions.types';
import { loginUserApi, logoutUserApi, registerUserApi, signInWithSocialMediaApi } from './auth.api';
  export interface initialUserData{
    name:string,
    email:string,
    password:string,
    username:string
  }
export const registerUser = (data:initialUserData)=>async(dispatch:Dispatch)=>{
dispatch({type:REGISTER_USER_LOADING})
try{
    let res = await registerUserApi(data)
    dispatch({type:REGISTER_USER_SUCCESS,payload:res.data})
}catch(err){
    dispatch({type:REGISTER_USER_ERROR,payload:err})
}
}


export interface userSocialData{
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
}

export const signInWithSocialMedia = (data:userSocialData)=>async(dispatch:Dispatch)=>{
    dispatch({type:LOGIN_USER_LOADING})
    try{
        let res = await signInWithSocialMediaApi(data)
        dispatch({type:LOGIN_USER_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:LOGIN_USER_ERROR})
    }
}

export interface initialLoginData{
    email:string,
    password:string
}

export const loginUser = (data:initialLoginData)=>async(dispatch:Dispatch)=>{
    dispatch({type:LOGIN_USER_LOADING})
    try{
        let res = await loginUserApi(data)
        dispatch({type:LOGIN_USER_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:LOGIN_USER_ERROR})
    }
}

export const logoutUser = ()=>async(dispatch:Dispatch)=>{
    dispatch({type:LOGOUT_USER_LOADING})
    try{
        await logoutUserApi()
        dispatch({type:LOGOUT_USER_SUCCESS})
    }catch(err){ 
        dispatch({type:LOGOUT_USER_ERROR})
    }
}


// old function for updating user


export const updateUserdata =  (data:any,id:string)=>async(dispatch: (arg0: { type: string; payload?:any }) => void)=>{
    try{
     dispatch({type:"UPDATE_USER_LOADING"})
    let res =  "wait"
     dispatch({type:"UPDATE_USER_SUCCESS",payload:'helo'})
    }catch(err){
    dispatch({type:"UPDATE_USER_ERROR"})
    }
}
