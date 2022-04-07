import axios from "axios";
import { changeUserPasswordAction } from "../redux/actions/changeUserPasswordAction";

export const changeUserPasswordAPI  = (userToken, formData) => {
    return function(dispatch) {

        const params = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken                    
            }
        }

        const data = {
          "old_password":formData.lkeOldPassword,
          "new_password":formData.lkeNewpassword
        }
        

        const changePassword = axios.patch(`http://127.0.0.1:8000/api/change-password/`, data, params);
        changePassword.then(response => {

            //диспатчим ActionCreator

            dispatch(changeUserPasswordAction(response)) 

        })
    }
}


