import Navigation from "components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
