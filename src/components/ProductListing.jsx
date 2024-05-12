import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getProductListing } from "../api/products";

const ProductListing = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["productListing"],
    queryFn: getProductListing,
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 mt-3">
      {data?.map(({ id, title, price, image }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          price={price}
          image={image}
        />
      ))}
    </div>
  );
};

export default ProductListing;
