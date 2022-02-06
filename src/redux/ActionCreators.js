import { LEFT_SIDEBAR_SHOW ,LEFT_SIDEBAR_HIDE } from "../constants/constants";

import { UNVERIFYED_USER_ADD, VERIFYED_USER_ADD } from "../constants/constants";


export const setLeftSideBarShowAction = (payload) => ({type: LEFT_SIDEBAR_SHOW, payload})
export const setLeftSideBarHideAction = (payload) => ({type: LEFT_SIDEBAR_HIDE, payload})


export const setUnverifyedUser = (payload) => ({type: UNVERIFYED_USER_ADD, payload})
export const setVerifyedUser  = (payload) => ({type: VERIFYED_USER_ADD, payload})