import CartQuantityButton from "./CartQuantityButton";

const CartItem = ({ productId, title, image, price, quantity }) => {
  return (
    <div className="card card-side bg-base-100 flex flex-col sm:flex-row w-full">
      <figure>
        <img
          className="w-3/4 my-6 sm:my-3 aspect-square object-contain"
          src={image}
          alt={title}
        />
      </figure>
      <div className="card-body sm:w-96 py-6 px-4">
        <h2 className="card-title text-sm">{title}</h2>
        <p>{price}</p>
        <div className="card-actions justify-end">
          <CartQuantityButton productId={productId} quantity={quantity} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
