import axios from "axios";
import {AxiosHeaders, BaseURL} from "../utility/config.js";
import {ErrorToast} from "../utility/FormHelper.js";

const get = '/cat1/get';
//const create = '/cat2/get';
// <?php displayOptions($fruits,$selectedFruits); ?>

export const DropDownListRequest = async () => {
    try {
        let URL = `${BaseURL}${get}`;
        let result = await axios.get(URL)
        if (result.status === 200) {
            if (result.data) {
                return result.data
            } else {
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    } catch (e) {
        ErrorToast(e.message)
    }
}
// export const FillFormRequest = async (id) => {
//     try {
//         let URL = `${BaseURL}${read}/${id}`
//         const result = await axios.get(URL, AxiosHeaders)
//         if (result.status === 200) {
//             return result.data
//         } else {
//             ErrorToast("Request Fail ! Try Again")
//             return false;
//         }
//     } catch (e) {
//         ErrorToast("Something Went Wrong")
//         return false
//     }
// }




