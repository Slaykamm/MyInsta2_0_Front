import { COMMENTS_VIDEO_THUNK } from "../../constants/constants";
import { pick } from 'lodash'


export const getCommentsAction = (payload) => {
    const newPayload = [pick(payload, ['data', 'status'])]
    return(
        ({type: COMMENTS_VIDEO_THUNK, newPayload})

    )

}
