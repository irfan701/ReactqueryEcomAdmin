import  {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import CategoryTwoUpdate from "../../components/CategoryTwo/CategoryTwoUpdate.jsx";

const CategoryTwoUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <CategoryTwoUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryTwoUpdatePage;