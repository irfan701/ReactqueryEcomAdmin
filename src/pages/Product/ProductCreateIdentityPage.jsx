import  {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import ProductCreateIdentity from "../../components/Product/ProductCreateIdentity.jsx";

const ProductCreateImagePage = () => {

    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProductCreateIdentity/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductCreateImagePage;