import ScreenLoader from "../Loading/ScreenLoader.jsx";
import {useEffect, useState} from "react";
import {ErrorToast, isEmpty} from "../../utility/FormHelper.js";
import {UseMutation, UseQuery} from "../../utility/ReactQueryHook.js";
import {FillFormRequest, UpdateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {readCategory1, updateCategory1} from "../../APIRequest/RouteName.js";

export default function CategoryOneUpdate() {
    const [FormObj, setFormObj] = useState({cat1_name: ''})
    const navigate = useNavigate()
    const InputOnChange = (key, value) => setFormObj(prevObj => ({...prevObj, [key]: value}))
    
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    const {isLoading, error, data} = UseQuery(['singleData', id], FillFormRequest(readCategory1,id))
    useEffect(() => {
        if (data) {
            setFormObj(prevObj => ({
                ...prevObj,
                cat1_name: data.cat1_name,
            }))
        }
    }, [data]);

    const queryClient = useQueryClient()

    const {mutate} = UseMutation(
        (formData) => UpdateRequest(updateCategory1,formData, id),
        async (data) =>
            (await Promise.all([
                queryClient.setQueryData(['singleData', id], data),
                queryClient.invalidateQueries({queryKey: ["categoriesOne"]}),
                queryClient.invalidateQueries({queryKey: ["singleData"]}),
            ])),
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        if (isEmpty(FormObj.cat1_name)) {
            ErrorToast("Category-1 Name Required !")
        } else {
          await mutate(FormObj)
           navigate("/CategoryOneListPage")
        }
    }

    if (isLoading) return <ScreenLoader/>
    if (error) return <h3>Error:{error.message}</h3>
    if (data) {
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
                                                <label className="form-label">Category-1 Name</label>
                                                <input
                                                    onChange={(e) => InputOnChange('cat1_name', e.target.value)}
                                                    defaultValue={data.cat1_name}
                                                    className="form-control form-control-sm"
                                                    type="text"/>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">photo</label>
                                                <input
                                                    onChange={(e) => InputOnChange('cat1_image', e.target.value)}
                                                    defaultValue={data.cat1_image}
                                                    className="form-control form-control-sm"
                                                    type="text"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <button type="submit" className="btn btn-sm my-3 btn-success">Update
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
    }
}

