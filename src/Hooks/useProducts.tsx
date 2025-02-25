import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

// Define types for product and API response
interface Product {
  id: number;
  title: string;
  price: number;
  imageCover: string;
  category: { name: string }; // Nested category inside product
  ratingsAverage: number;
}

// Defining the structure of the response from the API
interface ProductsData {
  data: Product[]; // The API returns an array of products inside 'data'
}

export default function useProducts() {
  // Function to fetch products from the API
  const getProducts = async (): Promise<ProductsData> => {
    const response = await axios.get<ProductsData>('https://ecommerce.routemisr.com/api/v1/products'); // API endpoint for products
    return response.data; // We return only the 'data' part of the response
  };

  // Use React Query to manage the fetching and state of the products
  const responseObject = useQuery<ProductsData>({
    queryKey: ["recentProducts"], // This is a unique key for the query
    queryFn: getProducts, // The function that fetches the data
  });

  return responseObject; // Return the result from React Query (loading, error, data, etc.)
}
