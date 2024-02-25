import ScreenLoader from "../Loading/ScreenLoader.jsx";
import {useEffect, useState} from "react";
import {ErrorToast, isEmpty} from "../../utility/FormHelper.js";
import {UseMutation, UseQuery} from "../../utility/ReactQueryHook.js";
import {FillFormRequest, UpdateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {readBrand, updateBrand} from "../../APIRequest/RouteName.js";

export default function BrandUpdate() {
    const [FormObj, setFormObj] = useState({name: '', image: ''})
    const navigate = useNavigate()
    const InputOnChange = (key, value) => setFormObj(prevObj => ({...prevObj, [key]: value}))
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    const {isLoading, error, data} = UseQuery(['singleBrand', id], FillFormRequest(readBrand,id))
    useEffect(() => {
        if (data) {
            setFormObj(prevObj => ({
                ...prevObj,
                name: data.name,
                image: data.image,

            }))
        }
    }, [data]);

    const queryClient = useQueryClient()

    const {mutate} = UseMutation(
        (formData) => UpdateRequest(updateBrand,formData, id),
        async (data) =>
            (await Promise.all([
                queryClient.setQueryData(['singleBrand', id], data),
                queryClient.invalidateQueries({queryKey: ["brands"]}),
                queryClient.invalidateQueries({queryKey: ["singleBrand"]}),
            ])),
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        if (isEmpty(FormObj.name)) {
            ErrorToast("Brand Name Required !")
        }  else {
          await mutate(FormObj)
            //navigate("/BrandListPage")
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
                                                <label className="form-label">Customer Name</label>
                                                <input
                                                    onChange={(e) => InputOnChange('name', e.target.value)}
                                                    defaultValue={data.name}
                                                    className="form-control form-control-sm"
                                                    type="text"/>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Mobile No</label>
                                                <input
                                                    onChange={(e) => InputOnChange('image', e.target.value)}
                                                    defaultValue={data.image}
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

