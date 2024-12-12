import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../redux/actions/authActions"; 
import { resetEmailSuccess } from "../../redux/reducers/authReducers";
import Swal from 'sweetalert2';

const SendEmail = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { sending, success, error } = useSelector((state) => state.email);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Email Terkirim!',
        text: 'Silakan cek email Anda untuk tautan reset password.',
        confirmButtonText: 'OK'
      });
      dispatch(resetEmailSuccess());
    } else if (error && error.status === 404) {
      // Menampilkan alert jika terjadi error 404
      Swal.fire({
        icon: 'error',
        title: 'Email Tidak Ditemukan',
        text: 'Email yang Anda masukkan belum terdaftar. Silakan coba lagi.',
        confirmButtonText: 'OK'
      });
    }
  }, [success, error, dispatch]);

  const handleSend = (e) => {
    e.preventDefault();
    dispatch(sendEmail(email)); 
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-center mx-[23px] lg:px-[145px]">
        <form onSubmit={handleSend} className="w-full">
          <h1 className="text-[24px] font-bold text-blue-800 mb-8">Mengirim Email</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-[12px] mb-1 font-Poppins">Masukkan Email</label>
              <input
                type="email"
                className="border text-[14px] w-full p-2 rounded-2xl"
                placeholder="Contoh: gunt@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="btn w-full text-[14px] font-medium bg-[#0A61AA] text-white py-[10px] rounded-2xl mt-5"
            disabled={sending}
          >
            {sending ? "Mengirim..." : "Kirim"}
          </button>
          {error && error.status !== 404 && <p className="text-red-500 mt-3">{error.message}</p>}
        </form>
      </div>

      <div className="hidden lg:flex justify-center items-center bg-[#0A61AA] w-[50%] min-h-[100dvh]">
        <img src="/ETAMCOURSE.png" alt="logo" className="" />
      </div>
    </div>
  );
};

export default SendEmail;
