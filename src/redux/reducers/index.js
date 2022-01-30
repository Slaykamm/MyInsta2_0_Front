import { createStore, combineReducers, applyMiddleware } from "redux";
import sideBarShow from "./sideBarReducer";

const rootReducer = combineReducers({
    sideBarShow
})

export const store=createStore(rootReducer)
