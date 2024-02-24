import  {Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import CategoryTwoList from "../../components/CategoryTwo/CategoryTwoList.jsx";

const CategoryTwoListPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CategoryTwoList/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default CategoryTwoListPage;