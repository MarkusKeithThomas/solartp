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
import CategoriesPage from "./pages/admin/CategoriesPage";
import { ProductAdminProvider } from "./context/admin/ProductAdminProvider";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductFormPage from "./pages/admin/ProductFormTabs";
import UploadProductExcelPage from "./pages/admin/UploadProductExcelPage";
import OrderDetailAdminPage from "./pages/admin/OrderDetailAdminPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AdminReportPage from "./pages/admin/AdminReportPage";
import AdminImageManager from "./pages/admin/AdminImageManager";
import RegisterSolarPanel from "./pages/admin/RegisterSolarPanel";
import ChatPage from "./pages/admin/ChatPage";
import { ListJob } from "./pages/tuyen-dung/ListJob";
import JobDetail from "./pages/tuyen-dung/JobDetail";
import VoucherPage from "./pages/admin/voucher/VoucherPage";
import VoucherEditPage from "./pages/admin/voucher/VoucherEditPage";
import VoucherCreatePage from "./pages/admin/voucher/VoucherCreatePage";

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
                        <Route
                          path="/admin"
                          element={
                            <RequireAdmin>
                              <AdminLayout />
                            </RequireAdmin>
                          }
                        >
                          <Route path="/admin" element={<Dashboard />} />
                          <Route path="orders" element={<OrdersPage />} />
                          <Route
                            path="orders/:id"
                            element={<OrderDetailAdminPage />}
                          />

                          <Route
                            path="products"
                            element={<ProductListPage />}
                          />
                          <Route path="category" element={<CategoriesPage />} />
                          <Route
                            path="products/edit/:id"
                            element={<ProductFormPage />}
                          />
                          <Route
                            path="products/add"
                            element={<ProductFormPage />}
                          />
                          <Route
                            path="products/excel"
                            element={<UploadProductExcelPage />}
                          />

                          <Route
                            path="users"
                            element={<UserManagementPage />}
                          />

                          <Route path="report" element={<AdminReportPage />} />
                          <Route
                            path="images"
                            element={<AdminImageManager />}
                          />
                          <Route
                            path="don-mai-nha"
                            element={<RegisterSolarPanel />}
                          />

                          <Route path="chat" element={<ChatPage />} />
                          <Route path="vouchers" element={<VoucherPage/>}></Route>
                          <Route path="vouchers/get-voucher-id/:id" element={<VoucherEditPage/>}></Route>
                          <Route path="vouchers/create-voucher" element={<VoucherCreatePage/>}></Route>


                          {/* thêm các route admin khác */}

                          <Route path="*" element={<div>404 Not Found</div>} />

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
                          <Route
                            path="/login-admin"
                            element={<AdminLoginPage />}
                          />

                          <Route path="/list-job" element={<ListJob />} />
                          <Route path="/list-job/:slug" element={<JobDetail/>}/>
            
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
