import { userdataType } from './auth.actions'
import {
    AUTH_LOADING,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_RESET,
    AUTH_CHECK
} from './auth.actions.types'
export type authDataType = {
    login_loading:boolean,
    login_error:boolean,
    user:userdataType|null
}

const iniitailState:authDataType = {
    login_loading: false,
    login_error: false,
    user: null,
}

export const authUserReducer = (state = iniitailState, actions: { type: any; payload: any }) => {
    let { type, payload } = actions
    switch (type) {
        case AUTH_LOADING: {
            return { ...state, login_loading: true }
        }
        case AUTH_ERROR: {
            return { ...state, login_loading: false, error: true, }
        }
        case AUTH_SUCCESS: {
            return { ...state, login_loading: false, error: false, user:payload}
        }
        case AUTH_CHECK: {
            if(payload.id===undefined){
                payload = null;
            }
            return { ...state, login_loading: false, error: false, user:payload}
        }
        case AUTH_RESET: {
            return { ...state}
        }
        default: {
            return { ...state }
        }
    }
}