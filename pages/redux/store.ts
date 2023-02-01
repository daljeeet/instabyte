import {
    legacy_createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux'

import thunk from "redux-thunk"
import { imgPostReducer } from './ImageUrl/imgreducer'; 
import { getAllPostsReducer } from './postdata/post.reducer';
const rootReducer = combineReducers({
    imgUrl:imgPostReducer,
    allPosts:getAllPostsReducer
})

const composeEnhancer = compose;

export const store = legacy_createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)))