import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/authentication";

const LoggedInDropdown = ({ email }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleProfileClick = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleDropdown} className="px-4 py-2">
        Eingeloggt als {email}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 border rounded-md bg-white shadow-md">
          <div className="py-1">
            <a
              href="#"
              onClick={handleProfileClick}
              className="block px-4 py-2 text-sm"
            >
              Mein Profil
            </a>
            <a
              href="#"
              onClick={handleLogoutClick}
              className="block px-4 py-2 text-sm"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInDropdown;
