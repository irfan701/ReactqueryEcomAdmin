import {useState} from "react";
import {ErrorToast, isEmail, isEmpty} from "../../utility/FormHelper.js";
import {useNavigate} from "react-router-dom";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {CreateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {useQueryClient} from "@tanstack/react-query";
import {createBrand} from "../../APIRequest/RouteName.js";
const BrandCreate = () => {
    const [FormObj, setFormObj] = useState({name: '', image: ''})
    const navigate = useNavigate();
    const InputOnChange = (key, value) => setFormObj(prevObj => ({...prevObj, [key]: value}))
    const queryClient = useQueryClient()
    const {mutate,isError} = UseMutation(
        (formData) => CreateRequest(createBrand,formData),
        async() => {
            return await queryClient.invalidateQueries({queryKey:["brands"]})
        },
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        if (isEmpty(FormObj.name)) {
            ErrorToast("Brand Name Required !")
        } else {
            await mutate(FormObj)
           // navigate("/BrandListPage")
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
                                        <h5>Save Customer</h5>
                                        <hr className="bg-light"/>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Brand Name</label>
                                            <input
                                                onChange={(e) => InputOnChange('name', e.target.value)}
                                                className="form-control form-control-sm"
                                                type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="form-label">Image </label>
                                            <input
                                                onChange={(e) => InputOnChange('image', e.target.value)}
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
export default BrandCreate;