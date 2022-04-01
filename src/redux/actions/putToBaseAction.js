import { PUT_TO_BASE } from "../../constants/constants";




export const putToBaseAction = (payl) => {
    const payload = payl.status
    return ({type: PUT_TO_BASE, payload})
}