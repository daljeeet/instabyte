import { commentType } from '@/helpers/dataTypes';
import {
    GET_COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    DELETE_COMMENTS_LOADING,
    DELETE_COMMENTS_SUCCESS,
    DELETE_COMMENTS_FAIL,
    ADD_COMMENTS_LOADING,
    ADD_COMMENTS_SUCCESS,
    ADD_COMMENTS_FAIL,
    RESET_COMMENTS
} from './comments.action.types'


export interface commentSchemaType {
    loading: boolean,
    error: boolean,
    comments:commentType[]
}

const initialComment = {
    loading: false,
    error: false,
    comments:[{author:"",comment:"",time:"",parentId:""}]
}

export const commentsReducer = (state = initialComment, action: { type: string; payload?: any; }) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_COMMENTS_LOADING: {
            return { ...state, loading: true }
        }
        case ADD_COMMENTS_SUCCESS: {
            return { ...state, loading: false, error: false, comments: [payload,...state.comments] }
        }
        case ADD_COMMENTS_FAIL: {
            return { ...state, loading: false, error: true }
        }
        case GET_COMMENTS_LOADING: {
            return { ...state, loading: true }
        }
        case GET_COMMENTS_SUCCESS: {
            return { ...state, loading: false, error: false, comments: payload }
        }
        case GET_COMMENTS_FAIL: {
            return { ...state, loading: false, error: true }
        }
        case DELETE_COMMENTS_LOADING: {
            return { ...state,loading:true}
        }
        case DELETE_COMMENTS_SUCCESS: {
            return { ...state, loading:false, error:false, comments:payload }
        }
        case DELETE_COMMENTS_FAIL: {
            return { ...state, loading:false, error:true }
        }
        case RESET_COMMENTS: {
            return { ...state, loading: false, error: false, comments: [] }
        }
        default: {
            return { ...state }
        }
    }
}