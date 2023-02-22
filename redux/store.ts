import {
    legacy_createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux'
import thunk from "redux-thunk"
import { authUserReducer } from './auth/auth.reducer';
import { imgPostReducer} from './ImageUrl/imgreducer'; 
import { getAllPostsReducer} from './postdata/post.reducer';
import { userPostreducer } from './users_post/user.recuder';
import { userDataReducer } from './user_data/user_data_reducer';
const rootReducer = combineReducers({
    imgUrl:imgPostReducer,
    allPosts:getAllPostsReducer,
    user:authUserReducer,
    userPost:userPostreducer,
    userDetails:userDataReducer
})

const composeEnhancer = compose;

export const store = legacy_createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)))

export type rootReducertype = ReturnType<typeof rootReducer>
