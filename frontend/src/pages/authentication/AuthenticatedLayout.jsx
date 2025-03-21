import { Outlet, useNavigate } from "react-router-dom";
import Navigationbar from "../../components/Navbar";
import { useGetSession } from "../../api/authentication";
import { useEffect } from "react";

export function AuthenticatedLayout() {
  const { data, isLoading, error } = useGetSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && data && !data.isAuthenticated) {
      navigate("/login");
    }
  }, [data]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && data.isAuthenticated && (
        <>
          <Navigationbar />
          <Outlet />
        </>
      )}
    </>
  );
}
