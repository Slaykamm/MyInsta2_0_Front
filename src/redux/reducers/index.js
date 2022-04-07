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
import postUserRoom from "./postUserRoom";
import postUserPrivate from "./postUserPrivate";
import putToBaseReducer from "./putToBaseReducer";
import deleteFromBaseReducer from "./deleteFromBaseReducer";
import postToBaseReducer from "./postToBaseReducer";
import getCommentsWithQuotationsReducer from "./getCommentsWithQuotationsReducer";
import postCommentsWithQuotationsReducer from "./postCommentsWithQuotationsReducer";
import postToBaseMediaReducer from "./postToBaseMediaReducer";
import createNewUserReducer from "./createNewUserReducer";
import changeUserPasswordReducer from "./changeUserPasswordReducer";
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
    postUserRoom,
    postUserPrivate,
    putToBaseReducer,
    deleteFromBaseReducer,
    postToBaseReducer,
    getCommentsWithQuotationsReducer,
    postCommentsWithQuotationsReducer,
    postToBaseMediaReducer,
    createNewUserReducer,
    changeUserPasswordReducer,
    IsErrorAPI,  //так и не нашел применения пока. потом можно удалить TODO
    UserToken,
    
    form: formReducer
})

export const store=createStore(rootReducer, applyMiddleware(thunk))
