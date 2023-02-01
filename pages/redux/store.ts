import {
    legacy_createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux'

import thunk from "redux-thunk"
import { authUserReducer } from './auth/auth.reducer';
import { imgPostReducer } from './ImageUrl/imgreducer'; 
import { getAllPostsReducer } from './postdata/post.reducer';
const rootReducer = combineReducers({
    imgUrl:imgPostReducer,
    allPosts:getAllPostsReducer,
    user:authUserReducer
})

const composeEnhancer = compose;

export const store = legacy_createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)))