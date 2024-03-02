import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import {Toaster} from "react-hot-toast";
import CustomerCreateUpdatePage from "./pages/Customer/CustomerCreateUpdatePage.jsx";
import CustomerListPage from "./pages/Customer/CustomerListPage.jsx";
import BrandListPage from "./pages/Brand/BrandListPage.jsx";
import BrandCreatePage from "./pages/Brand/BrandCreatePage.jsx";
import BrandUpdatePage from "./pages/Brand/BrandUpdatePage.jsx";
import ProfilePage from "./pages/Users/ProfilePage.jsx";
import Page404 from "./pages/NotFound/Page404.jsx";
import LoginPage from "./pages/Users/LoginPage.jsx";

import CategoryOneCreatePage from "./pages/CategoryOne/CategoryOneCreatePage.jsx";
import CategoryOneListPage from "./pages/CategoryOne/CategoryOneListPage.jsx";
import CategoryOneUpdatePage from "./pages/CategoryOne/CategoryOneUpdatePage.jsx";
import CategoryTwoCreatePage from "./pages/CategoryTwo/CategoryTwoCreatePage.jsx";
import CategoryTwoUpdatePage from "./pages/CategoryTwo/CategoryTwoUpdatePage.jsx";
import CategoryTwoListPage from "./pages/CategoryTwo/CategoryTwoListPage.jsx";

import ProductListPage from "./pages/Product/ProductListPage.jsx";
import ProductCreateDescription from "./components/Product/ProductCreateDescription.jsx";
import ProductCreateImages from "./components/Product/ProductCreateImages.jsx";
import ProductCreateIdentity from "./components/Product/ProductCreateIdentity.jsx";
import ProductCreateIdentityPage from "./pages/Product/ProductCreateIdentityPage.jsx";
import ProductCreateDescriptionPage from "./pages/Product/ProductCreateDescriptionPage.jsx";
import ProductCreateImagesPage from "./pages/Product/ProductCreateImagesPage.jsx";
import VisitorListPage from "./pages/Visitor/VisitorListPage.jsx";
import NotificationListPage from "./pages/Notification/NotificationListPage.jsx";
import ContactListPage from "./pages/Contact/ContactListPage.jsx";
import IncompleteProductList from "./components/Product/IncompleteProductList.jsx";
import IncompleteProductListPage from "./pages/Product/IncompleteProductListPage.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<DashboardPage/>}/>
                    <Route exact path="/CustomerCreateUpdatePage" element={<CustomerCreateUpdatePage />}/>
                    <Route exact path="/CustomerListPage" element={<CustomerListPage />}/>

                    <Route exact path="/CategoryOneCreatePage" element={<CategoryOneCreatePage />}/>
                    <Route exact path="/CategoryOneUpdatePage" element={<CategoryOneUpdatePage />}/>
                    <Route exact path="/CategoryOneListPage" element={<CategoryOneListPage />}/>

                    <Route exact path="/CategoryTwoCreatePage" element={<CategoryTwoCreatePage />}/>
                    <Route exact path="/CategoryTwoUpdatePage" element={<CategoryTwoUpdatePage />}/>
                    <Route exact path="/CategoryTwoListPage" element={<CategoryTwoListPage />}/>

                    <Route exact path="/BrandCreatePage" element={<BrandCreatePage />}/>
                    <Route exact path="/BrandUpdatePage" element={<BrandUpdatePage />}/>
                    <Route exact path="/BrandListPage" element={<BrandListPage />}/>

                    <Route exact path="/visitor" element={<VisitorListPage />}/>
                    <Route exact path="/notification" element={<NotificationListPage />}/>
                    {/*<Route exact path="/otp" element={< />}/>*/}
                    <Route exact path="/contact" element={<ContactListPage />}/>

                    <Route exact path="/ProductCreateIdentityPage" element={<ProductCreateIdentityPage />}/>
                    <Route exact path="/ProductCreateDescriptionPage" element={<ProductCreateDescriptionPage />}/>
                    <Route exact path="/ProductCreateImagesPage" element={<ProductCreateImagesPage />}/>
                    <Route exact path="/InProductListPage" element={<IncompleteProductListPage />}/>
                    <Route exact path="/ProductListPage" element={<ProductListPage />}/>


                    <Route exact path="/login" element={<LoginPage />}/>
                    <Route exact path="/Profile" element={<ProfilePage/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />

            );
        </>
    );
};
export default App;