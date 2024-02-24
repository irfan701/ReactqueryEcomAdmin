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
import CategoryCreateUpdatePage from "./pages/Category/CategoryCreateUpdatePage.jsx";
import CategoryList from "./components/Category/CategoryList.jsx";
import CategoryOneCreatePage from "./pages/CategoryOne/CategoryOneCreatePage.jsx";
import CategoryOneListPage from "./pages/CategoryOne/CategoryOneListPage.jsx";
import CategoryOneUpdatePage from "./pages/CategoryOne/CategoryOneUpdatePage.jsx";
import CategoryTwoCreatePage from "./pages/CategoryTwo/CategoryTwoCreatePage.jsx";
import CategoryTwoUpdatePage from "./pages/CategoryTwo/CategoryTwoUpdatePage.jsx";
import CategoryTwoListPage from "./pages/CategoryTwo/CategoryTwoListPage.jsx";

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

                    <Route exact path="/CategoryThreeCreatePage" element={<CategoryOneCreatePage />}/>
                    <Route exact path="/CategoryThreeUpdatePage" element={<CategoryOneUpdatePage />}/>
                    <Route exact path="/CategoryThreeListPage" element={<CategoryOneListPage />}/>

                    <Route exact path="/BrandCreatePage" element={<BrandCreatePage />}/>
                    <Route exact path="/BrandUpdatePage" element={<BrandUpdatePage />}/>
                    <Route exact path="/BrandListPage" element={<BrandListPage />}/>
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