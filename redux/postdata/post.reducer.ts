
import { postDataType, resPostDataType } from '@/helpers/dataTypes';
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
    RESET_POSTS,
    POST_SUCCESS,
    INC_PAGE} from './actions.types'

export type allPostType ={
    get_post_loading:boolean,
    get_post_error:boolean,
    add_post_error:boolean,
    add_post_loading:boolean,
    update_post_loading:boolean,
    delete_post_loading:boolean,
    delete_post_error:boolean,
    delete_post_success:false,
    postData:resPostDataType[],
    page:number
}

const initialState:allPostType = {
    get_post_loading:false,
    get_post_error:false,
    add_post_error:false,
    add_post_loading:false,
    update_post_loading:false,
    delete_post_loading:false,
    delete_post_error:false,
    delete_post_success:false,
    postData:[],
    page:1
}
 
export const getAllPostsReducer = (state=initialState,actions: { type: string; payload?:any; })=>{
    const {type,payload}= actions;
    switch (type) {
        case GET_LOADING:{
            return {...state, get_post_loading:true,get_post_error:false}
        }
        case GET_ERROR:{
            return {...state, get_post_loading:false,get_post_error:true}
        }
        case GET_SUCCESS:{
            let newArr = [...new Set([...state.postData, ...payload])]
            return {...state,postData:newArr, get_post_loading:false,get_post_error:false,}
        }
        case POST_SUCCESS:{
            return {...state,postData:[payload,...state.postData], add_post_error:false,add_post_loading:false,}
        }
        case POST_LOADING:{
            return {...state,add_post_error:false,add_post_loading:true}
        }
        case POST_ERROR:{
            return {...state,add_post_error:true,add_post_loading:false}
        }
        case DEL_SUCCESS:{
        let newData = state.postData.filter((el)=>{
            if(el._id!=payload){return el}
        })
            return {...state,postData:newData,delete_post_loading:false,delete_post_error:false}
        }
        case DEL_ERROR:{
            return {...state,delete_post_loading:false,delete_post_error:true}
        }
        case DEL_LOADING:{
            return {...state,delete_post_loading:true,delete_post_error:false}
        }
        case RESET_POSTS:{
            return initialState
        }
        case INC_PAGE:{
            return {...state,page:state.page+1}
        }
        default:{
            return state
        }
    }
}