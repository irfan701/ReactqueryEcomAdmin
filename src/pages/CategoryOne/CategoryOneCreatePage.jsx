import {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import CategoryOneCreate from "../../components/CategoryOne/CategoryOneCreate.jsx";

const CategoryOneCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CategoryOneCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryOneCreatePage;