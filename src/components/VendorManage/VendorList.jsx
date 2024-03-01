import {useState} from "react";
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
import {getCategory2, removeCategory2} from "../../APIRequest/RouteName.js";

export default function VendorList(){

    const [pageNo, setPageNo] = useState(1); //skip
    const [perPage, setPerPage] = useState(10); //limit
    const [searchKeyword, setSearchKeyword] = useState(0);


    const queryClient = useQueryClient()
    const {isFetching, isLoading, isError, error, data: vendors} =
        useQuery({
            queryKey: ["vendors", pageNo, perPage, searchKeyword],
            queryFn: async () => ListRequest(getCategory2,pageNo, perPage, searchKeyword),
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
        (id) => DeleteRequest(removeCategory2,id),
        async () => {
            return await queryClient.invalidateQueries({queryKey: ["vendors"]})
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
                                            <h5>Category Two List - {vendors.total}</h5>
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
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Code</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Logo</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Name</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Owner</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Address</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Category</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Username</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Mobile</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Email</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Password</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shop Status</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {/*{*/}
                                                    {/*    vendors.rows?.map((item, i) => {*/}
                                                    {/*        return (*/}
                                                    {/*            <tr key={i.toString()}>*/}
                                                    {/*                <td><p className="text-xs text-start"> {item.id}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_code}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_logo}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_name}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_owner}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_address}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_category}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_username}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_mobile}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_email}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_password}</p></td>*/}
                                                    {/*                <td><p className="text-xs text-start">{item.shop_status}</p></td>*/}

                                                    {/*                <td>*/}
                                                    {/*                    <Link*/}
                                                    {/*                        to={`/CategoryTwoUpdatePage?id=${item.id}`}*/}
                                                    {/*                        className="btn text-info btn-outline-light p-2 mb-0 btn-sm">*/}
                                                    {/*                        <FaEdit size={15}/>*/}
                                                    {/*                    </Link>*/}

                                                    {/*                    <button onClick={() => deleteItem(item.id)}*/}
                                                    {/*                            className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">*/}
                                                    {/*                        <AiOutlineDelete size={15}/>*/}
                                                    {/*                    </button>*/}
                                                    {/*                </td>*/}
                                                    {/*            </tr>*/}
                                                    {/*        )*/}
                                                    {/*    })*/}

                                                    {/*}*/}

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
                                                    total={Math.ceil(vendors.total)}
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