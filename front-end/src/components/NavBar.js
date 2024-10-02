import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/state";
import SearchForm from "./SearchForm";
import profileHolder from "../assets/Profile-Photo-Place-Holder.png"; // Placeholder image

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAuth = useSelector((state) => Boolean(state.token));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/sign-in");
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-blue-500 fixed w-full z-10 top-0 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex gap-7 cursor-pointer">
          <p
            className="m-auto font-bold text-lg text-white"
            onClick={() => navigate("/home")}
          >
            SocialApp
          </p>
        {isAuth &&  <SearchForm />}
        </div>
        <div className="flex items-center space-x-4">
          {isAuth && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                aria-label="User options"
              >
                <img
                  src={
                    user.picturePath
                      ? `${process.env.REACT_APP_API_BASE_URL}/assets/${user.picturePath}`
                      : profileHolder
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={() => {
                      navigate(`/profile/${user.id}`);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
