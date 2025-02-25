import ProductCard from "../components/ProductCard";
import { useWishlist } from "../hooks/useWishlist";
import LoadingSpinner from "../components/LoadingSpinner";

const Wishlist = () => {
  const { items, isLoading, isError, removeFromWishlist } = useWishlist();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading wishlist</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {items.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRemoveFromWishlist={() => removeFromWishlist(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
