import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Silahkan isi email anda");
      return;
    }

    if (!password) {
      setErrorMessage("Silahkan isi password anda");
      return;
    }
    // Validasi form
    if (!email && !password) {
      toast.error("Email dan Password belum diisi");
      return;
    } else if (!email) {
      toast.error("Email belum diisi");
      return;
    } else if (!password) {
      toast.error("Password belum diisi");
      return;
    } else if (password.length < 8) {
      toast.error("Password harus minimal 8 karakter!");
      return;
    }

    // Jika validasi lolos, lakukan login
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
            <h1 className="text-[24px] font-bold text-black mb-8 ">Masuk</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-[14px] mb-1 font-Poppins font-medium">
                  Email/No Telepon
                </label>
                <input
                  type="email"
                  className="border shadow-sm w-full p-2 rounded-xl "
                  placeholder="Contoh: gun@gmail.com"
                  value={email}
                  autoComplete="current-email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-[14px]">
                <div className="flex justify-between items-center">
                  <label className="text-[14px] font-medium">Password</label>
                  <Link to="/send-email">
                    <span className="text-[#0A61AA] font-medium font-Poppins">Lupa Kata Sandi</span>
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border shadow-sm w-full p-2 rounded-xl "
                    placeholder="Masukkan password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      // Hapus pesan kesalahan saat pengguna mulai mengetik ulang
                      setErrorMessage("");
                    }}
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
              {errorMessage && (
                <p className="text-red-500 font-medium text-sm mb-2">{errorMessage}</p>
              )}
            </div>
            <button
              to="/"
              className=" btn  w-full text-[14px] font-medium bg-[#0A61AA] text-white py-[10px] rounded-2xl mt-5 "
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
        <div className="hidden lg:flex justify-center items-center bg-[#0A61AA] w-[50%] min-h-[100dvh]">
          <img src="/LOGO.png" alt="logo." />
        </div>
      </div>
    </>
  );
};

export default Login;
