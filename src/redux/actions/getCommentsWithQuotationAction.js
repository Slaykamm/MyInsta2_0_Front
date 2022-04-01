import { GET_COMMENTS_WITH_QUOTATION } from "../../constants/constants";


export const getCommentsWithQuotationAction = (payload) => {
    return(
        ({type: GET_COMMENTS_WITH_QUOTATION, payload})

    )

}
