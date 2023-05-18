import { resPostDataType, userdataType } from '@/helpers/dataTypes'
import {GET_USER_POST_LOADING,
    GET_USER_POST_SUCCESS,
    GET_USER_POST_ERROR,
    GET_UESR_DATA_LOADING,
    GET_UESR_DATA_ERROR,
    GET_UESR_DATA_SUCCESS}from './user.action.type'

export type allPostType ={
    get_user_posts_loading:boolean,
    get_user_posts_error:boolean,
    get_user_data_loading:boolean,
    get_user_data_error:boolean,
    userPosts:resPostDataType[]
    userData:null|userdataType
}

const initialState:allPostType = {
    get_user_posts_loading:false,
    get_user_posts_error:false,
    get_user_data_loading:false,
    get_user_data_error:false,
    userPosts:[],
    userData:null
}

export const userPostreducer = (state=initialState,actions: { type: string; payload?:any; })=>{
    const {type, payload} = actions
    switch (type) {
        case GET_USER_POST_LOADING:{
            return{...state, get_user_data_loading:true,get_user_data_error:false }
        }
        case GET_USER_POST_SUCCESS:{
            return{...state, get_user_data_loading:false,get_user_data_error:false,userPosts:payload}
        }
        case GET_USER_POST_ERROR:{
            return{...state, get_user_data_loading:false,get_user_data_error:true}
        }
        case GET_UESR_DATA_LOADING:{
            return{...state, get_user_data_loading:true,get_user_data_error:false}
        }
        case GET_UESR_DATA_ERROR:{
            return{...state, get_user_data_loading:false,get_user_data_error:true}
        }
        case GET_UESR_DATA_SUCCESS:{
            return{...state,get_user_data_loading:false,get_user_data_error:false,userData:payload}
        }
        default:
            return state
    }
    
}