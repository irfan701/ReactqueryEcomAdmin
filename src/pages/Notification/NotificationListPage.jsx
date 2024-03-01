import  {Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import NotificationList from "../../components/Notification/NotificationList.jsx";

const NotificationListPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NotificationList/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default NotificationListPage;