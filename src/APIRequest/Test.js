import axios from "axios";
import {AxiosHeaders, BaseURL} from "../utility/config.js";
import {ErrorToast, getServerError, SuccessToast} from "../utility/FormHelper.js";

const get = '/category1/get';
const create = '/category1/create';
const read = '/category1/read';
const update = '/category1/update';
const remove = '/category1/delete';

export const ListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        let URL = `${BaseURL}${get}/${pageNo}/${perPage}/${searchKeyword}`;
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
export const CreateRequest = async (PostBody) => {
    try {
        let URL = `${BaseURL}${create}`
        let result = await axios.post(URL, PostBody, AxiosHeaders)
        if (result.status === 200 && result.data===1) {
            SuccessToast("Request Successful");
            return true;
        } else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    } catch (e) {
        getServerError(e)
    }

}
export const FillFormRequest = async (id) => {
    try {
        let URL = `${BaseURL}${read}/${id}`
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
export const UpdateRequest = async (PostBody, ObjectID) => {
    try {
        let URL = `${BaseURL}${update}/${ObjectID}`
        let result = await axios.post(URL, PostBody, AxiosHeaders)
        if (result.status === 200 && result.data===1) {
            SuccessToast("Request Successful");
            return true;
        } else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    } catch (e) {
        getServerError(e)
    }
}
export const DeleteRequest = async (ObjectID) => {
    try {
        let URL = `${BaseURL}${remove}/${ObjectID}`
        let result = await axios.get(URL, AxiosHeaders)
        if (result.status === 200 && result.data===1) {
            SuccessToast("Request Successful");
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



