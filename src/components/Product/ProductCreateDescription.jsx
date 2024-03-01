import {useQuery, useQueryClient} from "@tanstack/react-query";
import {createProductDetails} from "../../APIRequest/RouteName.js";
import {Controller, useForm} from "react-hook-form";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {CreateRequest, UpdateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {ErrorToast} from "../../utility/FormHelper.js";
import {TagsInput} from "react-tag-input-component";

const ProductCreateDescription = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm()


    // const {isLoading, data: product_code} = useQuery({queryKey: ["categoryOneDD"],
    //         queryFn: async () => DropDownListRequest(getProductCodeDD),
    //     })
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    const queryClient = useQueryClient()
    const {mutate} = UseMutation(
        (formData) => CreateRequest(createProductDetails, formData),
        async () => {
            return await queryClient.invalidateQueries({queryKey: ["products", id]})
        },
        (e) => ErrorToast(e.message)
    )
   // const onSubmit = async (data) => await mutate(data)
    const onSubmit = async (data) => console.log(data)


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                <div className="row">
                                    <h5>Save Product Type</h5>
                                    <hr className="bg-light"/>


                                    {/*<div className="col-4 p-2">*/}
                                    {/*    <label className="form-label">Product Code</label>*/}
                                    {/*    <select*/}
                                    {/*        {...register("pcode", {required: {value: true, message: 'pcode is required'}})}*/}
                                    {/*        className="form-select form-select-sm">*/}
                                    {/*        <option value="">Select Type</option>*/}
                                    {/*        {*/}
                                    {/*            product_code?.map((item,i)=>{*/}
                                    {/*                return( <option key={i.toLocaleString()} value={item.id}>{item.pcode} |{item.title} |{item.category1.cat1_name}</option>)*/}
                                    {/*            })*/}
                                    {/*        }*/}
                                    {/*    </select>*/}
                                    {/*    {errors.pcode?.message && (<p className="invalid-error">{errors.pcode?.message}</p>)}*/}
                                    {/*</div>*/}





                                    <div className="col-4 p-2">
                                        <label className="form-label">Size Tags</label>
                                        <Controller
                                            name="size"
                                            control={control}
                                            render={({field}) => (
                                                <TagsInput
                                                    //value={field.value}
                                                    //id={field.name}
                                                    onChange={value => field.onChange(value)}
                                                    placeHolder="Enter Size Tag"
                                                />
                                            )}
                                        />
                                        {/*{errors.size?.message && (<p className="invalid-error">{errors.size?.message}</p>)}*/}
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Color Tags</label>
                                        <Controller
                                            name="color"
                                            control={control}
                                            render={({field}) => (
                                                <TagsInput
                                                    //value={field.value}
                                                    //id={field.name}
                                                    onChange={value => field.onChange(value)}
                                                    placeHolder="Enter Color Tags"
                                                />
                                            )}
                                        />
                                        {/*{errors.color?.message && (<p className="invalid-error">{errors.color?.message}</p>)}*/}
                                    </div>


                                    <input type="hidden"   value={id} {...register("product_id") }/>

                                    <div className='clearfix'></div>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Bullet Point</label>
                                        <textarea
                                            {...register("bullet_point", {
                                                required: {
                                                    value: true,
                                                    message: 'Bullet point is required'
                                                }
                                            })}

                                            id="" cols="30" rows="5"
                                            className="form-control form-control-sm"></textarea>
                                        {errors.bullet_point?.message && (
                                            <p className="invalid-error">{errors.bullet_point?.message}</p>)}
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Short Description</label>
                                        <textarea
                                            {...register("short_des", {
                                                required: {
                                                    value: false,
                                                    message: 'Short des is required'
                                                }
                                            })}
                                            id="" cols="30" rows="5"
                                            className="form-control form-control-sm"></textarea>
                                        {errors.short_des?.message && (
                                            <p className="invalid-error">{errors.short_des?.message}</p>)}
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Long Description</label>
                                        <textarea
                                            {...register("long_des", {
                                                required: {
                                                    value: true,
                                                    message: 'Long Details is required'
                                                }
                                            })}
                                            id="" cols="30" rows="5"
                                            className="form-control form-control-sm"></textarea>
                                        {errors.long_des?.message && (
                                            <p className="invalid-error">{errors.long_des?.message}</p>)}
                                    </div>

                                    <br/>


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

export default ProductCreateDescription;