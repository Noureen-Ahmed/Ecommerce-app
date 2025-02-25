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
          const response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products/`,
            { params: { keyword: searchQuery } }
          );
          setSearchResults(response.data.data);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    };

    const debounceSearch = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  return (
    <div className="relative w-full max-w-xl mx-auto px-4 py-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      {searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((product: any) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
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
