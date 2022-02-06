import { createStore, combineReducers, applyMiddleware } from "redux";
import sideBarShow from "./sideBarReducer";
import isActualUser from "./isActualUser"
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    sideBarShow,
    isActualUser,
    form: formReducer
})

export const store=createStore(rootReducer)
