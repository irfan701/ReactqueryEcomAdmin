import {useForm} from "react-hook-form";
import {useQueryClient} from "@tanstack/react-query";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {CreateRequest, UpdateRequest} from "../../APIRequest/CrudAPIRequest.js";
import {createProductMainImage, createProductMultiImage} from "../../APIRequest/RouteName.js";
import {ErrorToast} from "../../utility/FormHelper.js";
import {useState} from "react";
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

export default function ProductCreateImages() {

    // let navigate=useNavigate();
    const [picture, setPicture] = useState(null);
    const [multipicture, setMultiPicture] = useState([]);


    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    const registerForm = () => {
        const {register, setValue, formState: {errors}, handleSubmit} = useForm();
        return {register, setValue, formState: {errors}, handleSubmit};
    }
    // Register multiple forms
    const forms = {
        oneImg: registerForm(),
        multiImg: registerForm(),
    }
    const onChangeSinglePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]));
        forms.oneImg.setValue('main_image', e.target.files[0]);
    };
    const onChangeMultiPicture = (e) => {
        const files = Array.from(e.target.files);
        setMultiPicture(files)
        forms.multiImg.setValue('multi_image', e.target.files)
    };


    const queryClient = useQueryClient()
    const {mutate} = UseMutation(
        (formData) => UpdateRequest(createProductMainImage, formData, id),
        async () => {
            return await queryClient.invalidateQueries({queryKey: [""]})
        },
        (e) => ErrorToast(e.message)
    )

    const {mutate: multiMutate} = UseMutation(
        (formData) => CreateRequest(createProductMultiImage, formData),
        async () => {
            return await queryClient.invalidateQueries({queryKey: [""]})
        },
        (e) => ErrorToast(e.message)
    )


    const onSubmit = async (data) => await mutate(data)
    const onMultiSubmit = async (data) => {
        const formData = new FormData();
        for (let i = 0; i < data.multi_image.length; i += 1) {
            formData.append('images[]', data.multi_image[i]);
        }
        formData.append("product_id", id);
        await CreateRequest(createProductMultiImage, formData);
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="row">
                                <h5>Save Product Images</h5>
                                <hr className="bg-light"/>

                                {/*<div className="col-4 p-2">*/}
                                {/*    <label className="form-label">Category</label>*/}
                                {/*    <select*/}
                                {/*        onChange={(e) => InputOnChange('cat1_id', e.target.value)}*/}
                                {/*        value={FormObj.categoryID} className="form-select form-select-sm">*/}
                                {/*        <option value="">Select Type</option>*/}
                                {/*        /!*{*!/*/}
                                {/*        /!*    ProductCategoryDropDown.map((item,i)=>{*!/*/}
                                {/*        /!*        return( <option key={i.toLocaleString()} value={item._id}>{item.Name}</option>)*!/*/}
                                {/*        /!*    })*!/*/}
                                {/*        /!*}*!/*/}
                                {/*    </select>*/}
                                {/*</div>*/}

                                <div className="col-4 p-2">
                                    <form onSubmit={forms.oneImg.handleSubmit(onSubmit)}>
                                        <label className="form-label">Main Image</label>
                                        <input type="hidden" {...forms.oneImg.register("main_image")}/>
                                        <input onChange={onChangeSinglePicture} className="form-control form-control-sm"
                                               type="file"/>
                                        {/*/!*{errors.file && <p>Please select an image</p>}*!/*/}
                                        <button type='submit' className="btn btn-sm my-3 btn-success">Save Change
                                        </button>
                                    </form>
                                </div>

                                <div className="col-4 p-2">
                                    <form onSubmit={forms.multiImg.handleSubmit(onMultiSubmit)}>
                                        <label className="form-label">Multiple Image (Max 6 Images)</label>
                                        <input type="hidden" {...forms.multiImg.register("product_id")} value={id}/>
                                        <input type="hidden" {...forms.multiImg.register("multi_image")}/>
                                        <input onChange={onChangeMultiPicture} className="form-control form-control-sm"
                                               type="file" multiple={true}/>
                                        <button type='submit' className="btn btn-sm my-3 btn-success">Save Change
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            {picture &&
                <PhotoProvider>
                    <PhotoView src={picture && picture}>
                        <img className="img-thumbnail mx-3 my-3" width={200} src={picture && picture} alt="..."/>
                    </PhotoView>
                </PhotoProvider>
                || ''}

            {multipicture.map((file, index) => (
                <PhotoProvider key={index}>
                    <PhotoView src={URL.createObjectURL(file)}>
                        <img className="img-thumbnail mx-3 my-3" width={200} src={URL.createObjectURL(file)} alt="..."/>
                    </PhotoView>
                </PhotoProvider>
            ))}
        </div>

    );
}