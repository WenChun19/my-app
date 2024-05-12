import { useCart } from "../../provider/CartProvider";
import CartItem from "./CartItem";

const AvailableCart = () => {
  const { getAvailableCartProducts, editCartProductStatus } = useCart();
  const availableCartProducts = getAvailableCartProducts();

  console.log(availableCartProducts);
  return (
    <>
      <h2 className="ml-3 font-semibold">Available Cart</h2>
      <div className="flex flex-col m-3 border-slate-300 border-2 p-4 rounded-lg shadow-lg space-y-3">
        {availableCartProducts?.map(
          ({ productId, title, image, price, quantity, selected }) => (
            <div key={productId} className="flex gap-1 flex-wrap">
              <input
                type="checkbox"
                checked={selected}
                className="checkbox-sm"
                onChange={() => editCartProductStatus(productId)}
              />
              <CartItem
                title={title}
                image={image}
                price={price}
                quantity={quantity}
                productId={productId}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AvailableCart;
