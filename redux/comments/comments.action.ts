
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
    UPDATE_COMMENT_LOADING,
    UPDATE_COMMENT_ERROR,
    UPDATE_COMMENT_SUCCESS,
    ADD_COMMENTS_FAIL, RESET_COMMENTS
} from './comments.action.types'
import { addCommentApi, deleteCommentApi, getCommentsApi,updatecommentApi } from './comments.api';
import { Dispatch } from 'redux';
import { initialCommentType } from '@/Components/Post/Comments/NewComment';

export const addComments = (comment: initialCommentType) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_COMMENTS_LOADING })
    try {
        let res = await addCommentApi(comment)
        dispatch({ type: ADD_COMMENTS_SUCCESS, payload: res.data.comment })
    } catch (err) {
        dispatch({ type: ADD_COMMENTS_FAIL })
    }
}

export const getComments = (id: string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_COMMENTS_LOADING })
    try {
        let res = await getCommentsApi(id);
        dispatch({ type: GET_COMMENTS_SUCCESS, payload: res })
    } catch (err) {
        dispatch({ type: GET_COMMENTS_FAIL })
    }
}

export const updatecomment = (data: any, id: number | string) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_COMMENT_LOADING })
    try {
        let res = await updatecommentApi(data,id)
        dispatch({type:UPDATE_COMMENT_SUCCESS,payload:res.data})
    } catch (err) {
        dispatch({ type: UPDATE_COMMENT_ERROR })

    }
}

export const deleteComment = (id:number|string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_COMMENTS_LOADING })
    try {
        await deleteCommentApi(id)
        dispatch({ type: DELETE_COMMENTS_SUCCESS, payload:id})

    } catch (err) {
        dispatch({ type: DELETE_COMMENTS_FAIL })
    }
}

export const clearComments = () => (dispatch: any) => {
    dispatch({ type: RESET_COMMENTS })
}