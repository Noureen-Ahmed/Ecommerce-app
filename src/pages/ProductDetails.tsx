import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { RootState } from "../store/store";
import { FaHeart } from "react-icons/fa";

// ...existing code...

const ProductDetails = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  // ...existing code...

  const isInWishlist =
    product && wishlistItems.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    if (product) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    }
  };

  return (
    <div>
      {/* ...existing code... */}
      <div className="flex gap-4 items-center">
        {/* ...existing add to cart button... */}
        <button
          onClick={handleWishlistClick}
          className={`p-3 rounded-full border ${
            isInWishlist
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-400 border-gray-300"
          }`}
        ></button>
        <FaHeart />
      </div>
      {/* ...existing code... */}
    </div>
  );
};
