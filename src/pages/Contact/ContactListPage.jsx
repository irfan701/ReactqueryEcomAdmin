import  {Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";

import ContactList from "../../components/Contact/ContactList.jsx";

const ContactListPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ContactList/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default ContactListPage;