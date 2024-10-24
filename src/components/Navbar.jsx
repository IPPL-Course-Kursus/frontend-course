import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import default_image from "../assets/profil.png";
import { logout } from "../redux/actions/authActions";
import { FiBookOpen, FiLayers, FiLogOut, FiMenu, FiUser } from "react-icons/fi"; // Import React Icons

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Ambil token dan profile dari Redux store
  const { token } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.getMe.profile);

  // Gambar profil default atau dari user
  const imgProfile = profile?.image || default_image;

  // State untuk menentukan dropdown mana yang sedang terbuka
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Fungsi untuk mengelola state dropdown
  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };
  const handleLogout = () => {
    dispatch(logout()); // Dispatch action logout
    navigate("/login"); // Arahkan pengguna ke halaman login
  };

  return (
    <div className="navbar bg-base-100 shadow-md shadow-slate-300 z-50">
      <div className="flex-none">
        <a className="btn btn-ghost lg:ml-10 text-xl text-primary" href="/">
          EtamCourse
        </a>
      </div>
      <div className="flex-none gap-2 flex-grow lg:relative flex items-center justify-end z-50">
        <div className="dropdown text-primary relative z-50 ml-auto">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden flex items-center text-lg text-primary rounded-lg px-4 py-2 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
            onClick={() => toggleDropdown("menu")}
          >
            <FiMenu className="h-6 w-6 mr-2 transition-colors duration-300 ease-in-out " />
            {/* <span className="transition-colors duration-300 ease-in-out">Menu</span> */}
          </div>

          {activeDropdown === "menu" && (
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-lg shadow-lg mt-3 w-48 right-0 p-3 z-50 transform transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <li className="w-full">
                <Link
                  to="/topik-kelas"
                  className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out w-full"
                >
                  <FiBookOpen className="h-6 w-6 mr-3 text-red-600" />
                  Katalog Kelas
                </Link>
              </li>

              <li className="w-full">
                <Link
                  to="/mycourse"
                  className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out w-full"
                >
                  <FiLayers className="h-6 w-6 mr-3 text-red-600" />
                  Kelas Saya
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="dropdown dropdown-end px-6 z-50">
          <div
            tabIndex={0}
            role="button"
            open={activeDropdown === "course"}
            className="btn btn-ghost flex items-center text-lg text-primary rounded-lg px-4 py-2 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
            onClick={() => toggleDropdown("course")}
          >
            <FiBookOpen className="h-6 w-6 mr-2 transition-colors duration-300 ease-in-out" />
            <span className="transition-colors duration-300 ease-in-out">Course</span>
          </div>

          {activeDropdown === "course" && (
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-lg shadow-lg mt-3 w-48 right-0 p-3 z-50 transform transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <li className="w-full">
                <Link
                  to="/topik-kelas"
                  className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out w-full"
                >
                  <FiBookOpen className="h-6 w-6 mr-3 text-red-600" />
                  Katalog Kelas
                </Link>
              </li>

              <li className="w-full">
                <Link
                  to="/mycourse"
                  className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out w-full"
                >
                  <FiLayers className="h-6 w-6 mr-3 text-red-600" />
                  Kelas Saya
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="flex-none gap-6 lg:pr-4 ">
        {token ? (
          <div className="dropdown dropdown-end px-6 z-50">
            {/* Profile Image Button */}
            <div
              tabIndex={0}
              role="button"
              open={activeDropdown === "profile"}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => toggleDropdown("profile")}
            >
              <div className="w-10 rounded-full border-2 border-primary">
                <img alt="Profile" src={imgProfile} className="rounded-full object-cover" />
              </div>
            </div>

            {/* Dropdown Menu */}
            {activeDropdown === "profile" && (
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white rounded-lg shadow-lg mt-3 w-48 right-0 p-3 z-50 transform transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Profile Link */}
                <Link to="/profile">
                  <li className="w-full">
                    <span className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out w-full">
                      <FiUser className="h-6 w-6 mr-3 text-red-600" /> {/* Profile Icon */}
                      Profile
                    </span>
                  </li>
                </Link>

                {/* Logout Button */}
                <li className="w-full">
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-3 px-4 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white rounded-lg transition-all duration-300 ease-in-out w-full"
                  >
                    <FiLogOut className="h-6 w-6 mr-3 text-red-600" /> {/* Logout Icon */}
                    Logout
                  </button>
                </li>
              </ul>
            )}
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

export default Navbar;
