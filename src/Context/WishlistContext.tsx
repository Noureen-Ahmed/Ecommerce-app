import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface WishlistContextType {
  getWishlist: () => Promise<any>;
  addToWishlist: (productId: string) => Promise<any>;
  removeFromWishlist: (productId: string) => Promise<any>;
  wishlist: any[];
  setWishlist: React.Dispatch<React.SetStateAction<any[]>>;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const WishlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const headers = {
    token: localStorage.getItem("userToken") || "",
  };

  const [wishlist, setWishlist] = useState<any[]>([]);

  const getWishlist = async () => {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => response)
      .catch((error) => error);
  };

  const addToWishlist = async (productId: string) => {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  };

  const removeFromWishlist = async (productId: string) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  };

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await getWishlist();
        if (response.data?.data) {
          setWishlist(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    };

    if (localStorage.getItem("userToken")) {
      loadWishlist();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
