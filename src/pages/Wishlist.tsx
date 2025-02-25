import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const Wishlist = () => {
  const wishlistContext = useContext(WishlistContext);

  useEffect(() => {
    const loadWishlist = async () => {
      if (wishlistContext) {
        const response = await wishlistContext.getWishlist();
        wishlistContext.setWishlist(response.data.data);
      }
    };
    loadWishlist();
  }, []);

  const handleRemove = async (productId: number) => {
    if (!wishlistContext) return;

    try {
      await wishlistContext.removeFromWishlist(productId);
      const response = await wishlistContext.getWishlist();
      wishlistContext.setWishlist(response.data.data);
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (!wishlistContext?.wishlist.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
        <Link to="/products" className="text-blue-500 hover:text-blue-600">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistContext?.wishlist.map((item: any) => (
          <div key={item.id} className="border rounded-lg shadow-sm p-4">
            <div className="relative">
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-green-600 font-semibold mt-2">${item.price}</p>
              <Link
                to={`/productdetails/${item.id}/${item.category.name}`}
                className="mt-4 block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
