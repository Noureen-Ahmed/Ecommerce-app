import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from "react-router-dom";

// Define types for the product and cart details
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

interface CartDetails {
  data: {
    products: CartItem[];
  };
}

export default function Cart() {
  // Destructure the context and check if it's available
  const context = useContext(CartContext);

  // If context is not available, handle gracefully
  if (!context) {
    return <div>Loading...</div>;
  }

  const { getCartItem, updateCartItem, removeCartItem } = context;

  const [cartDetails, setCartDetails] = useState<CartDetails | null>(null);

  // Function to fetch the cart details
  async function getCart() {
    const response = await getCartItem();
    setCartDetails(response.data);
  }

  // Function to remove an item from the cart
  async function removeItem(productId: number) {
    const response = await removeCartItem(productId);
    setCartDetails(response.data);
  }

  // Function to update the quantity of a product in the cart
  async function updateQuantity(productId: number, count: number) {
    const response = await updateCartItem(productId, count);
    setCartDetails(response.data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <div className="relative w-75 shadow-md sm:rounded-lg"></div>

      <table className="w-full my-5 mx-auto overflow text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.data?.products?.map((cartItem) => (
            <tr
              key={cartItem.product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={cartItem.product.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={cartItem.product.title}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {cartItem.product.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(cartItem.product.id, cartItem.count - 1)
                    }
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <span>{cartItem.count}</span>
                  </div>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem.product.id, cartItem.count + 1)
                    }
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {cartItem.product.price} EGP
              </td>
              <td className="px-6 py-4">
                <span
                  onClick={() => removeItem(cartItem.product.id)}
                  className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-6">
        <Link
          to="/checkout"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
