import {useState} from "react";
import {ErrorToast, isEmpty} from "../../utility/FormHelper.js";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {CreateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {DropDownListRequest} from "../../APIRequest/DropdownListAPIRequest.js";
import ScreenLoader from "../Loading/ScreenLoader.jsx";
import {createCategory2, getCategory1DD} from "../../APIRequest/RouteName.js";

export default function CategoryTwoCreate() {
    const [FormObj, setFormObj] = useState({cat1_id:'',cat2_name: ''})
    const InputOnChange = (key, value) => setFormObj(prevObj => ({...prevObj, [key]: value}))

    const {isFetching, isLoading, isError, error, data: category_one} =
        useQuery({
            queryKey: ["category_one"],
            queryFn: async () => DropDownListRequest(getCategory1DD),
            placeholderData: keepPreviousData,
            //staleTime: 2000,
        })

    const queryClient = useQueryClient()
    const {mutate} = UseMutation(
        (formData) => CreateRequest(createCategory2,formData),
        async () => {
            return await queryClient.invalidateQueries({queryKey: ["category_one"]})
        },
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (event) => {
        event.preventDefault()

        // if (isEmpty(FormObj.cat2_name)) {
        //     ErrorToast("Category-2 Name Required !")
        // } else {
            await mutate(FormObj)
       // }
    }
    if (isLoading) {
        return <ScreenLoader/>
    }
    if (isError) {
        return <h3>Error:{error.message}</h3>
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
                                        <h5>Category Level -2</h5>
                                        <hr className="bg-light"/>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Category-1 List</label>
                                            <select onChange={(e) => InputOnChange('cat1_id', e.target.value)}
                                                    className="form-control form-control-sm">
                                                <option value="">Select Category Name</option>
                                                {category_one?.map((item, i) => <option key={i.toString()} value={item.id}>{item.cat1_name}</option>)}
                                            </select>
                                        </div>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Category-2 Name</label>
                                            <input
                                                onChange={(e) => InputOnChange('cat2_name', e.target.value)}
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
                                        {isFetching ? <span> Loading...</span> : null}{' '}
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