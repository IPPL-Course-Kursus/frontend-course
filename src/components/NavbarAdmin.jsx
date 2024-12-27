import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5"; // Import the menu icon
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../redux/actions/authActions";

const NavbarAdmin = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();

  // Get token and profile from Redux store
  const { token } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.getMe.profile);

  // Fetch user profile if token exists
  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [token, dispatch]);

  const imgProfile = profile?.image;

  return (
    <div className="navbar bg-base-100 shadow-md shadow-slate-300 z-50">
      {/* Menu Button (Visible on Mobile) */}
      <div className="flex-none lg:hidden">
        <button
          className="btn btn-ghost btn-circle text-2xl text-primary focus:outline-none"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Open Sidebar"
        >
          <IoMenu />
        </button>
      </div>

      {/* Center: "Hi, Admin!" */}
      <div className="flex-1 flex justify-center lg:justify-start">
        <h1 className="text-2xl font-bold text-primary">Hi, Admin!</h1>
      </div>

      {/* Right side with profile icon */}
      <div className="flex-none gap-6 lg:pr-4 ml-auto">
        {token ? (
          <div className="flex items-center px-6 z-10">
            {/* Profile Icon */}
            <div className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-primary">
                <img alt="Profile" src={imgProfile} className="rounded-full object-cover" />
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn bg-primary text-white hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:mr-10">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

NavbarAdmin.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
};

export default NavbarAdmin;
