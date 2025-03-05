import { createContext, ReactNode, useContext, useState } from "react";
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


export function ProductContext({ children }:ProductContextProps) {
  const [cartItems,setCartItems] = useCartLocalStorage<CartItem[]>("shopping-cart",[]);
  const [isOpen,setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);


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
