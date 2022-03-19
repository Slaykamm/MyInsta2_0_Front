import { createStore, combineReducers, applyMiddleware } from "redux";
import sideBarShow from './sideBarReducer'
import isActualUser from './isActualUser'
import asyncUsersRequest from './asyncUsersRequest'
import getPreview from './getPreview'
import getComments from './getComments'
import usersDict from "./usersDict";
import getVideo from "./getVideo";
import IsErrorAPI from "./isErrorAPI";
import UserToken from "./userToken";
import verifyUser from "./verifyUser";
import videoOwnerUser from "./videoOwnerUser";
import getPrivateRooms from "./getPrivateRooms";
import privateRoomMessages from "./privateRoomMessages";
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    sideBarShow,
    isActualUser,
    asyncUsersRequest,
    getPreview,
    getComments,
    usersDict,
    getVideo,
    verifyUser,
    videoOwnerUser,
    getPrivateRooms,
    privateRoomMessages,
    IsErrorAPI,  //так и не нашел применения пока. потом можно удалить TODO
    UserToken,
    
    form: formReducer
})

export const store=createStore(rootReducer, applyMiddleware(thunk))
