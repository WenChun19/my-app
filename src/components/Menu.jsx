import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { HiUserCircle } from "react-icons/hi2";

const Menu = () => {
  let location = useLocation();
  
  const { isLogin, setLogout } = useAuth();
  return !isLogin ? (
    <Link to="login">
      <HiUserCircle className="text-3xl" />
    </Link>
  ) : (
    <div className="dropdown dropdown-end" key={location?.key}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
        data-tip="hello master, click me for menus"
      >
        <div className="w-10 rounded-full ">
          <img alt="shop logo" src="/cutedoggie.png" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link to="/trading">Trading Card</Link>
        </li>
        <li>
          <Link to="/lucky-draw">Lucky Draw</Link>
        </li>
        <li>
          <Link to="/" onClick={setLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
