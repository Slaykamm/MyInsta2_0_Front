import { LEFT_SIDEBAR_SHOW ,LEFT_SIDEBAR_HIDE } from "../constants/constants";
import { UNVERIFYED_USER_ADD, VERIFYED_USER_ADD } from "../constants/constants";

import { SET_THUNK_REQUEST_REGISTERED_USERS } from "../constants/constants";
import { VIDEO_PREVIEWS_THUNK } from "../constants/constants";
import { USERS_DICTIONARY } from "../constants/constants"
import { GET_VIDEO } from "../constants/constants";
import { ERROR_API_PROCESSING } from "../constants/constants";
import { VIDEO_OWNER_USER } from "../constants/constants";



export const setLeftSideBarShowAction = (payload) => ({type: LEFT_SIDEBAR_SHOW, payload})
export const setLeftSideBarHideAction = (payload) => ({type: LEFT_SIDEBAR_HIDE, payload})


export const setUnverifyedUser = (payload) => ({type: UNVERIFYED_USER_ADD, payload})
export const setVerifyedUser  = (payload) => ({type: VERIFYED_USER_ADD, payload})


export const setThunkResteredUsersData = (payload) => ({type: SET_THUNK_REQUEST_REGISTERED_USERS, payload}) 
export const getPreviewAPI = (payload) =>({type: VIDEO_PREVIEWS_THUNK, payload})
export const getUserDictionary = (payload) =>({type: USERS_DICTIONARY, payload})
export const getVideoAction = (payload) => ({type: GET_VIDEO, payload})
export const isErrorProccessingAPI = (payload) => ({type: ERROR_API_PROCESSING, payload})
// export const getVideoOwnerUserAction = (payload) => {
//     console.log("aaaa")
//     return ({type: VIDEO_OWNER_USER, payload})
// }

export const getVideoOwnerUserAction = (payload) => ({type: VIDEO_OWNER_USER, payload})