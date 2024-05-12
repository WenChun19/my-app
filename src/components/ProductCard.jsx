import { HiMiniShoppingCart } from "react-icons/hi2";
import { useCart } from "../provider/CartProvider";

const ProductCard = (props) => {
  const { title, price, image } = props;
  const { addCartProduct } = useCart();
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl col-span-1">
      <figure>
        <img
          src={image}
          className={"w-3/4 aspect-square object-contain mt-4"}
          alt={title}
        />
      </figure>
      <div className="card-body mt-3">
        <h3 className="card-title text-base">{title}</h3>
        <p>{price}</p>
        <div className="card-actions justify-end p-3">
          <HiMiniShoppingCart
            className="text-lg cursor-pointer"
            onClick={() => addCartProduct(props)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
