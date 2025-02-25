import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Define types for product and related products
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  ratingsAverage: number;
  category: {
    name: string;
  };
  imageCover: string;
  images: string[];
}

export default function ProductDetails() {
  const { id, category } = useParams<{ id: string; category: string }>();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  if (!cartContext)
    throw new Error("CartContext must be used within CartProvider");
  if (!wishlistContext)
    throw new Error("WishlistContext must be used within WishlistProvider");

  const { addToCart } = cartContext;
  const { wishlist, addToWishlist, removeFromWishlist } = wishlistContext;

  // Settings for the slider component
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Fetch product details based on product ID
  const getProductDetails = (id: string) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((error) => console.error(error));
  };

  // Fetch related products based on category
  const getRelatedProducts = (category: string) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        const allProducts = data.data;
        const relatedProduct = allProducts.filter(
          (product: Product) => product.category.name === category
        );
        setRelatedProducts(relatedProduct);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (id && category) {
      getProductDetails(id);
      getRelatedProducts(category);
    }
  }, [id, category]);

  const handleAddToCart = async () => {
    if (!productDetails?.id) return;

    setIsAddingToCart(true);
    try {
      const response = await addToCart(productDetails.id);
      if (response.data?.status === "success") {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      toast.error("Error adding product to cart");
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isInWishlist = wishlist.some((item) => item.id === productDetails?.id);

  const handleWishlistToggle = async () => {
    if (!productDetails) return;

    try {
      if (isInWishlist) {
        await removeFromWishlist(productDetails.id);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(productDetails.id);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="w-1/3">
          <Slider {...settings}>
            {productDetails?.images.map((src, index) => (
              <img key={index} src={src} alt={productDetails?.title} />
            ))}
          </Slider>
        </div>
        <div className="w-2/3 p-6">
          <h1 className="text-lg font-normal text-gray-950">
            {productDetails?.title}
          </h1>
          <p className="text-gray-600 mt-4 font-light">
            {productDetails?.description}
          </p>
          <div className="flex justify-between items-center my-4">
            <span>{productDetails?.price} EGP</span>
            <span>
              {productDetails?.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-400"></i>{" "}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              className={`btn ${
                isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Adding...
                </>
              ) : (
                "Add to cart"
              )}
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                isInWishlist
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-1/6">
            <div className="product py-4">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block font-light text-green-600 mt-2">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-400"></i>{" "}
                  </span>
                </div>
              </Link>
              <button className="btn cursor-pointer mt-2">add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
