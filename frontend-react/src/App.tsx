import { Routes, Route } from "react-router-dom";
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

// Tạo Query Client
const queryClient = new QueryClient();
const clientId = "707353335287-iqf6miqalqt8d631q468fr2clnqpljc0.apps.googleusercontent.com"; // 🔹 Thay bằng giá trị thực từ Google Cloud


function App() {
  return (
    <>
    <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>  
      <ProductContext>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>

        <Navbar />
        <CustomBreadcrumb />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/den-nang-luong-mat-troi" element={<SolarLight />} />
            <Route path="/he-thong-dien-mat-troi" element={<SolarPanel />} />
            <Route path="/bai-viet" element={<Post />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/thanh-toan" element={<Checkout />} />
            <Route path="/den-nang-luong-mat-troi/:slug/:productId/:idDetail" element={<ProductDetail/>} />
            <Route path="/tai-khoan" element={<Login />} />
            <Route path="/tai-khoan/sign-up" element={<SignUp/>} />
            <Route path="/login-success" element={<LoginSuccess />} />

          </Routes>
        </Container>
        </ProductProvider>
        <Footer />
        </QueryClientProvider>

      </ProductContext>
      </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
