import CartItem from "./CartItem";

const AvailableCart = () => {
  return (
    <div className="flex flex-col m-3 border-slate-300 border-2 p-4 rounded-lg shadow-lg">
      <div className="flex gap-3 flex-wrap">
        <input type="checkbox" defaultChecked className="checkbox" />
        <CartItem />
      </div>
    </div>
  );
};

export default AvailableCart;
