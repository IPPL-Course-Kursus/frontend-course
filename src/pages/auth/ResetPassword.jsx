import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/authActions"; // Import action
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordTop, setShowPasswordTop] = useState(false);
  const [showPasswordDown, setShowPasswordDown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resetting, success, error } = useSelector((state) => state.resetPassword); 


  const oobCode = localStorage.getItem("oobCode");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      toast.error("Password harus diisi!");
      return;
    }

    // Validasi standar untuk password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password harus minimal 8 karakter, memiliki huruf besar, huruf kecil, dan angka.");
      return;
      // (?=.*[@$!%*?&])
    }

    if (confirmPassword !== password) {
      toast.error("Password harus sama!");
      return;
    }

    dispatch(resetPassword(oobCode, password, confirmPassword));
};



  useEffect(() => {
    console.log(success);
    
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Password Terganti!',
        text: 'Silakan login kembali.',
        confirmButtonText: 'OK'
      });
      navigate("/login");
      localStorage.removeItem("oobCode");
      console.log(success);
    }
  }, [success, navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px]">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-[24px] font-bold text-darkblue mb-8">Reset Password</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-[12px] mb-[4px]">Masukkan Password Baru</label>
              <div className="relative">
                <input
                  type={showPasswordTop ? "text" : "password"}
                  className="border w-full p-2 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPasswordTop(!showPasswordTop)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                >
                  {showPasswordTop ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-[12px] mb-[4px]">Ulangi Password Baru</label>
              <div className="relative">
                <input
                  type={showPasswordDown ? "text" : "password"}
                  className="border w-full p-2 rounded-2xl pr-[3.5rem]"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPasswordDown(!showPasswordDown)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                >
                  {/*  */}
                  {showPasswordDown ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
          </div>
          <button
            className="btn w-full text-[14px] font-medium bg-[#0A61AA] text-white py-[10px] rounded-2xl mt-5"
            disabled={resetting}
          >
            {resetting ? "Menyimpan..." : "Simpan"}
          </button>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
      </div>
      <div className="hidden lg:flex justify-center items-center bg-[#0A61AA] w-[50%] min-h-[100dvh]">
        <img src="/ETAMCOURSE.png" alt="logo." />
      </div>
    </div>
  );
};

export default ResetPassword;