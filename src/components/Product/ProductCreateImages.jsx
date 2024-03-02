export default function ProductCreateImages(){

    // let navigate=useNavigate();

    let params= new URLSearchParams(window.location.search);
    let id=params.get('id');

    const SaveChange = async () => {
            // if(await CreateProductRequest(FormObj,ObjectID)){
            //     navigate("/ProductListPage")
            // }
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
                                    <label className="form-label">Main Image</label>
                                    <input

                                       className="form-control form-control-sm" type="file"/>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Multi Images</label>
                                    <input

                                        className="form-control form-control-sm" type="file" multiple={true}/>
                                </div>

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