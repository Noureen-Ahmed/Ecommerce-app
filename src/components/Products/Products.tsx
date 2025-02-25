import React from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import useProducts from '../../Hooks/useProducts'; // Adjust the path to where your hook is

// Define the Product type based on the response structure
interface Product {
  id: number;
  imageCover: string;
  title: string;
  category: { name: string };
  price: number;
  ratingsAverage: number;
}

const Products: React.FC = () => {
  // Destructure data, isLoading, isError, and error from useProducts hook
  const { data, isError, isLoading, error } = useProducts();

  // Loading state
  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center">
        <ClipLoader color="green" aria-label="Loading Spinner" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="py-8 w-full flex justify-center">
        <h3>{(error as Error).message}</h3>
      </div>
    );
  }

  // Ensure we have product data and map over it correctly
  return (
    <div className="row">
      {/* Safely access data using optional chaining */}
      {data?.data?.map((product: Product) => (
        <div key={product.id} className="w-1/4 px-4">
          <div className="product py-4">
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img
                className="w-full"
                src={product.imageCover}
                alt={product.title}
              />
              <span className="block font-light text-green-600 mt-2">
                {product.category.name}
              </span>
              <h3 className="text-lg font-normal text-gray-800 mb-4">
                {product.title.split(' ').slice(0, 2).join(' ')}
              </h3>
              <div className="flex justify-between items-center">
                <span>{product.price} EGP</span>
                <span>
                  {product.ratingsAverage}{' '}
                  <i className="fas fa-star text-yellow-400"></i>
                </span>
              </div>
              <button className="btn">Add to cart</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
