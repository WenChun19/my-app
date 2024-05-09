import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <header>
        <nav>here</nav>
      </header>
      <Outlet />
    </>
  );
};

export default RootLayout;
