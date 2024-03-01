import  {Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import VisitorList from "../../components/Visitor/VisitorList.jsx";

const VisitorListPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <VisitorList/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default VisitorListPage;