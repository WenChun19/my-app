import { HiMiniXMark, HiShoppingCart } from "react-icons/hi2";
import { useCart } from "../../provider/CartProvider";
import { formatPrice } from "../../utils/format-helper";
import AvailableCart from "./AvailableCart";
import ExpiredCart from "./ExpiredCart";

const CartDrawer = () => {
  const { getTotalCartQuantity, calculateTotalCartPrices } = useCart();
  const quantity = getTotalCartQuantity();
  const totalCartPrices = calculateTotalCartPrices();
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          role="button"
          className="btn btn-ghost btn-circle"
        >
          <div className="indicator">
            <HiShoppingCart className="text-xl"/>
            {quantity > 0 && (
              <span className="badge badge-sm indicator-item">{quantity}</span>
            )}
          </div>
        </label>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" w-screen md:max-w-screen-sm min-h-full bg-base-200 text-base-content flex flex-col">
          <div className="p-4 sm:p-8 flex-grow">
            <div className="flex justify-end items-center mr-3">
              <label htmlFor="my-drawer-4" className="cursor-pointer">
                <HiMiniXMark />
              </label>
            </div>
            <AvailableCart />
            <ExpiredCart />
          </div>
          <div className="w-full h-14 border-2 border-slate-300 shadow-lg flex justify-end">
            <div className="w-3/4 sm:w-1/2">
              <div className="flex h-full">
                <div className="flex flex-col mr-16 ">
                  <p className="mt-1">Total</p>
                  <p className="text-xs font-bold">
                    {formatPrice(totalCartPrices)}
                  </p>
                </div>
                <div
                  className="flex-grow bg-cyan-800 flex items-center justify-center text-md font-normal text-slate-200
                hover:bg-cyan-700 "
                  role="button"
                >
                  CHECKOUT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
