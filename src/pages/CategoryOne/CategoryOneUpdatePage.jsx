import  {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import CategoryOneUpdate from "../../components/CategoryOne/CategoryOneUpdate.jsx";

const CategoryOneUpdatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <CategoryOneUpdate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryOneUpdatePage;