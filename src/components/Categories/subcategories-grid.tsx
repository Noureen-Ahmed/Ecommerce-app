import { useEffect, useState } from "react";

interface Subcategory {
  _id: string;
  name: string;
  category: string;
  slug: string;
}

interface SubcategoriesGridProps {
  categoryId: string;
}

export default function SubcategoriesGrid({
  categoryId,
}: SubcategoriesGridProps) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const data = await response.json();
        setSubcategories(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="h-20 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm p-2">{error}</div>;
  }

  if (subcategories.length === 0) {
    return (
      <div className="text-gray-500 text-sm p-2">No subcategories found</div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Subcategories:</h4>
      <div className="grid grid-cols-2 gap-2">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory._id}
            className="bg-white px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {subcategory.name}
          </div>
        ))}
      </div>
    </div>
  );
}
