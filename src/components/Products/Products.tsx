import React from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useProducts from "../../Hooks/useProducts";

const Products: React.FC = () => {
  const { data, isError, isLoading, error } = useProducts();

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

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data?.map((product) => (
          <div key={product._id} className="px-4">
            <div className="product py-4 bg-white rounded-lg shadow-md">
              <Link
                to={`/productdetails/${product._id}/${product.category.name}`}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="p-4">
                  <span className="block font-light text-green-600 mb-2">
                    {product.category?.name || product.category}
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
                <button className="w-full mt-2 py-2 bg-green-500 text-white rounded-b-lg hover:bg-green-600 transition-colors">
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
