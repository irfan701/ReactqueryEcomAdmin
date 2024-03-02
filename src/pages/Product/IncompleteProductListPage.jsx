import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import ProductList from "../../components/Product/ProductList";
import IncompleteProductList from "../../components/Product/IncompleteProductList.jsx";
const ProductListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <IncompleteProductList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default ProductListPage;