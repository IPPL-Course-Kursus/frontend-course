import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
import { login } from "../../redux/actions/authActions";
import LoadSpinner from "../../components/Spinner/LoadSpinner";
import Cookies from "js-cookie"; // Menambahkan js-cookie untuk pengecekan token

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cek jika token sudah ada, jika iya arahkan ke halaman dashboard
  useEffect(() => {
    const token = Cookies.get("token"); // Menggunakan js-cookie untuk mengambil token dari cookies
    if (token) {
      navigate("/*"); // Gantilah dengan rute halaman yang sesuai setelah login
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Silahkan isi email anda");
      return;
    }

    if (!password) {
      setPasswordError("Silahkan isi password anda");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password harus minimal 8 karakter!");
      return;
    }
    setIsLoading(true);
    // Jika validasi lolos, lakukan login
    await dispatch(login(email, password, navigate));
    setIsLoading(false);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-center mx-[23px] lg:px-[145px]">
          <form onSubmit={handleLogin} className="w-full">
            <h1 className="text-[24px] font-bold text-black mb-8">Masuk</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-[14px] mb-1 font-Poppins font-medium">Email</label>
                <input
                  type="email"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Contoh: etamcode@gmail.com"
                  value={email}
                  autoComplete="current-email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && (
                  <p className="text-red-500 font-medium text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="flex flex-col text-[14px]">
                <div className="flex justify-between items-center">
                  <label className="text-[14px] font-medium">Password</label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border shadow-sm w-full p-2 rounded-xl"
                    placeholder="Masukkan password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
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
                {passwordError && (
                  <p className="text-red-500 font-medium text-sm mt-1">{passwordError}</p>
                )}
                <div className="flex justify-between items-center mt-2">
                  <label className="text-[14px] font-medium"></label>
                  <Link to="/send-email">
                    <span className="text-[#0A61AA] font-medium font-Poppins">Lupa Kata Sandi</span>
                  </Link>
                </div>
              </div>
            </div>
            <button
              className={`btn w-full text-[14px] font-medium bg-[#0A61AA] text-white py-[10px] rounded-2xl mt-5 transition-colors duration-300 ${
                isLoading
                  ? "cursor-not-allowed bg-gray-500"
                  : "hover:bg-[#1A73E8] active:bg-[#084D8C]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadSpinner size={30} color="white" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Masuk"
              )}
            </button>

            <div className="flex flex-col justify-center items-center gap-2 mt-6">
              <div className="flex gap-2">
                <h1 className="text-[14px] font-normal font-Poppins">Belum punya akun?</h1>
                <Link to="/register" className="text-red-500 text-[14px] font-bold">
                  Daftar di sini
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex justify-center items-center bg-[#0A61AA] w-[50%] min-h-[100dvh]">
          <img src="/ETAMCOURSE.png" alt="logo." />
        </div>
      </div>
    </>
  );
};

export default Login;
