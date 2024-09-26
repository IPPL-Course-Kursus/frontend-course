import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authActions";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName && !email && !phoneNumber && !country && !city && !tanggalLahir && !password) {
      toast.error("Semua Form Harus Diisi");
      return;
    } else if (fullName == "") {
      toast.error("Nama Masih Kosong");
      return;
    } else if (email == "") {
      toast.error("Email Masih Kosong");
    } else if (phoneNumber === "") {
      toast.error("Nomor Telepon masih kosong");
      return;
    } else if (country === "") {
      toast.error("Negara masih kosong");
      return;
    } else if (city === "") {
      toast.error("Kota masih kosong");
      return;
    } else if (tanggalLahir === "") {
      toast.error("Langgal Lahir masih kosong");
      return;
    } else if (password === "") {
      toast.error("Password masih kosong");
      return;
    } else if (password.length < 8) {
      toast.error("Password min 8 karakter!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password harus memiliki setidaknya satu huruf besar");
      return;
    } else if (!/[0-9]/.test(password)) {
      toast.error("Password harus memiliki setidaknya satu angka");
      return;
    }
    console.log("Email:", email);
    console.log("lahir", tanggalLahir);

    dispatch(
      register(email, password, fullName, phoneNumber, country, city, tanggalLahir, navigate)
    );
  };

  const validatePhoneInput = (input) => {
    return !isNaN(input) && input.length <= 14;
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-center mx-[23px] lg:px-[145px]">
          <form onSubmit={handleRegister} className="w-full">
            <h1 className="text-[24px] font-bold text-blue-800 mb-8 ">DAFTAR</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins ">name</label>
                <input
                  type="text"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Nama Lengkap"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins ">Email</label>
                <input
                  type="email"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Contoh: Guntur@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">No Telepon</label>
                <input
                  type="text"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="+62"
                  value={phoneNumber}
                  autoComplete="tel"
                  onChange={(e) => {
                    const input = e.target.value;
                    if (validatePhoneInput(input)) {
                      setPhoneNumber(input);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="ttext-[14px] mb-[4px] font-medium font-Poppins">Negara</label>
                <input
                  type="text"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Negara"
                  value={country}
                  autoComplete=""
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">Kota</label>
                <input
                  type="text"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Kota"
                  value={city}
                  autoComplete="tel"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  // placeholder=""
                  value={tanggalLahir}
                  autoComplete=""
                  // onChange={handleDateChange}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="text-[14px] mb-[4px] font-medium font-Poppins">
                    Buat Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border shadow-sm w-full p-2 rounded-xl pr-[3.5rem]"
                    placeholder="Masukkan Password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* buat hide password */}
                  <button
                    type="button"
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
              className=" btn  w-full text-[14px] font-medium bg-[#0A61AA] text-white py-[10px] rounded-2xl mt-5 "
              type="submit"
            >
              Daftar
            </button>
            <div className="flex justify-center items-center gap-2 mt-6">
              <h1 className="text-[14px] font-normal font-Poppins">Sudah punya akun ?</h1>
              <Link to="/login" className="text-red-500 text-[14px] font-bold">
                Masuk di sini
              </Link>
            </div>
          </form>
        </div>

        {/* Gambar Kanan */}
        <div className="hidden lg:flex justify-center items-center bg-[#0A61AA] w-[50%] min-h-[100dvh]">
          <img src="/LOGO.jpg" alt="logo" className="" />
        </div>
      </div>
      {/* <Toaster position="top-center" /> */}
    </>
  );
};

export default Register;
