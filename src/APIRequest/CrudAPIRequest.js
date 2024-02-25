import axios from "axios";
import {AxiosHeaders, BaseURL} from "../utility/config.js";
import {ErrorToast, getServerError, SuccessToast} from "../utility/FormHelper.js";

export const ListRequest = async (RouteName, pageNo, perPage, searchKeyword) => {
    try {
        let URL = `${BaseURL}${RouteName}/${pageNo}/${perPage}/${searchKeyword}`;
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
export const CreateRequest = async (RouteName,PostBody) => {
    try {
        let URL = `${BaseURL}${RouteName}`
        let result = await axios.post(URL, PostBody, AxiosHeaders)
        if (result.status === 200 && result.data === 1) {
            SuccessToast("Request Created Successful");
            return true;
        } else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    } catch (e) {
        getServerError(e)
    }

}
export const FillFormRequest = async (RouteName,Id) => {
    try {
        let URL = `${BaseURL}${RouteName}/${Id}`
        const result = await axios.get(URL, AxiosHeaders)
        if (result.status === 200) {
            return result.data
        } else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    } catch (e) {
        ErrorToast("Something Went Wrong")
        return false
    }
}
export const UpdateRequest = async (RouteName,PostBody, ObjectID) => {
    try {
        let URL = `${BaseURL}${RouteName}/${ObjectID}`
        let result = await axios.post(URL, PostBody, AxiosHeaders)
        if (result.status === 200 && result.data === 1) {
            SuccessToast("Request Updated Successful");
            return true;
        } else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    } catch (e) {
        getServerError(e)
    }
}
export const DeleteRequest = async (RouteName,ObjectID) => {
    try {
        let URL = `${BaseURL}${RouteName}/${ObjectID}`
        let result = await axios.get(URL, AxiosHeaders)
        if (result.status === 200 && result.data === 1) {
            SuccessToast("Request Deleted Successful");
            return true
        } else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    } catch (e) {
        ErrorToast("Something Went Wrong")
        return false
    }
}