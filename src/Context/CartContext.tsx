import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  imageCover: string;
  price: number;
}

interface CartItem {
  product: Product;
  count: number;
}

interface CartContextType {
  getCartItem: () => Promise<any>;
  removeCartItem: (productId: number) => Promise<any>;
  updateCartItem: (productId: number, count: number) => Promise<any>;
  addToCart: (productId: number) => Promise<any>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const headers = {
    token: localStorage.getItem('userToken') || '',
  };

  const getCartItem = async () => {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers }).then(response => response).catch(error => error);
  };

  const removeCartItem = async (productId: number) => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers }).then(response => response).catch(error => error);
  };

  const updateCartItem = async (productId: number, count: number) => {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers }).then(response => response).catch(error => error);
  };

  const addToCart = async (productId: number) => {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers }).then(response => response).catch(error => error);
  };

  return (
    <CartContext.Provider value={{ getCartItem, removeCartItem, updateCartItem, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
