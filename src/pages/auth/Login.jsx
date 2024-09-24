import {
  // useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     console.log("Logged in user:", user);
  //     alert("Login successful!");
  //     navigate("/"); // Redirect to home or desired page after login
  //   } catch (error) {
  //     console.error("Error during login:", error.message);
  //     alert("Login failed. Please check your email and password.");
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    // Validasi form
    // if (!email && !password) {
    //   toast.error("Email dan Password belum diisi");
    //   return;
    // } else if (!email) {
    //   toast.error("Email belum diisi");
    //   return;
    // } else if (!password) {
    //   toast.error("Password belum diisi");
    //   return;
    // } else if (password.length < 8) {
    //   toast.error("Password min 8 karakter!");
    //   return;
    // }
    dispatch(login(email, password, navigate));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-center mx-[23px] lg:px-[145px]">
          <form onSubmit={handleLogin} className="w-full">
            <h1 className="text-[24px] font-bold text-blue-800 mb-8 ">Masuk</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-[12px] mb-1 font-Poppins ">Email/No Telepon</label>
                <input
                  type="email"
                  className="border shadow-sm w-full p-2 rounded-xl "
                  placeholder="Contoh: gun@gmail.com"
                  value={email}
                  autoComplete="current-email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-[12px]">
                <div className="flex justify-between items-center">
                  <label className="mb-[4px]">Password</label>
                  <Link to="/send-email">
                    <span className="text-blue-800 font-Poppins">Lupa Kata Sandi</span>
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border shadow-sm w-full p-2 rounded-xl "
                    placeholder="Masukkan password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* buat hide password */}
                  <button
                    type="button"
                    aria-label="toggle password visibility"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="border-none" />
                    ) : (
                      <FaRegEye className="border-none" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              to="/"
              className=" btn  w-full text-[14px] font-medium bg-blue-800 text-white py-[10px] rounded-2xl mt-5 "
              type="submit"
            >
              Masuk
            </button>
            <div className="flex flex-col justify-center items-center gap-2 mt-6">
              <div className="flex gap-2">
                <h1 className="text-[14px] font-normal font-Poppins">Belum punya akun?</h1>
                <Link to="/register" className="text-darkblue text-[14px] font-bold">
                  Daftar di sini
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Gambar Kanan */}
        <div className="hidden lg:flex justify-center items-center bg-blue-800 w-[50%] min-h-[100dvh]">
          <img src="/LOGO.jpg" alt="logo." />
        </div>
      </div>
    </>
  );
};

export default Login;
