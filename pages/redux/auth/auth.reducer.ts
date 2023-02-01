import {
    AUTH_LOADING,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_RESET,
    AUTH_CHECK
} from './auth.actions.types'


const iniitailState = {
    login_loading: false,
    login_error: false,
    user: null,
}

export const authUserReducer = (state = iniitailState, actions: { type: any; payload: any }) => {
    let { type, payload } = actions
    switch (type) {
        case AUTH_LOADING: {
            return { ...state, loading: true }
        }
        case AUTH_ERROR: {
            return { ...state, loading: false, error: true, }
        }
        case AUTH_SUCCESS: {
            return { ...state, loading: false, error: false, user:payload}
        }
        case AUTH_CHECK: {
            if(payload.id===undefined){
                payload = null;
            }
            return { ...state, loading: false, error: false, user:payload}
        }
        case AUTH_RESET: {
            return { ...state}
        }
        default: {
            return { ...state }
        }
    }
}