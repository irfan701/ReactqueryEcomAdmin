import axios from "axios";
import {ErrorToast, SuccessToast} from "../utility/FormHelper";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../utility/SessionHelper";
import {BaseURL} from "../utility/config";

const login = '/login';
const register = '/register';
// const logout = '/logout';
// const resetPasswordLinkEmail = '/reset/password/link/email';
// const resetPassword = '/reset/password';
// const emailVerifyLink = '/email/verify/link';
// const emailVerify = '/email/verify';

// const AxiosHeaders = {
//     headers: {
//         Accept:'application/json',
//         Authorization:getToken(),
//     }
// }
// const AxiosHeader={headers:{"token":getToken()}}

export async function LoginRequest(email,password){
   try {

       let URL = `${BaseURL}${login}`;
       let PostBody={"email":email,"password":password}
       let res =await axios.post(URL,PostBody);
       setToken(res.data.access_token);
       setUserDetails(res.data.user);
       SuccessToast("Login Success")
       return true;
   }
   catch (e) {
       ErrorToast("Invalid Email or Password")
       return  false;
   }
}




export async function RegistrationRequest(email,firstName,lastName,mobile,password,photo){
    try {

        let URL = `${BaseURL}${register}`;
        let PostBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
        let res=await axios.post(URL,PostBody)
        if(res.status===200){
            if(res.data['status']==="fail"){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }
    catch (e) {

        ErrorToast("Something Went Wrong")
        return false;
    }
}

export async function GetProfileDetails(){
    try {

        let URL=BaseURL+"/ProfileDetails";
        let res=await axios.get(URL,AxiosHeader)

        if(res.status===200){
            // store.dispatch(SetProfile(res.data['data'][0]))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){

        ErrorToast("Something Went Wrong")
    }
}

export async function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo){
    try {

        let URL=BaseURL+"/ProfileUpdate";
        let PostBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password,photo:photo}
        let UserDetails={email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo};
        let res=await axios.post(URL,PostBody,AxiosHeader);

        if(res.status===200){
            SuccessToast("Profile Update Success")
            setUserDetails(UserDetails)
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }
    catch (e){
        ErrorToast("Something Went Wrong")
        return false;
    }

}

export async function RecoverVerifyEmailRequest(email){
    try {
        let URL=BaseURL+"/RecoverVerifyEmail/"+email;
        let res=await axios.get(URL);
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast("No user found");
                return false;
            }
            else{
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        return false;
    }
}

export async function RecoverVerifyOTPRequest(email,OTP){

    try {

        let URL=BaseURL+"/RecoverVerifyOTP/"+email+"/"+OTP;
        let res=await axios.get(URL);

        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast("Code Verification Fail");
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        return false;
    }
}

export async function RecoverResetPassRequest(email,OTP,password){
    try {

        let URL=BaseURL+"/RecoverResetPass";
        let PostBody={email:email,OTP:OTP,password:password};
        let res=await axios.post(URL,PostBody);
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        return false;
    }
}