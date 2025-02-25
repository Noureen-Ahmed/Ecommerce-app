import React, { useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../Context/SearchContext";
import { Link } from "react-router-dom";

export default function Search() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
  } = useSearch();

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          // Fixed API endpoint
          const response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products`,
            {
              params: {
                sort: "-createdAt",
                limit: 10,
                "title[regex]": searchQuery,
              },
            }
          );

          // Check if response.data exists and has products
          if (response.data && response.data.data) {
            setSearchResults(response.data.data);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceSearch = setTimeout(searchProducts, 500); // Increased debounce time
    return () => clearTimeout(debounceSearch);
  }, [searchQuery, setSearchResults, setIsSearching]);

  return (
    <div className="relative w-full max-w-xl mx-auto px-4 py-2">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
          <i className="fas fa-search"></i>
        </span>
      </div>

      {searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((product: any) => (
                <Link
                  key={product._id}
                  to={`/productdetails/${product._id}/${product.category}`}
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-2">
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-gray-600">
                      ${product.price}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
