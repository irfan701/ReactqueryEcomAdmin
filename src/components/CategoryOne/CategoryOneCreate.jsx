import {useState} from "react";
import {ErrorToast, isEmpty} from "../../helper/FormHelper.js";
import {useNavigate} from "react-router-dom";
import {UseMutation} from "../../helper/ReactQueryHook.js";
import {CreateRequest} from "../../APIRequest/CategoryOneAPIRequest.js";
import {useQueryClient} from "@tanstack/react-query";
const BrandCreateUpdate = () => {
    const [FormObj, setFormObj] = useState({name: ''})
    const navigate = useNavigate();
    const InputOnChange = (key, value) => {
        setFormObj(prevObj => ({
            ...prevObj,
            [key]: value
        }))
    }
    const queryClient = useQueryClient()
    const {mutate} = UseMutation(
        (formData) => CreateRequest(formData),
        async() => {
            return await queryClient.invalidateQueries({queryKey:["dataList"]})
        },
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        if (isEmpty(FormObj.name)) {
            ErrorToast("Category-1 Name Required !")
        } else {
            await mutate(FormObj)
            //navigate("/CategoryOneListPage")
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={onSubmit}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <h5>Save Category</h5>
                                        <hr className="bg-light"/>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Category-1 Name</label>
                                            <input
                                                onChange={(e) => InputOnChange('name', e.target.value)}
                                                className="form-control form-control-sm"
                                                type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="form-label">photo</label>
                                            <input
                                                onChange={(e) => InputOnChange('phone', e.target.value)}
                                                className="form-control form-control-sm"
                                                type="text"/>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <button type="submit" className="btn btn-sm my-3 btn-success">Save
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default BrandCreateUpdate;