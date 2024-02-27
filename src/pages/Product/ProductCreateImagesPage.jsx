import  {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import ProductCreateImages from "../../components/Product/ProductCreateImages.jsx";


const ProductCreateImagesPage = () => {




    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProductCreateImages/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductCreateImagesPage;