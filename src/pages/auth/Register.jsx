import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authActions";
import LoadSpinner from "../../components/Spinner/LoadSpinner";
// import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [cityError, setCityError] = useState("");
  const [tanggalLahirError, setTanggalLahirError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setFullNameError("");
    setPhoneNumberError("");
    setCityError("");
    setTanggalLahirError("");

    // Validation checks with toast.error alerts
    if (!fullName) {
      setFullNameError("Silahkan isi nama lengkap anda");
      return;
    }
    if (!email) {
      setEmailError("Silahkan isi email anda");
      return;
    }
    if (!phoneNumber) {
      setPhoneNumberError("Silahkan masukkan no telepon anda");
      return;
    }
    if (!city) {
      setCityError("Silahkan isi kota anda");
      return;
    }
    if (!tanggalLahir) {
      setTanggalLahirError("Silahkan masukkan tanggal lahir anda");
      return;
    }
    if (!password) {
      setPasswordError("Silahkan isi password anda");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password min 8 karakter!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password harus memiliki setidaknya satu huruf besar");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password harus memiliki setidaknya satu angka");
      return;
    }

    setIsLoading(true); // Set loading to true saat mulai submit

    // Dispatch the register action
    await dispatch(register(email, password, fullName, phoneNumber, city, tanggalLahir, navigate));

    setIsLoading(false); // Kembali ke false setelah selesai
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
            <h1 className="text-[24px] font-bold text-blue-800 mb-8">DAFTAR</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">Nama</label>
                <input
                  type="text"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Nama Lengkap"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setFullNameError("");
                  }}
                />
                {fullNameError && (
                  <p className="text-red-500 font-medium text-sm mt-1">{fullNameError}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">Email</label>
                <input
                  type="email"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Contoh: etamcode@mail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && (
                  <p className="text-red-500 font-medium text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">No Telepon</label>
                <input
                  type="text"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Contoh: 0895.."
                  value={phoneNumber}
                  autoComplete="tel"
                  onChange={(e) => {
                    const input = e.target.value;
                    if (validatePhoneInput(input)) {
                      setPhoneNumber(input);
                      if (phoneNumberError) setPhoneNumberError(""); // Reset error
                    }
                  }}
                />
                {phoneNumberError && (
                  <p className="text-red-500 font-medium text-sm mt-1">{phoneNumberError}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">Kota</label>
                <input
                  type="text"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  placeholder="Contoh: Bali"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setCityError("");
                  }}
                />
                {cityError && <p className="text-red-500 font-medium text-sm mt-1">{cityError}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  className="border shadow-sm w-full p-2 rounded-xl"
                  value={tanggalLahir}
                  onChange={(e) => {
                    setTanggalLahir(e.target.value);
                    setTanggalLahirError("");
                  }}
                />
                {tanggalLahirError && (
                  <p className="text-red-500 font-medium text-sm mt-1">{tanggalLahirError}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] mb-[4px] font-medium font-Poppins">
                  Buat Password
                </label>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border shadow-sm w-full p-2 rounded-xl pr-[3.5rem] relative" // `relative` pada input
                    placeholder="Masukkan Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(""); // Hapus pesan error saat input berubah
                    }}
                  />
                  {passwordError && (
                    <p className="text-red-500 font-medium text-sm mt-1 absolute left-0 top-full">
                      {" "}
                      {/* Position absolute untuk pesan error */}
                      {passwordError}
                    </p>
                  )}
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
            {/* <button className="btn w-full text-[14px] font-medium bg-[#0A61AA] text-white py-[10px] rounded-2xl mt-5 hover:bg-[#1A73E8] active:bg-[#084D8C] transition-colors duration-300">
              Daftar
            </button> */}
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
                "Daftar"
              )}
            </button>
            <div className="flex justify-center items-center gap-2 mt-6">
              <h1 className="text-[14px] font-normal font-Poppins">Sudah punya akun ?</h1>
              <Link to="/login" className="text-red-500 text-[14px] font-bold">
                Masuk di sini
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden lg:flex justify-center items-center bg-[#0A61AA] w-[50%] min-h-[100dvh]">
          <img src="/ETAMCOURSE.png" alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Register;
