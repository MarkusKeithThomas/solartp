import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
  } from "react";
  import {
    getAdminProducts,
    addProductApi,
    updateProductApi,
    deleteProductApi,
    getProductByIdApi,
  } from "../../api/admin/productApi";
import { Product } from "../ProductProvider";
  
  interface ProductAdminContextType {
    products: Product[];
    isLoading: boolean;
    addProduct: (p: Product) => Promise<void>;
    updateProduct: (p: Product) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
    getProductById: (id: number) => Promise<Product | null>;
    reloadProducts: () => void;
  }
  
  const ProductAdminContext = createContext<ProductAdminContextType | null>(null);
  
  export function ProductAdminProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const result = await getAdminProducts();
        setProducts(result);
      } catch (err) {
        console.error("❌ Không lấy được danh sách sản phẩm admin:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      loadProducts();
    }, []);
  
    const addProduct = async (p: Product) => {
      try {
        const newProduct = await addProductApi(p);
        setProducts((prev) => [...prev, newProduct]);
      } catch (err) {
        console.error("❌ Lỗi khi thêm sản phẩm:", err);
        throw err;
      }
    };
  
    const updateProduct = async (p: Product) => {
      try {
        const updated = await updateProductApi(p);
        setProducts((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
      } catch (err) {
        console.error("❌ Lỗi khi cập nhật sản phẩm:", err);
        throw err;
      }
    };
  
    const removeProduct = async (id: number) => {
      try {
        await deleteProductApi(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error("❌ Lỗi khi xoá sản phẩm:", err);
        throw err;
      }
    };
  
    const getProductById = useCallback(async (id: number) => {
      try {
        const product = await getProductByIdApi(id);
        return product;
      } catch (err) {
        console.error("❌ Không tìm thấy sản phẩm:", err);
        return null;
      }
    }, []);
  
    return (
      <ProductAdminContext.Provider
        value={{
          products,
          isLoading,
          addProduct,
          updateProduct,
          removeProduct,
          getProductById,
          reloadProducts: loadProducts,
        }}
      >
        {children}
      </ProductAdminContext.Provider>
    );
  }
  
  export function useProductAdmin() {
    const context = useContext(ProductAdminContext);
    if (!context)
      throw new Error("useProductAdmin phải nằm trong ProductAdminProvider");
    return context;
  }
  