import { commentType } from '@/helpers/dataTypes';
import {
    ADD_COMMENTS_LOADING,
    ADD_COMMENTS_SUCCESS,
    ADD_COMMENTS_FAIL,

    GET_COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,

    UPDATE_COMMENT_LOADING,
    UPDATE_COMMENT_ERROR,
    UPDATE_COMMENT_SUCCESS,

    DELETE_COMMENTS_LOADING,
    DELETE_COMMENTS_SUCCESS,
    DELETE_COMMENTS_FAIL,

    RESET_COMMENTS,
} from './comments.action.types'


export interface commentSchemaType {
    create_loading: boolean,
    create_error: boolean,

    get_loading: boolean,
    get_error: boolean,

    update_loading: boolean,
    update_error: boolean,
    update_success: boolean,

    delete_loading: boolean,
    delete_error: boolean,
    delete_success:boolean,
    comments: commentType[]
}

const initialComment: commentSchemaType = {
    create_loading: false, create_error: false,

    get_loading: false, get_error: false,

    update_loading: false, update_error: false,update_success: false,

    delete_loading: false, delete_error: false,delete_success:false,
    comments: []
}

export const commentsReducer = (state = initialComment, action: { type: string; payload?: any; }) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_COMMENTS_LOADING: {
            return { ...state, create_loading: true, create_error: false }
        }
        case ADD_COMMENTS_SUCCESS: {
            return { ...state, create_loading: true, create_error: false, comments: [payload, ...state.comments] }
        }
        case ADD_COMMENTS_FAIL: {
            return { ...state, create_loading: true, create_error: true }
        }
        case GET_COMMENTS_LOADING: {
            return { ...state, get_loading: false, get_error: false }
        }
        case GET_COMMENTS_SUCCESS: {
            return { ...state, get_loading: false, get_error: false, comments: payload }
        }
        case GET_COMMENTS_FAIL: {
            return { ...state, get_loading: false, get_error: true }
        }
        case DELETE_COMMENTS_LOADING: {
            return { ...state, delete_loading: true, delete_error: false,delete_success:false, }
        }
        case DELETE_COMMENTS_SUCCESS: {
            const updatedComments = state.comments.filter((el)=>{
                if(el._id===payload){
                    return false
                }else{
                    return true
                }
            })
            return { ...state, delete_loading: false, delete_error: false,delete_success:true, comments: updatedComments }
        }
        case DELETE_COMMENTS_FAIL: {
            return { ...state, delete_loading: false, delete_error: true,delete_success:false, }
        }
        case RESET_COMMENTS: {
            return { ...state, loading: false, error: false, comments: [] }
        }
        case UPDATE_COMMENT_LOADING: { 
            return { ...state, update_loading: true, update_error: false,update_success: false, } 
        }
        case UPDATE_COMMENT_ERROR: { 
            return { ...state, update_loading: false, update_error: true,update_success: false, } 
        }
        case UPDATE_COMMENT_SUCCESS: {
            let updatedComments = state.comments.map((el) => {
                if (el._id == payload._id) {
                    return payload
                } else {
                    return el
                }
            })
            return { ...state, comments: updatedComments, update_loading: false, update_error: false,update_success: true, }
        }
        default: {
            return { ...state }
        }
    }
}