// import { IoIosSearch } from "react-icons/io";
// import imgProfile from "../assets/profil.png";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// // import { logout } from "../redux/slices/authSlice"; // Import logout action

// const Navbar = () => {
//   // const navigate = useNavigate();
//   // const dispatch = useDispatch();

//   // Ambil token dari Redux store untuk mengecek status login
//   const { token } = useSelector((state) => state.auth);

//   // Fungsi logout
//   // const handleLogout = () => {
//   //     dispatch(logout());
//   //     navigate("/");
//   // };

//   return (
//     <div className="navbar bg-base-100">
//       <div className="flex-none">
//         <a className="btn btn-ghost lg:pl-10 text-xl text-primary" href="/">
//           EtamCourse
//         </a>
//       </div>
//       <div className="flex-none gap-2 flex-grow lg:relative justify-center">
//         <div className="form-control relative hidden lg:block">
//           <button>
//             <IoIosSearch className="absolute top-1/2 right-2 -translate-y-1/2 w-5 h-5 lg:w-6 lg:h-6 bg-primary text-white rounded lg:mr-2 hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:hover:border-white hidden lg:block" />
//           </button>
//           <input
//             type="text"
//             placeholder="Find a Course"
//             className="input w-28 text-sm md:w-auto lg:w-[30rem] rounded-2xl border-black lg:pr-0 pr-10"
//           />
//         </div>
//       </div>
//       <div className="flex-none gap-2">
//         {token ? (
//           // Tampilkan profile jika sudah login
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img alt="Tailwind CSS Navbar component" src={imgProfile} />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//               // Menambahkan stopPropagation agar dropdown tidak menutup
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Link to="/profile">
//                 <li>
//                   <a className="justify-between font-medium">Profile</a>
//                 </li>
//               </Link>

//               <li>
//                 <a>Logout</a>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           // Tampilkan tombol login jika belum login
//           <Link to="/login">
//             <button className="btn bg-primary text-white hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:mr-10">
//               Login
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { IoIosSearch } from "react-icons/io";
import imgProfile from "../assets/profil.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom"; // Mengimpor useNavigate
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/slices/authSlice"; // Import logout action

const Navbar = () => {
  // const navigate = useNavigate(); // Inisialisasi useNavigate
  // const dispatch = useDispatch(); // Inisialisasi useDispatch

  // // Ambil token dari Redux store untuk mengecek status login
  const { token } = useSelector((state) => state.auth);

  // // Fungsi logout
  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/"); // Mengarahkan pengguna ke halaman utama setelah logout
  // };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-none">
        <a className="btn btn-ghost lg:pl-10 text-xl text-primary" href="/">
          EtamCourse
        </a>
      </div>
      <div className="flex-none gap-2 flex-grow lg:relative justify-center">
        <div className="form-control relative hidden lg:block">
          <button>
            <IoIosSearch className="absolute top-1/2 right-2 -translate-y-1/2 w-5 h-5 lg:w-6 lg:h-6 bg-primary text-white rounded lg:mr-2 hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:hover:border-white hidden lg:block" />
          </button>
          <input
            type="text"
            placeholder="Find a Course"
            className="input w-28 text-sm md:w-auto lg:w-[30rem] rounded-2xl border-black lg:pr-0 pr-10"
          />
        </div>
      </div>

      <div className="flex-none gap-2">
        {token ? (
          // Tampilkan profile jika sudah login

          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile" src={imgProfile} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              onClick={(e) => e.stopPropagation()} // Menjaga dropdown tetap terbuka saat mengklik
            >
              <Link to="/profile">
                <li>
                  <span className="justify-between font-medium cursor-pointer">Profile</span>{" "}
                  {/* Ganti <a> dengan <span> */}
                </li>
              </Link>

              <li>
                <button
                  // onClick={handleLogout}
                  className="justify-between font-medium w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // Tampilkan tombol login jika belum login
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

// import { useState } from "react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen); // Mengubah state saat hamburger menu diklik
//   };

//   return (
//     <>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <a
//             href="https://flowbite.com/"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <img
//               src="https://flowbite.com/docs/images/logo.svg"
//               className="h-8"
//               alt="Flowbite Logo"
//             />
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//               Flowbite
//             </span>
//           </a>
//           <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//             <button
//               className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//               id="user-menu-button"
//               aria-expanded="false"
//               data-dropdown-toggle="user-dropdown"
//               data-dropdown-placement="bottom"
//             >
//               <span className="sr-only">Open User Menu</span>
//               <img src="" alt="" className="w-8 h-8 rounded-full" />
//             </button>
//             <div
//               className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
//               id="user-dropdown"
//             >
//               <div className="px-4 py-3">
//                 <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
//                 <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
//                   name@flowbite.com
//                 </span>
//               </div>
//               <ul className="py-2" aria-labelledby="user-menu-button">
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Dashboard
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Settings
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Earnings
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Sign out
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <button
//               onClick={toggleMenu} // Menambahkan fungsi untuk toggle menu
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//               aria-controls="navbar-user"
//               aria-expanded={isMenuOpen} // Mengatur atribut aria-expanded
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5 text-current"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   className="stroke-current stroke-2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
//               isMenuOpen ? "flex" : "hidden"
//             }`} // Mengatur kelas berdasarkan state
//             id="navbar-user"
//           >
//             <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
//                   aria-current="page"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Pricing
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
