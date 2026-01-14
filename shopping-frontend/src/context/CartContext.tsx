import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useAuth } from "./AuthContext";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: number, decreaseOnly?: boolean) => void;
  totalPrice: number;
  totalCount: number;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = "http://localhost:3500/cart";

  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      if (user) {
        try {
          const response = await fetch(`${API_URL}?userId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setCartItems(data);
          }
        } catch (error) {
          console.error("Failed to load cart from DB:", error);
        }
      } else {
        const savedCart = localStorage.getItem("tech_market_cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
      setIsLoading(false);
    };

    loadCart();
  }, [user]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!isLoading && !user) {
      localStorage.setItem("tech_market_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user, isLoading]);

  const addToCart = async (product: any, quantity: number) => {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: quantity,
    };

    if (user) {
      try {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newItem, userId: user.id }),
        });
      } catch (error) {
        console.error("Failed to save to DB:", error);
      }
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = async (
    productId: number,
    decreaseOnly: boolean = false
  ) => {
    if (user) {
      try {
        await fetch(`${API_URL}/${productId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, decreaseOnly }),
        });
      } catch (error) {
        console.error("Failed to delete from DB:", error);
      }
    }

    setCartItems((prev) => {
      const target = prev.find((item) => item.id === productId);
      if (decreaseOnly && target && target.quantity > 1) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (!user) localStorage.removeItem("tech_market_cart");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalPrice,
        totalCount,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
