import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import CartProvider from "../provider/CartProvider";

const RootLayout = () => {

  return (
    <CartProvider>
      <div className="max-w-[1280px] mx-auto p-3 flex flex-col h-screen">
        <Header className="flex-1" />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </CartProvider>
  );
};

export default RootLayout;
