import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";
import { useCart } from "../../provider/CartProvider";

const CartQuantityButton = ({ productId, quantity }) => {
  const { addItemQuantity, subtractItemQuantity, editItemQuantity } = useCart();

  return (
    <div className="flex border-2 rounded-md">
      <div
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-l-md flex items-center"
        role="button"
      >
        <HiMiniMinus onClick={() => subtractItemQuantity(productId)} />
      </div>
      <input
        type="number"
        className="w-10 text-center"
        min={0}
        value={quantity}
        onChange={editItemQuantity(productId)}
      />
      <div
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-r-md flex items-center"
        role="button"
      >
        <HiMiniPlus onClick={() => addItemQuantity(productId)} />
      </div>
    </div>
  );
};

export default CartQuantityButton;
