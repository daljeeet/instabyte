import { postDataType } from '@/Components/CreateModal'
import {GET_LOADING,
    GET_ERROR,
    GET_SUCCESS,
    PATCH_LOADING,
    PATCH_ERROR,
    PATCH_SUCCESS,
    POST_LOADING,
    POST_ERROR,
    POST_SUCCESS} from './actions.types'

export type allPostType ={
    loading_post:boolean,
    error_post:boolean,
    postData:postDataType[]
}

const initialState:allPostType = {
    loading_post:false,
    error_post:false,
    postData:[]
}

export const getAllPostsReducer = (state=initialState,actions: { type: string; payload?:any; })=>{
    const {type,payload}= actions;
    switch (type) {
        case GET_LOADING:{
            return {...state, loading_post:true}
        }
        case GET_ERROR:{
            return {...state, error_post:true}
        }
        case GET_SUCCESS:{
            return {...state, postData:payload}
        }
        default:{
            return {...state}
        }
    }
}