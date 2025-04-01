import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "../pages/gio-hang/ShoppingCart";
import { useCartLocalStorage } from "../hook/useCartLocalStorage";


type ProductContextProps = {
  children : ReactNode;
}
type ProductCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
}
type CartItem = {
  id: number;
  quantity: number;
  //idDetail: number;
}


const ProductCartContext = createContext({} as ProductCartContext);
export function useShoppingCart() {
  return useContext(ProductCartContext);
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export function ProductContext({ children }:ProductContextProps) {
  const [cartItems,setCartItems] = useCartLocalStorage<CartItem[]>("shopping-cart",[]);
  const [isOpen,setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    const guestUuid = localStorage.getItem("guest-uuid");
    if (!guestUuid) return;
  
    const syncCartToServer = () => {
      const rawCartItems = JSON.parse(localStorage.getItem("shopping-cart") || "[]");
  
      // Kiểm tra dữ liệu hợp lệ
      if (!Array.isArray(rawCartItems) || rawCartItems.length === 0) return;
  
      // Chuẩn hoá dữ liệu cho backend
      const formattedCartItems = rawCartItems.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
      }));
  
      fetch(`${API_BASE_URL}/guest/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // can trung ten trong backend uuidToken items
          uuidToken: guestUuid,
          items: formattedCartItems,
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        })
        .then(() => console.log("✅ Đồng bộ giỏ hàng"))
        .catch(err => console.error("❌ Đồng bộ thất bại", err));
    };
  
    const intervalId = setInterval(syncCartToServer, 1000 * 60 * 2); // mỗi 2 phút
  
    return () => clearInterval(intervalId); // clear nếu component unmount
  }, []);


  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems(currItem => {
      if(currItem.find((item) => item.id === id) == null) {
        return [...currItem, {id, quantity: 1}];
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
    }
    )
  }
  function decreaseItemQuantity(id: number) {
    setCartItems(currItem => {
      if(currItem.find((item) => item.id === id)?.quantity == 1 ) {
        return currItem.filter((item) => item.id !== id);
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    }
    )
  }

  function removeItem(id: number) {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems); 
  }
  function clearCart() {
    setCartItems([]);
  }
  
  return (
    <>
    <ProductCartContext.Provider value={{
      getItemQuantity,
      increaseItemQuantity,
      decreaseItemQuantity,
      removeItem,
      clearCart,
      cartQuantity,
      cartItems,
      openCart,
      closeCart
    }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ProductCartContext.Provider>
    </>
  );
}

// Removed custom useState function
