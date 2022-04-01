import { POST_COMMENTS_WITH_QUOTATION } from "../../constants/constants";
import { pick, get } from "lodash";


export const postCommentsWithQuotationAction = (payl) => {

    const payload = {
        'status': payl.status,
        'id': get(payl, ['data', 'id'])
    }

    return(
        ({type: POST_COMMENTS_WITH_QUOTATION, payload})

    )

}
