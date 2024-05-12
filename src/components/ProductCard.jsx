import { HiMiniShoppingCart } from "react-icons/hi2";
import { useCart } from "../provider/CartProvider";
import { formatPrice, getRelativeTime } from "../utils/format-helper";

const ProductCard = (props) => {
  const { title, price, image, date } = props;
  const { addCartProduct } = useCart();
  const relativeTime = getRelativeTime(date);
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
        <p>{formatPrice(price)}</p>
        <div className="card-actions justify-between pr-2 pt-2">
          <div
            className={`${
              relativeTime === "NEW"
                ? `badge badge-primary badge-lg text-sm`
                : `font-semibold text-xs`
            }`}
          >
            {relativeTime}
          </div>
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
