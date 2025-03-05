import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import fakeData from '../assets/fakedata/product-detail.json'

// Kiểu dữ liệu sản phẩm và biến thể
type Image = { id: number; nameAlt: string; nameUrl: string };
type ProductVariant = { id: number; wat: string; newprice: number; oldprice: number; images: Image[] };
type Product = { id: number; name: string; description: string; productVariant: ProductVariant[] };

// Kiểu dữ liệu cho Context
interface ProductContextType {
  productList: Product[];
  getProductById: (id: number) => Product | null;
}

// Tạo Context
const ProductContext = createContext<ProductContextType | null>(null);

// **Provider bao bọc ứng dụng**
export function ProductProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<Product[]>([]);

  // Tải toàn bộ danh sách sản phẩm từ API
  useEffect(() => {
    setProductList(fakeData)

  },[]);
//     fetch("https://api.example.com/products") // API danh sách tổng quan
//       .then((res) => res.json())
//       .then(() => setProductList())
//       .catch((error) => console.error("Lỗi tải danh sách sản phẩm:", error));
//   }, []);

  // Hàm tìm sản phẩm theo ID
  function getProductById(id: number) {
    return productList.find((product) => product.id === id) || null;
  }

  return (
    <ProductContext.Provider value={{ productList, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
}

// Hook sử dụng Context
export function useProductDetailContext() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext phải nằm trong ProductProvider");
  return context;
}