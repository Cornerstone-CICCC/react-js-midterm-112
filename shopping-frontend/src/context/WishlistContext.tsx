import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`wishlist_${user.id}`);
      setWishlistItems(saved ? JSON.parse(saved) : []);
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `wishlist_${user.id}`,
        JSON.stringify(wishlistItems)
      );
    }
  }, [wishlistItems, user]);

  const toggleWishlist = (product: WishlistItem) => {
    if (!user) return;

    setWishlistItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
