import {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import CategoryTwoCreate from "../../components/CategoryTwo/CategoryTwoCreate.jsx";

const CategoryTwoCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CategoryTwoCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryTwoCreatePage;