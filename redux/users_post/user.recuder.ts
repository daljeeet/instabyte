import { postDataType } from '@/Components/CreateModal';
import {USER_POST_GET_LOADING,USER_POST_GET_SUCCESS,USER_POST_GET_ERROR}from './user.action.type'

export type allPostType ={
    userPost_loading:boolean,
    userPost_error:boolean,
    userPosts:postDataType[]
}

const initialState:allPostType = {
    userPost_loading:false,
    userPost_error:false,
    userPosts:[]
}

export const userPostreducer = (state=initialState,actions: { type: string; payload?:any; })=>{
    const {type, payload} = actions
    switch (type) {
        case USER_POST_GET_LOADING:{
            return{...state, userPost_loading:true}
        }
        case USER_POST_GET_SUCCESS:{
                return{...state, userPosts:payload,userPost_loading:false}

        }
        case USER_POST_GET_ERROR:{
            return{ ...state,uesrPosts_loading:false,userPost_error:true  }
        }
        default:
            return{...state}
    }
    
}