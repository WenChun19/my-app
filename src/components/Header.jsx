import { Link } from "react-router-dom";
import Menu from "./Menu";
import CartDrawer from "./cart/CartDrawer";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost pl-0 text-xl w-14">
          <img src="/logo.png" className="object-contain aspect-square" />
        </Link>
        <p className="text-sm font-medium">Pet Dream</p>
      </div>
      <div className="flex-none">
        <CartDrawer />
        <Menu />
      </div>
    </div>
  );
};

export default Header;
