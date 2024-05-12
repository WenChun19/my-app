import { useCart } from "../../provider/CartProvider";
import CartItem from "./CartItem";

const ExpiredCart = () => {
  const { getExpiredCartProducts, clearCartProducts } = useCart();
  const expiredProducts = getExpiredCartProducts();

  if (expiredProducts?.length == 0) {
    return <></>;
  }
  return (
    <>
      <div className="ml-3 mt-7 flex items-center gap-4">
        <h2 className=" font-semibold">Expired Cart</h2>
        <div
          className="btn btn-primary btn-sm"
          onClick={() => clearCartProducts(expiredProducts)}
        >
          Clear
        </div>
      </div>
      <div className="flex flex-col m-3 border-slate-300 border-2 p-4 rounded-lg shadow-lg space-y-3">
        {expiredProducts?.map(
          ({ productId, title, image, price, quantity }) => (
            <div key={productId} className="flex gap-1 flex-wrap">
              <CartItem
                title={title}
                image={image}
                price={price}
                quantity={quantity}
                productId={productId}
                invalidStatus="EXPIRED"
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ExpiredCart;
