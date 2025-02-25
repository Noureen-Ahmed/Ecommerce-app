import { useEffect, useState } from "react";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
  };
  data: Brand[];
}

export default function BrandsGrid() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch brands");
        }
        const data: ApiResponse = await response.json();
        setBrands(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const openModal = (brand: Brand) => {
    setSelectedBrand(brand);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedBrand(null);
    // Restore scrolling when modal is closed
    document.body.style.overflow = "unset";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
          All Brands
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(brand)}
            >
              <img
                src={brand.image || "/placeholder.svg"}
                alt={brand.name}
                className="h-24 w-auto object-contain mb-4"
              />
              <h2 className="text-gray-800 text-center font-medium">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Modal content */}
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                {selectedBrand.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedBrand.slug}</p>
              <img
                src={selectedBrand.image || "/placeholder.svg"}
                alt={selectedBrand.name}
                className="h-32 w-auto object-contain mb-4"
              />
              <div className="text-sm text-gray-500 mt-4">
                <p>
                  Created:{" "}
                  {new Date(selectedBrand.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated:{" "}
                  {new Date(selectedBrand.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
