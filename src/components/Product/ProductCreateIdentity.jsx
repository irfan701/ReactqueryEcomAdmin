import {useForm} from "react-hook-form";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {createProductIdentity, getBrandDD, getCategory1DD, getCategory2DD} from "../../APIRequest/RouteName.js";
import {DependentDropDownListRequestById, DropDownListRequest} from "../../APIRequest/DropdownListAPIRequest.js";
import {useState} from "react";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {CreateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {ErrorToast} from "../../utility/FormHelper.js";

const ProductCreateIdentity = () => {

    const [CatOneId, setCatOneId] = useState()
    const CatOneIdHandle = (id) => setCatOneId(id)

    const {register, formState: {errors}, handleSubmit} = useForm()

    const {isLoading, data: categoryOneDD} =
        useQuery({
            queryKey: ["categoryOneDD"],
            queryFn: async () => DropDownListRequest(getCategory1DD),
        })

    const {status, data: categoryTwoDD} =
        useQuery({
            queryKey: ["categoryTwoDD", CatOneId],
            queryFn: async () => DependentDropDownListRequestById(getCategory2DD, CatOneId),
            enabled: !!CatOneId
        })

    const {data: brandDD} =
        useQuery({
            queryKey: ["brandDD"],
            queryFn: async () => DropDownListRequest(getBrandDD),
        })

    const queryClient = useQueryClient()
    const {mutate} = UseMutation(
        (formData) => CreateRequest(createProductIdentity,formData),
        async() => {
            return await queryClient.invalidateQueries({queryKey:[""]})
        },
        (e) => ErrorToast(e.message)
    )
    const onSubmit = async (data) => await mutate(data)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                <div className="row">
                                    <h5>Save Product Type </h5>

                                    <hr className="bg-light"/>

                                    {isLoading ? <p>Loading Category</p> :
                                        <div className="col-4 p-2">
                                            <label className="form-label">Category</label>
                                            <select  {...register("cat1_id", {
                                                onChange: (e) => CatOneIdHandle(e.target.value)
                                                , required: {value: true, message: 'Category name is required'}
                                            })}

                                                     className="form-select form-select-sm">
                                                <option value="">Select Type</option>
                                                {
                                                    categoryOneDD?.map((item, i) => {
                                                        return (<option key={i.toLocaleString()}
                                                                        value={item.id}>{item.id}{item.cat1_name}</option>)
                                                    })
                                                }
                                            </select>
                                            {errors.cat1_id?.message && (
                                                <p className="invalid-error">{errors.cat1_id?.message}</p>)}
                                        </div>
                                    }


                                    <div className="col-4 p-2">
                                        <label className="form-label">Sub Category</label>
                                        <select  {...register("cat2_id", {
                                            required: {
                                                value: true,
                                                message: 'Sub category name is required'
                                            }
                                        })}
                                                 className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                categoryTwoDD?.map((item, i) => {
                                                    return (<option key={i.toLocaleString()} value={item.id}>{item.cat2_name}</option>)
                                                })
                                            }
                                        </select>
                                        {errors.cat2_id?.message && (<p className="invalid-error">{errors.cat2_id?.message}</p>)}
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label"></label>
                                        {status === "pending" &&
                                            <span className="mt-4 spinner-border text-success"></span>}
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label"> Brand</label>
                                        <select  {...register("brand_id", {
                                            required: {
                                                value: true,
                                                message: 'Brand name is required'
                                            }
                                        })}
                                                 className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                brandDD?.map((item, i) => {
                                                    return (<option key={i.toLocaleString()}
                                                                    value={item.id}>{item.name}</option>)
                                                })
                                            }
                                        </select>
                                        {errors.brand_id?.message && (
                                            <p className="invalid-error">{errors.brand_id?.message}</p>)}
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Item Name</label>
                                        <input {...register("title", {required: {value: true, message: 'Item name is required'}})}
                                               className="form-control form-control-sm" type="text"/>
                                        {errors.title?.message && (<p className="invalid-error">{errors.title?.message}</p>)}
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Quantity</label>
                                        <input {...register("qty", {
                                            required: {
                                                value: true,
                                                message: 'Quantity  is required'
                                            }
                                        })}
                                               className="form-control form-control-sm" type="text"/>
                                        {errors.qty?.message && (
                                            <p className="invalid-error">{errors.qty?.message}</p>)}
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Price</label>
                                        <input {...register("price", {
                                            required: {
                                                value: true,
                                                message: 'Price is required'
                                            }
                                        })}
                                               className="form-control form-control-sm" type="text"/>
                                        {errors.price?.message && (
                                            <p className="invalid-error">{errors.price?.message}</p>)}
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Discount</label>
                                        <input {...register("discount")} className="form-control form-control-sm"
                                               type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button type="submit" className="btn btn-sm my-3 btn-success">Save Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCreateIdentity;