import { useEffect, useState } from "react";
import SubcategoriesGrid from "./subcategories-grid";

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {categories.map((category) => (
          <div key={category._id} className="space-y-4">
            <div
              onClick={() => handleCategoryClick(category._id)}
              className={`group relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer hover:shadow-lg ${
                selectedCategory === category._id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end">
                  <h3 className="w-full text-center text-white text-xl font-semibold p-4 bg-black/60">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
            {selectedCategory === category._id && (
              <div className="animate-fadeIn">
                <SubcategoriesGrid categoryId={category._id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
