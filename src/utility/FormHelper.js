import toast from "react-hot-toast";

let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
    isEmpty(value) {
        return value.length === 0;
    }
    isMobile(value){
        return MobileRegx.test(value);
    }
    isEmail(value) {
        return !EmailRegx.test(value);
    }
    ErrorToast(msg) {
        toast.error(msg);
    }
    SuccessToast(msg) {
      toast.success(msg)
    }
     getServerError (error)  {
        if (error.response.data && error.response.data.errors) {
            let errors = error.response.data.errors
            Object.keys(errors).map((error) => ((ErrorToast(errors[error][0]))))
        }
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

export const {isEmpty, isMobile, isEmail, ErrorToast, getBase64, SuccessToast,getServerError} = new FormHelper();