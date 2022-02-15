import { createStore, combineReducers, applyMiddleware } from "redux";
import sideBarShow from './sideBarReducer'
import isActualUser from './isActualUser'
import asyncUsersRequest from './asyncUsersRequest'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    sideBarShow,
    isActualUser,
    asyncUsersRequest,
    form: formReducer
})

export const store=createStore(rootReducer, applyMiddleware(thunk))
