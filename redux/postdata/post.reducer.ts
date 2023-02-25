import { postDataType } from '@/Components/CreateModal'
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
    DEL_ERROR,
    POST_SUCCESS} from './actions.types'

export type allPostType ={
    loading_post:boolean,
    error_post:boolean,
    del_loading:boolean,
    del_error:boolean,
    del_success:boolean,
    patch_loading:boolean;
    patch_error:boolean;
    postData:postDataType[]
}

const initialState:allPostType = {
    loading_post:false,
    del_success:false,
    error_post:false,
    del_loading:false,
    del_error:false,
    patch_loading:false,
    patch_error:false,
    postData:[]
}

export const getAllPostsReducer = (state=initialState,actions: { type: string; payload?:any; })=>{
    const {type,payload}= actions;
    switch (type) {
        case GET_LOADING:{
            return {...state, loading_post:true}
        }
        case GET_ERROR:{
            return {...state, error_post:true,loading_post:false}
        }
        case GET_SUCCESS:{
            return {...state,postData:[...state.postData, ...payload],loading_post:false}
        }
        case POST_SUCCESS:{
            return {...state,postData:[payload,...state.postData],loading_post:false}
        }
        case POST_LOADING:{
            return {...state,loading_post:true}
        }
        case POST_ERROR:{
            return {...state,loading_post:false,error_post:true}
        }
        case DEL_SUCCESS:{
        let newData = state.postData.filter((el)=>{
            if(el._id!=payload){return el}
        })
            return {...state,postData:newData,del_loading:false,del_error:false,del_success:true}
        }
        case DEL_ERROR:{
            return {...state,del_error:true,del_loading:false,del_success:false}
        }
        case DEL_LOADING:{
            return {...state,del_loading:true,del_error:false}
        }
        default:{
            return {...state}
        }
    }
}