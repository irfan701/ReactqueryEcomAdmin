import {useState} from "react";
import {ErrorToast} from "../../utility/FormHelper.js";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {CreateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {useQueryClient} from "@tanstack/react-query";
import {createCategory1} from "../../APIRequest/RouteName.js";
const BrandCreateUpdate = () => {
    const [FormObj, setFormObj] = useState({cat1_name: '',cat1_image:''})
    const InputOnChange = (key, value) => setFormObj(prevObj => ({...prevObj, [key]: value}))

    const queryClient = useQueryClient()
    const {mutate} = UseMutation(
        (formData) => CreateRequest(createCategory1,formData),
        async() => {
            return await queryClient.invalidateQueries({queryKey:["categoriesOne"]})
        },
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        // if (isEmpty(FormObj.cat1_name)) {
        //     ErrorToast("Category-1 Name Required !")
        // } else {
            await mutate(FormObj)
       // }
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
                                        <h5>Add Category-1</h5>
                                        <hr className="bg-light"/>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Category-1 Name</label>
                                            <input
                                                onChange={(e) => InputOnChange('cat1_name', e.target.value)}
                                                className="form-control form-control-sm"
                                                type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="form-label">Category-1 Image</label>
                                            <input
                                                onChange={(e) => InputOnChange('cat1_image', e.target.value)}
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