import { useCart } from "../../provider/CartProvider";
import CartItem from "./CartItem";

const AvailableCart = () => {
  const { getAvailableCartProducts } = useCart();
  const availableCartProducts = getAvailableCartProducts();

  // console.log(availableCartProducts);
  return (
    <div className="flex flex-col m-3 border-slate-300 border-2 p-4 rounded-lg shadow-lg space-y-3">
      {availableCartProducts?.map(
        ({ productId, title, image, price, quantity }) => (
          <div key={productId} className="flex gap-1 flex-wrap">
            <input type="checkbox" defaultChecked className="checkbox-sm" />
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
  );
};

export default AvailableCart;
