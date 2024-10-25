import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import default_image from "../assets/profil.png";

const Navbar = () => {
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

    return (
        <div className="navbar bg-base-100 shadow-md shadow-slate-300 z-50">
            <div className="flex-none">
                <a
                    className="btn btn-ghost lg:ml-10 text-xl text-primary"
                    href="/"
                >
                    EtamCourse
                </a>
            </div>

            <div className="flex-none gap-2 flex-grow lg:relative justify-center z-50">
                <div className="dropdown text-primary">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                        onClick={() => toggleDropdown("menu")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    {activeDropdown === "menu" && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
                        >
                            <Link to="/topik-kelas">
                            <li>
                                <span className="justify-between font-medium text-primary  hover:text-primary">Katalog Kelas</span>
                            </li>
                            </Link>
                            <Link to="/mycourse">
                            <li>
                                <span className="justify-between font-medium text-primary  hover:text-primary">Kelas Saya</span>
                            </li>
                            </Link>
                        </ul>
                    )}
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="text-xl text-primary">
                        <details
                            open={activeDropdown === "course"}
                            onClick={() => toggleDropdown("course")}
                            className="z-50 lg:pr-10 "
                        >
                            <summary className=" hover:bg-primary hover:text-white  ">
                                Course
                            </summary>
                            <ul className="menu menu-sm ">
                                <li>
                                    <Link to="/topik-kelas">
                                    <span className="whitespace-nowrap font-medium text-primary cursor-pointer  hover:text-primary">
                                        Katalog Kelas
                                    </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/mycourse">
                                    <span className="whitespace-nowrap font-medium text-primary cursor-pointer  hover:text-primary">
                                        Kelas Saya
                                    </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>

            <div className="flex-none gap-6 lg:pr-4">
                {token ? (
                    <div className="dropdown dropdown-end z-50">
                        <div
                            tabIndex={0}
                            role="button"
                            open={activeDropdown === "profile"}
                            className="btn btn-ghost btn-circle avatar hover"
                            onClick={() => toggleDropdown("profile")}
                        >
                            <div className="w-10 rounded-full">
                                <img alt="Profile" src={imgProfile} />
                            </div>
                        </div>
                        {activeDropdown === "profile" && (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 right-0 w-40 p-2 shadow"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Link to="/profile">
                                    <li>
                                        <span className="justify-between font-medium text-primary hover:bg-primary hover:text-white">
                                            Profile
                                        </span>
                                    </li>
                                </Link>

                                <li>
                                    <button className="justify-between font-medium text-primary hover:bg-primary hover:text-white ">
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
