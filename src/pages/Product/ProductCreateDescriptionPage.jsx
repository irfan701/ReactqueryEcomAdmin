import  {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import ProductCreateDescription from "../../components/Product/ProductCreateDescription.jsx";

const ProductCreateUpdatePage = () => {

    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProductCreateDescription/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductCreateUpdatePage;