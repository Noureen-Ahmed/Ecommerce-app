import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category:
    | {
        name: string;
      }
    | string;
  ratingsAverage: number;
}

interface ProductsResponse {
  data: Product[];
}

export default function useProducts() {
  const getProducts = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return data;
  };

  return useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
