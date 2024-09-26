// import { IoIosSearch } from "react-icons/io";
// import imgProfile from "../assets/profil.png";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Profile from "../pages/Profile/Profile";
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

          <div className="dropdown dropdown-end">
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
              <Link>
                <li>
                  <span  className="justify-between font-medium cursor-pointer">Profile</span>{" "}
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
