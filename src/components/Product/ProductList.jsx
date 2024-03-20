import React, {useState} from "react";
import ScreenLoader from "../Loading/ScreenLoader.jsx";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {FaEdit} from "react-icons/fa";
import {DeleteRequest, ListRequest} from "../../APIRequest/CrudAPIRequest.js";
import {DeleteAlert} from "../../utility/DeleteAlert.js";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {ErrorToast} from "../../utility/FormHelper.js";
import {AiOutlineDelete} from "react-icons/ai";
import {PaginationControl} from "react-bootstrap-pagination-control";
import {getProducts, removeProducts} from "../../APIRequest/RouteName.js";
import {Badge, ProgressBar} from "react-bootstrap";

export default function ProductList(){

    const [pageNo, setPageNo] = useState(1); //skip
    const [perPage, setPerPage] = useState(10); //limit
    const [searchKeyword, setSearchKeyword] = useState(0);


    const queryClient = useQueryClient()
    const {isFetching, isLoading, isError, error, data: products} =
        useQuery({
            queryKey: ["products", pageNo, perPage, searchKeyword],
            queryFn: async () => ListRequest(getProducts,pageNo, perPage, searchKeyword),
            placeholderData: keepPreviousData,
            //staleTime: 2000,
        })
    const handleMove = (id) => {
        if (pageNo !== 1) {
            setPageNo(1)
        }
        setPageNo((prevPage) => prevPage + (id - 1))
    }
    const perPageOnChange = async (e) => {
        setPageNo(1)
        setPerPage(parseInt(e.target.value))
    }
    const searchKeywordOnChange = async (e) => {
        setSearchKeyword(e.target.value)
        setPageNo(1)
        if ((e.target.value).length === 0) {
            setSearchKeyword(0)
            setPageNo(1)
        }
    }
    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const {mutate} = UseMutation(
        (id) => DeleteRequest(removeProducts,id),
        async () => {
            return await queryClient.invalidateQueries({queryKey: ["products"]})
        },
        (e) => ErrorToast(e.message)
    )
    const deleteItem = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) mutate(id)
    }

    if (isLoading) {
        return <ScreenLoader/>
    }
    if (isError) {
        return <h3>Error:{error.message}</h3>
    }

    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h6>Product  List - {products.total}</h6>
                                        </div>

                                        <div className="col-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter"
                                                   className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select onChange={perPageOnChange}
                                                    className="form-control mx-2 form-select-sm form-select form-control-sm">
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="200">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={searchKeywordOnChange} type="text"
                                                       className="form-control form-control-sm"
                                                       placeholder="Search.."
                                                       aria-label="Recipient's username"
                                                       aria-describedby="button-addon2"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Image</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">SKU</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Item Name</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Quantity</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Brand</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Cat 1</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Details</td>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        products.rows?.map((item, i) => {
                                                            return (
                                                                <tr key={i.toString()}>

                                                                    <td><p className="text-xs text-start">{i+1}</p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <img width={100} src="https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg" alt=""/>
                                                                    
                                                                    </p></td>
                                                                    <td><p className="text-xs text-start">{item.pcode}</p></td>
                                                                    <td><p className="text-xs text-start">{item.title}</p></td>
                                                                    <td><p className="text-xs text-start">{item.qty}</p></td>
                                                                    <td><p className="text-xs text-start">{item.price}</p></td>
                                                                    <td><p className="text-xs text-start">{item.brands?item.brands.name:""}</p></td>
                                                                    <td><p className="text-xs text-start">{item.category1?item.category1.cat1_name:""}</p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <Badge bg="secondary">Active</Badge>

                                                                    </p></td>


                                                                    <td>
                                                                        <Link
                                                                            to={`/ProductCreateDescriptionPage?id=${item.id}`}
                                                                            className="btn text-warning btn-outline-light p-2 mb-0 btn-sm">
                                                                            <FaEdit size={15}/>
                                                                        </Link>

                                                                        <Link
                                                                            to={`/ProductCreateIdentityPage?id=${item.id}`}
                                                                            className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <FaEdit size={15}/>
                                                                        </Link>

                                                                        <button onClick={() => deleteItem(item.id)}
                                                                                className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                            <AiOutlineDelete size={15}/>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })

                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <span>Current Page: {pageNo}</span>
                                                {isFetching ? <span> Loading...</span> : null}{' '}
                                                <PaginationControl
                                                    last={true}
                                                    page={pageNo}
                                                    between={5}
                                                    total={Math.ceil(products.total)}
                                                    limit={perPage}
                                                    changePage={(id) => handleMove(id)}
                                                    ellipsis={1}
                                                    next={true}
                                                />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}