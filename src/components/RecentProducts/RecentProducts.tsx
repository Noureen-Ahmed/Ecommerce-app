import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useProducts from "../../Hooks/useProducts";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const Products: React.FC = () => {
  const { data, isError, isLoading, error } = useProducts();
  const wishlistContext = useContext(WishlistContext);
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center">
        <ClipLoader color="green" aria-label="Loading Spinner" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center">
        <h3>{(error as Error).message}</h3>
      </div>
    );
  }

  const handleWishlistToggle = async (productId: string) => {
    if (!wishlistContext) return;

    setLoadingItems((prev) => new Set(prev.add(productId)));
    try {
      const isInWishlist = wishlistContext.wishlist.some(
        (item) => item.id === productId || item._id === productId
      );
      if (isInWishlist) {
        await wishlistContext.removeFromWishlist(productId);
        toast.success("Removed from wishlist");
      } else {
        await wishlistContext.addToWishlist(productId);
        toast.success("Added to wishlist");
      }
      // Refresh wishlist
      const response = await wishlistContext.getWishlist();
      wishlistContext.setWishlist(response.data.data);
    } catch (error) {
      toast.error("Failed to update wishlist");
    } finally {
      setLoadingItems((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistContext?.wishlist.some(
      (item: any) => item.id === productId || item._id === productId
    );
  };

  const getCategoryName = (category: string | { name: string }) => {
    return typeof category === "object" ? category.name : category;
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data?.map((product) => (
          <div key={product._id} className="px-4">
            <div className="product py-4 bg-white rounded-lg shadow-md relative">
              <button
                onClick={() => handleWishlistToggle(product._id)}
                className={`absolute top-2 right-2 p-2 rounded-full z-10 ${
                  isInWishlist(product._id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-400 hover:text-red-500"
                } shadow-md transition-colors`}
                disabled={loadingItems.has(product._id)}
              >
                {isInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />}
              </button>
              <Link
                to={`/productdetails/${product._id}/${getCategoryName(
                  product.category
                )}`}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="p-4">
                  <span className="block font-light text-green-600 mb-2">
                    {getCategoryName(product.category)}
                  </span>
                  <h3 className="text-lg font-normal text-gray-800 mb-2">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      {product.price} EGP
                    </span>
                    <span>
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </div>
                <button className="w-full mt-2 py-2 bg-green-500 text-white rounded-b-lg hover:bg-green-600 transition-colors cursor-pointer">
                  Add to cart
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
