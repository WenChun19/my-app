import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <>
      <div className="max-w-[1280px] mx-auto p-3 flex flex-col h-screen">
        <Header className="flex-1" />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
