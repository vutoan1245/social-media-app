import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/state";
import { LogoutIcon } from "../assets/icons";

const NavBar = () => {
  const isAuth = useSelector((state) => Boolean(state.token));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/sign-in");
  };

  return (
    <nav className="bg-blue-500 fixed w-full z-10 top-0 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div
          className="text-white text-lg font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          SocialApp
        </div>
        <div className="flex items-center space-x-4">
          {isAuth && (
            <button
              onClick={handleLogout}
              className="text-white p-2 rounded-full hover:bg-red-600 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              aria-label="Log out"
            >
              <LogoutIcon />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
