import {useState} from "react";
import ScreenLoader from "../Loading/ScreenLoader.jsx";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {DeleteRequest, ListRequest} from "../../APIRequest/CrudAPIRequest.js";
import {DeleteAlert} from "../../utility/DeleteAlert.js";
import {UseMutation} from "../../utility/ReactQueryHook.js";
import {ErrorToast} from "../../utility/FormHelper.js";
import {AiOutlineDelete} from "react-icons/ai";
import {PaginationControl} from "react-bootstrap-pagination-control";
import {getCategory2, removeCategory2} from "../../APIRequest/RouteName.js";

export default function NotificationList(){

    const [pageNo, setPageNo] = useState(1); //skip
    const [perPage, setPerPage] = useState(10); //limit
    const [searchKeyword, setSearchKeyword] = useState(0);


    const queryClient = useQueryClient()
    const {isFetching, isLoading, isError, error, data: notifications} =
        useQuery({
            queryKey: ["notifications", pageNo, perPage, searchKeyword],
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
            return await queryClient.invalidateQueries({queryKey: ["notifications"]})
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
                                            <h5>Category Two List - {notifications.total}</h5>
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
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Subject</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Message</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Time</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {/*{*/}
                                                    {/*    notifications.rows?.map((item, i) => {*/}
                                                    {/*        return (*/}
                                                    {/*            <tr key={i.toString()}>*/}
                                                    {/*                <td><p*/}
                                                    {/*                    className="text-xs text-start"> {i+1}</p>*/}
                                                    {/*                </td>*/}
                                                    {/*                <td><p*/}
                                                    {/*                    className="text-xs text-start">{item.subject}</p>*/}
                                                    {/*                </td>*/}
                                                    {/*                <td><p*/}
                                                    {/*                    className="text-xs text-start">{item.message}</p>*/}
                                                    {/*                </td>*/}
                                                    {/*                <td><p*/}
                                                    {/*                    className="text-xs text-start">{item.date}</p>*/}
                                                    {/*                </td>*/}
                                                    {/*                <td><p*/}
                                                    {/*                    className="text-xs text-start">{item.time}</p>*/}
                                                    {/*                </td>*/}

                                                    {/*                <td>*/}
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
                                                    total={Math.ceil(notifications.total)}
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
};