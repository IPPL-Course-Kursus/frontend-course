import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen">
      <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-center mx-[23px] lg:px-[145px]">
        <form
          // onSubmit={}
          className="w-full"
        >
          <h1 className="text-[24px] font-bold text-blue-800 mb-8 ">Mengirim Email</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-[12px] mb-1 font-Poppins ">Masukkan Email</label>
              <input
                type="email"
                className="border text-[14px] w-full p-2 rounded-2xl "
                placeholder="Contoh: gun@gmail.com"
                value={email}
                autoComplete="current-email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button className=" btn  w-full text-[14px] font-medium bg-blue-800 text-white py-[10px] rounded-2xl mt-5 ">
            Kirim
          </button>
        </form>
      </div>

      {/* Gambar Kanan */}
      <div className="hidden lg:flex justify-center items-center bg-blue-800 w-[50%] min-h-[100dvh]">
        <img src="/LOGO.jpg" alt="logo" className="" />
      </div>
    </div>
  );
};

export default ResetPassword;
