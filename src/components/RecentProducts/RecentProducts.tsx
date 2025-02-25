import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// Define the Product type if not already defined
interface Product {
  id: number;
  title: string;
  imageCover: string;
  price: number;
  category: {
    name: string;
  };
  ratingsAverage: number;
}

export default function RecentProducts() {
  // Safely access the CartContext
  const cartContext = useContext(CartContext);

  // Check if cartContext is undefined
  if (!cartContext) {
    throw new Error("CartContext is undefined, make sure CartContextProvider is wrapped around your app.");
  }

  const { addToCart } = cartContext;

  const addProduct = async (productId: number) => {
    try {
      const response = await addToCart(productId);
      if (response.data.status === "success") {
        toast.success("Product added to cart successfully", {
          duration: 1500,
          position: "top-center",
          className: "font-bold",
        });
      } else {
        toast.error("Error adding product to cart", {
          duration: 1500,
          position: "top-center",
          className: "font-bold",
        });
      }
    } catch (error) {
      toast.error("Error adding product to cart", {
        duration: 1500,
        position: "top-center",
        className: "font-bold",
      });
    }
  };

  // Fetching products
  const getProducts = async () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };

  const { data } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });

  return (
    <>
      <div className="row">
        {data?.map((product: Product) => (  
          <div key={product.id} className="w-1/4 px-4">
            <div key={product.id} className="product py-4">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img className="w-full" src={product.imageCover} alt={product.title} />
                <span className="block font-light text-green-600 mt-2">{product.category.name}</span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage} <i className="fas fa-star text-yellow-400"></i>
                  </span>
                </div>
              </Link>
              <button onClick={() => addProduct(product.id)} className="btn text-white bg-green-600 w-full">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
