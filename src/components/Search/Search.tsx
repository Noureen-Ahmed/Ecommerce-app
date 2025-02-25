import React from "react";
import { useSearch } from "../../Context/SearchContext";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

// Fuzzy search helper function
const fuzzyMatch = (str: string, pattern: string): boolean => {
  pattern = pattern.toLowerCase();
  str = str.toLowerCase();

  let patternIdx = 0;
  let strIdx = 0;

  while (patternIdx < pattern.length && strIdx < str.length) {
    if (pattern[patternIdx] === str[strIdx]) {
      patternIdx++;
    }
    strIdx++;
  }

  return patternIdx === pattern.length;
};

export default function Search() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { data: productsData, isLoading } = useProducts();

  // Filter products based on search query
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery || !productsData?.data) return [];

    return productsData.data
      .filter(
        (product) =>
          fuzzyMatch(product.title, searchQuery) ||
          fuzzyMatch(product.category.name, searchQuery)
      )
      .slice(0, 10); // Limit to 10 results
  }, [searchQuery, productsData]);

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
          {isLoading ? (
            <div className="p-4 text-center">
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Loading...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="p-2">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/productdetails/${product.id}/${product.category.name}`}
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
