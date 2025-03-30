import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getPaginatedProducts } from "../api/productApi";

// ------------------ Kiểu dữ liệu ------------------

type Image = {
  id: number;
  imageUrl: string;
  altText: string;
  isThumbnail: boolean;
  displayOrder: number;
};

type SpecificationItem = {
  name: string;
  value: string;
  displayOrder: number;
};

type SpecificationGroups = {
  [group: string]: SpecificationItem[];
};

export type Product = {
  id: number;
  skuProduct: string;
  name: string;
  slug: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  stockQuantity: number;
  soldQuantity: number;
  wattage: string;
  categoryId: number;
  images: Image[];
  specificationGroups: SpecificationGroups;
};

interface ProductContextType {
  productList: Product[];
  nextPage: () => void;
  getProductById: (id: number) => Product | null;
  isMore: boolean;
  superSaleList: Product[]
  isLoading: boolean

}

// ------------------ Context & Provider ------------------

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);

  // Gọi khi load lần đầu
  useEffect(() => {
    resetProducts();
  }, []);


  // Hàm gọi API và thêm sản phẩm mới nếu chưa trùng
  const fetchProducts = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const response = await getPaginatedProducts(pageNumber, 4);
      const newProducts = response.data.content;

      setProductList((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNew: Product[] = newProducts.filter(
          (p: Product) => !existingIds.has(p.id)
        );
        return [...prev, ...uniqueNew];
      });

      setTotalPages(response.data.totalPages);
      setIsMore(pageNumber + 1 >= response.data.totalPages); // ✅ Chính xác hơn
    } catch (err) {
      console.error("❌ Lỗi khi fetch product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Hàm Next Page
  const nextPage = async () => {
    const next = page + 1;
    if (next < totalPages) {
      setPage(next);
      await fetchProducts(next);
    }
  };

  // ✅ Reset lại từ đầu (thường dùng khi lọc lại danh mục)
  const resetProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getPaginatedProducts(0, 4);
      setProductList(response.data.content);
      setPage(0);
      setTotalPages(response.data.totalPages);
      setIsMore(false);
    } catch (err) {
      console.error("❌ Lỗi khi reset product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Tìm sản phẩm theo ID
  const getProductById = useCallback((id: number): Product | null => {
    return productList.find((p) => p.id === id) || null;
  }, [productList]);

  const superSaleList = productList.filter((product) => {
    if (!product.oldPrice || !product.newPrice || product.oldPrice === 0)
      return false;
    const discount = ((product.oldPrice - product.newPrice) / product.oldPrice) * 100;
    return discount > 15;
  });

  return (
    <ProductContext.Provider
      value={{
        productList,
        isMore,
        nextPage,
        getProductById,
        superSaleList,
        isLoading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// ------------------ Hook để dùng ------------------

export function useProductDetailContext() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductDetailContext phải nằm trong ProductProvider");
  return context;
}
