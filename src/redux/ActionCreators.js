import { LEFT_SIDEBAR_SHOW ,LEFT_SIDEBAR_HIDE } from "../constants/constants";


export const setLeftSideBarShowAction = (payload) => ({type: LEFT_SIDEBAR_SHOW, payload})
export const setLeftSideBarHideAction = (payload) => ({type: LEFT_SIDEBAR_HIDE, payload})
