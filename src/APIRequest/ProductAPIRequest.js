import axios from "axios";
import {ErrorToast, SuccessToast} from "../utility/FormHelper";
import {getToken} from "../utility/SessionHelper";
import {BaseURL} from "../utility/config";

const AxiosHeader={headers:{"token":getToken()}}



export async function CreateProductRequest(PostBody,ObjectID) {
    try {

        let URL = BaseURL+"/CreateProducts"
        if(ObjectID!==0){
            URL = BaseURL+"/UpdateProducts/"+ObjectID;
        }
        const result = await axios.post(URL,PostBody,AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");

            return  true;
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")

        return  false
    }
}


export async function FillProductFormRequest(ObjectID) {
    try {

        let URL = BaseURL+"/ProductsDetailsByID/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            //let FormValue=result.data['data'][0];
            // store.dispatch(OnChangeProductInput({Name:"CategoryID",Value:FormValue['CategoryID']}));
            // store.dispatch(OnChangeProductInput({Name:"BrandID",Value:FormValue['BrandID']}));
            // store.dispatch(OnChangeProductInput({Name:"Name",Value:FormValue['Name']}));
            // store.dispatch(OnChangeProductInput({Name:"Unit",Value:FormValue['Unit']}));
            // store.dispatch(OnChangeProductInput({Name:"Details",Value:FormValue['Details']}));
            return  true;
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        ErrorToast("Something Went Wrong")

        return  false
    }
}

export async function DeleteProductRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteProduct/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast(result.data['data'])
            return  false;
        }
        else if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            return  true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}