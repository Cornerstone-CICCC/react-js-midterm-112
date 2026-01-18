import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface CartItem {
  _id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  images: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQty: number) => void;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const fetchCart = async () => {
    if (!user?._id) {
      setCartItems([]);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3500/carts/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        const rawItems = Array.isArray(data) ? data : data.items || [];

        const cleaned = rawItems
          .map((item: any) => ({
            _id: item._id,
            productId: item.productId?._id || item.productId || "",
            title: item.productId?.title || "Premium Tech Item",
            price: Number(item.productId?.price) || 0,
            quantity: Number(item.quantity) || 1,
            images:
              Array.isArray(item.productId?.images) &&
              item.productId.images.length > 0
                ? item.productId.images[0]
                : item.productId?.images ||
                  "https://placehold.co/400x400?text=No+Image",
          }))
          .filter((item: CartItem) => item.productId !== "");
        setCartItems(cleaned);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user?._id]);

  const addToCart = async (product: any, quantity: number) => {
    if (!user?._id) return;
    try {
      await fetch(`http://localhost:3500/carts/increase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          quantity,
        }),
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!productId) return;
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    if (user?._id) {
      try {
        const res = await fetch(`http://localhost:3500/carts/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, productId }),
        });
        if (!res.ok) fetchCart();
      } catch (err) {
        fetchCart();
      }
    }
  };

  const updateQuantity = async (productId: string, newQty: number) => {
    if (newQty < 1 || !productId) return;
    const currentItem = cartItems.find((i) => i.productId === productId);
    if (!currentItem) return;

    const diff = newQty - currentItem.quantity;
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQty } : item
      )
    );

    if (user?._id) {
      try {
        await fetch(`http://localhost:3500/carts/increase`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, productId, quantity: diff }),
        });
      } catch (err) {
        fetchCart();
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart Error");
  return context;
};
