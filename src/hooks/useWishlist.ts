import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWishlistItems,
  addWishlistItem,
  removeWishlistItem,
} from "../services/wishlistService";

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const wishlistKey = ["wishlist"];

  const {
    data: items = [],
    isLoading: isLoadingItems,
    error: itemsError,
  } = useQuery({
    queryKey: wishlistKey,
    queryFn: getWishlistItems,
    enabled: !!localStorage.getItem("userToken"), // Only fetch if user is logged in
  });

  const addToWishlist = useMutation({
    mutationFn: (productId: string) => addWishlistItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKey });
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: (productId: string) => removeWishlistItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKey });
    },
  });

  return {
    items,
    addToWishlist: addToWishlist.mutate,
    removeFromWishlist: removeFromWishlist.mutate,
    isLoading:
      isLoadingItems || addToWishlist.isPending || removeFromWishlist.isPending,
    error: itemsError || addToWishlist.error || removeFromWishlist.error,
    isError:
      !!itemsError || addToWishlist.isError || removeFromWishlist.isError,
  };
};
