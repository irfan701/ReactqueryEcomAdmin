import  {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {ErrorToast, isEmpty} from "../../utility/FormHelper";

const ProductCreateDescription = () => {
    const [FormObj, setFormObj] = useState({title: '',brand_id:'',cat1_id:'',cat2_id:'',unit:'',details:''})
    const InputOnChange = (key, value) => setFormObj(prevObj => ({...prevObj, [key]: value}))

    let navigate=useNavigate();
    let [ObjectID,SetObjectID]=useState(0);

    useEffect(()=>{
        (async () => {
        //    await ProductBrandDropDownRequest();
        //    await ProductCategoryDropDownRequest();
        })();

        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
               // await FillProductFormRequest(id)
            })();
        }

    },[])



    const SaveChange = async () => {
        if(isEmpty(FormObj.title)){
            ErrorToast("Product Name Required !")
        }
        else if(isEmpty(FormObj.brand_id)){
            ErrorToast("Product Brand Required !")
        }
        else if(isEmpty(FormObj.cat1_id)){
            ErrorToast("Product Category Required !")
        }
        else if(isEmpty(FormObj.unit)){
            ErrorToast("Product Unit Required !")
        }

        else {
            // if(await CreateProductRequest(FormObj,ObjectID)){
            //     navigate("/ProductListPage")
            // }
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h5 >Save Product Type</h5>
                                <hr className="bg-light"/>


                                <div className="col-4 p-2">
                                    <label className="form-label">Product Code</label>
                                    <select
                                        onChange={(e) => InputOnChange('cat1_id', e.target.value)}
                                        value={FormObj.categoryID} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {/*{*/}
                                        {/*    ProductCategoryDropDown.map((item,i)=>{*/}
                                        {/*        return( <option key={i.toLocaleString()} value={item._id}>{item.Name}</option>)*/}
                                        {/*    })*/}
                                        {/*}*/}
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Size</label>
                                    <select
                                        onChange={(e) => InputOnChange('size', e.target.value)}
                                        value={FormObj.categoryID} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {/*{*/}
                                        {/*    ProductCategoryDropDown.map((item,i)=>{*/}
                                        {/*        return( <option key={i.toLocaleString()} value={item._id}>{item.Name}</option>)*/}
                                        {/*    })*/}
                                        {/*}*/}
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Color</label>
                                    <select
                                        onChange={(e) => InputOnChange('color', e.target.value)}
                                        value={FormObj.categoryID} className="form-select form-select-sm">
                                        <option value="">Select Type</option>
                                        {/*{*/}
                                        {/*    ProductCategoryDropDown.map((item,i)=>{*/}
                                        {/*        return( <option key={i.toLocaleString()} value={item._id}>{item.Name}</option>)*/}
                                        {/*    })*/}
                                        {/*}*/}
                                    </select>
                                </div>

                                <div className="col-4 p-2">
                                    <label className="form-label">Size Tags</label>
                                    <input
                                        onChange={(e) => InputOnChange('title', e.target.value)}
                                        value={FormObj.name}
                                        className="form-control form-control-sm" type="text"/>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Color Tags</label>
                                    <input
                                        onChange={(e) => InputOnChange('title', e.target.value)}
                                        value={FormObj.name}
                                        className="form-control form-control-sm" type="text"/>
                                </div>
                              <div className='clearfix'></div>

                                <div className="col-4 p-2">
                                    <label className="form-label">Bullet Point</label>
                                    <textarea
                                        onChange={(e) => InputOnChange('bullet_point', e.target.value)}
                                        name="" id="" cols="30" rows="5" className="form-control form-control-sm"></textarea>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Short Description</label>
                                    <textarea
                                        onChange={(e) => InputOnChange('short_des', e.target.value)}
                                        name="" id="" cols="30" rows="5" className="form-control form-control-sm"></textarea>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Long Description</label>
                                    <textarea
                                        onChange={(e) => InputOnChange('long_des', e.target.value)}
                                        name="" id="" cols="30" rows="5" className="form-control form-control-sm"></textarea>
                                </div>

                                <br/>


                            </div>
                            <div className="row">
                                <div className="col-4 p-2">
                                    <button onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreateDescription;