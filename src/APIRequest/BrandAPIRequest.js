import axios from "axios";
import {BaseURL} from "../helper/config.js";
import {ErrorToast, getServerError, SuccessToast} from "../helper/FormHelper.js";

//import {getToken} from "../helper/SessionHelper";
//const AxiosHeader={headers:{"token":getToken()}}
// const result = await axios.get(URL,AxiosHeader)

const get = '/brand/get';
const create = '/brand/create';
const read = '/brand/read';
const update = '/brand/update';
const remove = '/brand/delete';

export const ListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        let URL = `${BaseURL}${get}/${pageNo}/${perPage}/${searchKeyword}`;
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
export const CreateRequest = async (PostBody) => {
    try {
        let URL = `${BaseURL}${create}`
        let result = await axios.post(URL, PostBody)
        if (result.status === 200) {
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
        const result = await axios.get(URL)
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
        let result = await axios.post(URL, PostBody)
        if (result.status === 200) {
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
        let result = await axios.get(URL)
        if (result.status === 200) {
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



