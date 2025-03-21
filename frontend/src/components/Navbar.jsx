import { useGetSession } from "../api/authentication";
import LoggedInDropdown from "./LoggedInDropdown";
import { useNavigate } from "react-router-dom";

export function Navigationbar() {
  const { data } = useGetSession();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            {!data?.isAuthenticated && (
              <button
                onClick={() => navigate("/")}
                className="text-lg text-gray-700 hover:text-black pr-3"
              >
                Home
              </button>
            )}

            {data?.isAuthenticated && (
              <button
                onClick={() => navigate("/user-feed")}
                className="text-lg text-gray-700 hover:text-black px-3"
              >
                Feed
              </button>
            )}

            <button
              onClick={() => navigate("/text-analyse")}
              className="text-lg text-gray-700 hover:text-black px-3"
            >
              Text Analyse
            </button>

            {!data?.isAuthenticated && (
              <button
                onClick={() => navigate("/login")}
                className="text-lg text-gray-700 hover:text-black px-3"
              >
                Login
              </button>
            )}

            {!data?.isAuthenticated && (
              <button
                onClick={() => navigate("/new-account")}
                className="text-lg text-gray-700 hover:text-black px-3"
              >
                Signup
              </button>
            )}
            {data?.isAuthenticated && (
              <button
                onClick={() => navigate("/profile")}
                className="text-lg text-gray-700 hover:text-black px-3"
              >
                Profile
              </button>
            )}
          </div>
        </div>
        {data?.isAuthenticated && <LoggedInDropdown email={data.username} />}
      </div>
    </nav>
  );
}

export default Navigationbar;
