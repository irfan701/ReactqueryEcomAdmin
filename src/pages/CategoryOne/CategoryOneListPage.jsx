import  {Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import CategoryOneList from "../../components/CategoryOne/CategoryOneList.jsx";

const CategoryOneListPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CategoryOneList/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default CategoryOneListPage;