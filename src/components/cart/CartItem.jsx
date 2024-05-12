import { formatPrice } from "../../utils/format-helper";
import CartQuantityButton from "./CartQuantityButton";

const CartItem = ({
  productId,
  title,
  image,
  price,
  quantity,
  invalidStatus,
}) => {
  return (
    <div className="card card-side bg-base-100 flex flex-col sm:flex-row w-full">
      <figure className="relative">
        {invalidStatus && (
          <div
            className="absolute inset-0 bg-slate-50 opacity-75 w-full flex items-center justify-center
        font-extrabold text-slate-400"
          >
            {invalidStatus}
          </div>
        )}
        <img
          className="w-3/4 my-6 sm:my-3 aspect-square object-contain"
          src={image}
          alt={title}
        />
      </figure>
      <div className="card-body sm:w-96 py-6 px-4">
        <h2 className="card-title text-sm">{title}</h2>
        <p>{formatPrice(price)}</p>
        <div className="card-actions justify-end">
          {!invalidStatus && (
            <CartQuantityButton productId={productId} quantity={quantity} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
