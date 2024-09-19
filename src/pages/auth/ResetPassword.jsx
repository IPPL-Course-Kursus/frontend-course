import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordTop, setShowPasswordTop] = useState(false);
  const [showPasswordDown, setShowPasswordDown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //validate form submission if null
    if (password === "" || confirmPassword === "") {
      toast.error("Password harus diisi!");
      return;
    }

    //validate password
    if (confirmPassword !== password) {
      toast.error("Password harus sama!");
      return;
    }
  };

  const togglePasswordTop = () => {
    setShowPasswordTop(!showPasswordTop);
  };
  const togglePasswordDown = () => {
    setShowPasswordDown(!showPasswordDown);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-[24px] font-bold text-darkblue mb-8">Reset Password</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="text-[12px] mb-[4px]">Masukkan Password Baru</label>
              </div>
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
                  onClick={togglePasswordTop}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                >
                  {showPasswordTop ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="text-[12px] mb-[4px]">Ulangi Password Baru</label>
              </div>
              <div className="relative">
                <input
                  type={showPasswordDown ? "text" : "password"}
                  className="border w-full p-2 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePasswordDown}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
                >
                  {showPasswordDown ? (
                    <FaRegEyeSlash className="border-none" />
                  ) : (
                    <FaRegEye className="border-none" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button className="btn  w-full text-[14px] font-medium bg-[#0A61AA] text-white py-[10px] rounded-2xl mt-5">
            Simpan
          </button>
        </form>
      </div>
      <div className="hidden lg:flex justify-center items-center bg-[#0A61AA] w-[50%] min-h-[100dvh]">
        <img src="/LOGO.jpg" alt="logo" className="" />
      </div>
    </div>
  );
};

export default ResetPassword;
