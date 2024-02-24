import {getToken} from "./SessionHelper.js";
import {ErrorToast} from "./FormHelper.js";

export const BaseURL="http://127.0.0.1:8000/api";
export const AxiosHeaders = {
    headers: {
        Accept:'application/json',
        Authorization:getToken(),
    }
}

export const RCS= "Request Created Successful"
export const RUS= "Request Updated Successful"
export const RDS= "Request Deleted Successful"
export const SWW= "Something Went Wrong"
export const NDF= "No Data Found"
export const RFT= "Request Fail ! Try Again"
