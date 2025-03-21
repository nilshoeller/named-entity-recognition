import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Navigationbar from "../../components/Navbar";

export function UnauthenticatedLayout() {
  return (
    <>
      <Navigationbar />
      <Outlet />
      <Footer />
    </>
  );
}
