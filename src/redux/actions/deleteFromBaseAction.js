import { DELETE_FROM_BASE } from "../../constants/constants";




export const deleteFromBaseAction = (payl) => {
    const payload = payl.status
    return ({type: DELETE_FROM_BASE, payload})
}