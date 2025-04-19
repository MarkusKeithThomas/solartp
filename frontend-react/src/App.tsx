import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Post } from "./pages/bai-viet/Post";
import { Contact } from "./pages/lien-he/Contact";
import { Navbar } from "./layout/Navbar";
import { SolarLight } from "./pages/den-nang-luong-mat-troi/SolarLight";
import { SolarPanel } from "./pages/he-thong-dien-mat-troi/SolarPanel";
import { Container } from "react-bootstrap";
import { Footer } from "./layout/Footer";
import { CustomBreadcrumb } from "./layout/CustomBreadcrumb";
import { ProductContext } from "./context/ProductContext";
import { Checkout } from "./pages/thanh-toan/Checkout";
import ProductDetail from "./pages/product-deatail/ProductDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "./context/ProductProvider";
import { Login } from "./pages/tai-khoan/Login";
import SignUp from "./pages/tai-khoan/Signup";
import { AuthProvider } from "./context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginSuccess from "./pages/tai-khoan/LoginSuccess";
import { ConfirmOrder } from "./pages/thanh-toan/ConfirmOrder";
import { ForgotPassword } from "./pages/tai-khoan/ForgotPassword";
import { ResetPassword } from "./pages/tai-khoan/ResetPassword";
import { PostDetail } from "./pages/bai-viet/PostDetail";
import { HelmetProvider } from "react-helmet-async";
import { ArticleProvider } from "./context/ArticleProvider";
import { useEffect } from "react";
import FixedActionButtons from "./components/FixedActionButtons";
import { OrderDetailPage } from "./pages/trang-thai-hang/OrderDetailPage";
import AdminLayout from "./layout/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import RequireAdmin from "./components/auth/RequireAdmin";
import OrdersPage from "./pages/admin/OrdersPage";
import ProductsPage from "./pages/admin/ProductListPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import { ProductAdminProvider } from "./context/admin/ProductAdminProvider";
import path from 'path';
import ProductListPage from "./pages/admin/ProductListPage";
import ProductFormPage from "./pages/admin/ProductFormTabs";
import UploadProductExcelPage from "./pages/admin/UploadProductExcelPage";

// Tạo Query Client
const queryClient = new QueryClient();
const clientId =
  "707353335287-iqf6miqalqt8d631q468fr2clnqpljc0.apps.googleusercontent.com";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const existingUuid = localStorage.getItem("guest-uuid");
    if (!existingUuid) {
      const newUuid = crypto.randomUUID();
      localStorage.setItem("guest-uuid", newUuid);
    }
  }, []);
  return (
    <HelmetProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <ProductProvider>
            <ProductContext>
              <QueryClientProvider client={queryClient}>
                <ArticleProvider>
                  {!isAdminRoute && <Navbar />}
                  {!isAdminRoute && <CustomBreadcrumb />}

                  {isAdminRoute ? (
                    // 👉 Route admin không cần Container hay Footer
                    <ProductAdminProvider>
                    <Routes>
                      <Route path="/admin/login" element={<AdminLoginPage />} />

                      <Route
                        path="/admin"
                        element={
                          <RequireAdmin>
                            <AdminLayout />
                          </RequireAdmin>
                        }
                      >
                        <Route index element={<Dashboard />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route path="products" element={<ProductListPage />} />
                        <Route path="category" element={<CategoriesPage />} />
                        <Route path="products/edit/:id" element={<ProductFormPage />} />
                        <Route path="products/add" element={<ProductFormPage />} />
                        <Route path="products/excel" element={<UploadProductExcelPage />} />
                        {/* thêm các route admin khác */}


                        {/* các route khác */}
                      </Route>
                    </Routes>
                    </ProductAdminProvider>
                  ) : (
                    <>
                      <Container>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route
                            path="/den-nang-luong-mat-troi"
                            element={<SolarLight />}
                          />
                          <Route
                            path="/he-thong-dien-mat-troi"
                            element={<SolarPanel />}
                          />
                          <Route path="/bai-viet" element={<Post />} />
                          <Route
                            path="/bai-viet/:slug"
                            element={<PostDetail />}
                          />
                          <Route path="/lien-he" element={<Contact />} />
                          <Route path="/thanh-toan" element={<Checkout />} />
                          <Route
                            path="/thanh-toan/confirm"
                            element={<ConfirmOrder />}
                          />
                          <Route
                            path="/den-nang-luong-mat-troi/:slug"
                            element={<ProductDetail />}
                          />
                          <Route path="/tai-khoan" element={<Login />} />
                          <Route
                            path="/tai-khoan/sign-up"
                            element={<SignUp />}
                          />
                          <Route
                            path="/tai-khoan/forgot-password"
                            element={<ForgotPassword />}
                          />
                          <Route
                            path="/tai-khoan/reset-password"
                            element={<ResetPassword />}
                          />
                          <Route
                            path="/login-success"
                            element={<LoginSuccess />}
                          />
                          <Route
                            path="/trang-thai-hang"
                            element={<OrderDetailPage />}
                          />
                        </Routes>
                      </Container>
                      <Footer />
                    </>
                  )}

                  {!isAdminRoute && <FixedActionButtons />}
                </ArticleProvider>
              </QueryClientProvider>
            </ProductContext>
          </ProductProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
}

export default App;
