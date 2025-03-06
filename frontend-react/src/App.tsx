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

// Tạo Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <>
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

          </Routes>
        </Container>
        </ProductProvider>
        <Footer />
        </QueryClientProvider>

      </ProductContext>
    </>
  );
}

export default App;
