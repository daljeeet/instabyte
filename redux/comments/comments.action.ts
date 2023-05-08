
import { commentType } from '@/helpers/dataTypes';
import {GET_COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    DELETE_COMMENTS_LOADING,
    DELETE_COMMENTS_SUCCESS,
    DELETE_COMMENTS_FAIL,
    ADD_COMMENTS_LOADING,
ADD_COMMENTS_SUCCESS,
ADD_COMMENTS_FAIL,RESET_COMMENTS} from './comments.action.types'
import { addCommentApi, deleteCommentApi, getCommentsApi } from './comments.api';

export const addComments = (comment:commentType)=> async(dispatch: (arg0: { type: string; payload?:any; }) => void)=>{
    dispatch({type:ADD_COMMENTS_LOADING})
try{
    let res  = await addCommentApi(comment)
    dispatch({type:ADD_COMMENTS_SUCCESS,payload:res.data.comment})
}catch(err){
dispatch({type:ADD_COMMENTS_FAIL})
}
}

export const getComments = (id:string)=>async(dispatch: (arg0: { type: string; payload?: any; }) => void)=>{
    dispatch({type:GET_COMMENTS_LOADING})
    try{
        let res = await getCommentsApi(id);
            dispatch({type:GET_COMMENTS_SUCCESS,payload:res})
    }catch(err){
        dispatch({type:GET_COMMENTS_FAIL})
    }
}

export const deleteComment = (id:string)=>async(dispatch: (arg0: { type: string; payload?: void; }) => void)=>{
    dispatch({type:DELETE_COMMENTS_LOADING})
    try{
        let res = await deleteCommentApi(id)
        dispatch({type:DELETE_COMMENTS_SUCCESS,payload:res})

    }catch(err){
        dispatch({type:DELETE_COMMENTS_FAIL})
    }
}

export const clearComments =()=> (dispatch: any)=>{
    dispatch({type:RESET_COMMENTS})
}