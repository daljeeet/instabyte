import { postDataType } from '@/helpers/dataTypes';
import {GET_LOADING,
    GET_ERROR,
    GET_SUCCESS,
    PATCH_LOADING,
    PATCH_ERROR,
    PATCH_SUCCESS,
    POST_LOADING,
    POST_ERROR,
    DEL_LOADING,
    DEL_SUCCESS,
    DEL_ERROR,RESET_POSTS,
    POST_SUCCESS,
    INC_PAGE} from './actions.types'
import {deletePostApi, getAllPostsApi, postDetailsApi, updatePostApi} from './post.api'
import { Dispatch } from 'redux';

 
export const getAllPosts = (page:number)=>async(dispatch:Dispatch)=>{
    dispatch({type:GET_LOADING})
    try{
        let res = await getAllPostsApi(page)
    dispatch({type:GET_SUCCESS,payload:res})
}catch(err){
    dispatch({type:GET_ERROR})
}
}

export const postDetails = (data:postDataType)=>async(dispatch:Dispatch)=>{
    dispatch({type:POST_LOADING})
try{
   let res = await postDetailsApi(data)
    dispatch({type:POST_SUCCESS,payload:res})
}catch(err){
  dispatch({type:POST_ERROR}) 
}
}
export const deletePostt = (id:number|string)=>async(dispatch:Dispatch)=>{
    dispatch({type:DEL_LOADING})
    try{
        await deletePostApi(id);
            dispatch({type:DEL_SUCCESS,payload:id})
    }catch(err){
        dispatch({type:DEL_ERROR})
    }
}
export const updatePost = (post:any,id:string|number)=>async(dispatch:Dispatch)=>{
    dispatch({type:PATCH_LOADING})
    try{
       let res =  await updatePostApi(post,id)
        dispatch({type:PATCH_SUCCESS,payload:res.data})   
    }catch(err){
        dispatch({type:PATCH_ERROR})
    }
}

export const resetAllPosts =()=>(dispatch:Dispatch)=>{
    dispatch({type:RESET_POSTS})
}

export const nextPage = ()=>(dispatch:Dispatch)=>{
    dispatch({type:INC_PAGE})
} 