import ScreenLoader from "../Loading/ScreenLoader.jsx";
import React, {useEffect, useState} from "react";
import {ErrorToast, isEmpty} from "../../utility/FormHelper.js";
import {UseMutation, UseQuery} from "../../utility/ReactQueryHook.js";
import {FillFormRequest, UpdateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {useNavigate} from "react-router-dom";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {DropDownListRequest} from "../../APIRequest/DropdownListAPIRequest.js";
import {readCategory2, updateCategory2} from "../../APIRequest/RouteName.js";


export default function CategoryTwoUpdate() {
    const [FormObj, setFormObj] = useState({cat1_id: '', cat2_name: ''})
    const navigate = useNavigate()
    const InputOnChange = (key, value) => setFormObj(prevObj => ({...prevObj, [key]: value}))

    const {data: category_one} =
        useQuery({
            queryKey: ["category_one"],
            queryFn: async () => DropDownListRequest(),
            placeholderData: keepPreviousData,
            //staleTime: 2000,
        })

    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    const {isLoading, error, data} = UseQuery(['singleData2', id], FillFormRequest(readCategory2,id))


    // useEffect(() => {
    //     if (data) {
    //         setFormObj(prevObj => ({
    //             ...prevObj,
    //             cat2_name: data.cat2_name,
    //             // cat1_id: category_one.id
    //         }))
    //     }
    // }, [data]);

    const queryClient = useQueryClient()

    const {mutate} = UseMutation(
        (formData) => UpdateRequest(updateCategory2,formData, id),
        async (data) =>
            (await Promise.all([
                queryClient.setQueryData(['singleData2', id], data),
                queryClient.invalidateQueries({queryKey: ["categoriesTwo"]}),
                queryClient.invalidateQueries({queryKey: ["singleData2"]}),
            ])),
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        // if (isEmpty(FormObj.cat2_name)) {
        //     ErrorToast("Category-2 Name Required !")
        // } else {
            await mutate(FormObj)
            navigate("/CategoryTwoListPage")
        //}
    }

    const getCategories = () => {
        return category_one?.map((item, i) => {
                const catArr = Object.values(item)
                const isSelected=(catArr.includes(data.cat1_id)) ?"selected":""
                return <option key={i.toString()} value={item.id}  selected={isSelected}>{item.cat1_name}</option>
            }
        )
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
                                                <label className="form-label">Category-1 List</label>
                                                <select onChange={(e) => InputOnChange('cat1_id', e.target.value)} className="form-control form-control-sm">
                                                    <option value="">Select Category</option>
                                                    {getCategories()}
                                                </select>
                                            </div>

                                            <div className="col-4 p-2">
                                                <label className="form-label">Category-2 Name</label>
                                                <input
                                                    onChange={(e) => InputOnChange('cat2_name', e.target.value)}
                                                    className="form-control form-control-sm"
                                                    defaultValue={data.cat2_name}
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