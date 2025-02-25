import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addToWishlist, removeFromWishlist } from "../pages/Wishlist";
import { addToCart } from "../store/cartSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const product = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  const isInWishlist = wishlist.some((item: any) => item.id === product?.id);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="product-details">
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <div className="product-actions flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          className="bg-black text-white py-2 px-4 rounded-md hover:opacity-80"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
