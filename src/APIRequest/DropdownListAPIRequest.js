import axios from "axios";
import {AxiosHeaders, BaseURL} from "../utility/config.js";
import {ErrorToast} from "../utility/FormHelper.js";

export const DropDownListRequest = async (RouteName) => {
    try {
        let URL = `${BaseURL}${RouteName}`;
        let result = await axios.get(URL, AxiosHeaders)
        if (result.status === 200) {
            if (result.data.length > 0) {
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

export const DependentDropDownListRequestById = async (RouteName, Id) => {
    try {
        let URL = `${BaseURL}${RouteName}/${Id}`;
        let result = await axios.get(URL, AxiosHeaders)
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





