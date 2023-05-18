import { Dispatch } from 'redux';
import {GET_USER_POST_LOADING,
    GET_USER_POST_SUCCESS,
    GET_USER_POST_ERROR,
    GET_UESR_DATA_LOADING,
    GET_UESR_DATA_ERROR,
    GET_UESR_DATA_SUCCESS}from './user.action.type'
import {getOneUserPostApi, getUserDataApi} from './user.post.api'

export const getOneUserPost = (id:number|string)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    try{
        dispatch({type:GET_USER_POST_LOADING})
        let res = await getOneUserPostApi(id);
        dispatch({type:GET_USER_POST_SUCCESS,payload:res})
    }catch(err){
        dispatch({type:GET_USER_POST_ERROR})
    } 
}

export const getUserData = (id:number|string)=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_UESR_DATA_LOADING})
    try{
        let res = await getUserDataApi(id)
        dispatch({type:GET_UESR_DATA_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:GET_UESR_DATA_ERROR})
    }
}