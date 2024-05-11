import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";

const CartQuantityButton = () => {
  return (
    <div className="flex border-2 rounded-md">
      <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-l-md flex items-center" role="button">
        <HiMiniMinus />
      </div>
      <input type="number" className="w-10 text-center" min={0} />
      <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-r-md flex items-center" role="button">
        <HiMiniPlus />
      </div>
    </div>
  );
};

export default CartQuantityButton;
