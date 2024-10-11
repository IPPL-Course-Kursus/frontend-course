import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/actions/authActions";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Ambil state dari Redux
    const { sending, success, error } = useSelector(
        (state) => state.verifyEmail
    );

    // Handler untuk verifikasi email
    const handleVerify = (e) => {
        e.preventDefault();
        // Dispatch verifikasi email
        dispatch(verifyEmail());
    };

    // Jika verifikasi sukses, arahkan ke halaman login
    useEffect(() => {
        if (success) {
            navigate("/login");
            localStorage.removeItem("oobCode"); // Hapus oobCode dari localStorage setelah verifikasi
            console.log(success);
        }
    }, [success, navigate]);

    return (
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 pt-20">
                Mohon verifikasi email Anda!
            </h1>
            <img
                src="/images/image-2.png"
                alt="Confirmation Image"
                className="mx-auto mb-8 max-w-full h-auto mt-20"
            />

            <form
                onSubmit={handleVerify}
                className="flex flex-col items-center space-y-4"
            >
                <button
                    type="submit" // Jadikan tombol sebagai submit
                    className="bg-blue-600 text-white py-2 px-32 rounded-full font-bold inline-block mt-20"
                    disabled={sending} // Disable tombol saat verifikasi sedang berjalan
                >
                    {sending ? "Sedang Memverifikasi..." : "Verifikasi"}
                </button>
            </form>

            {/* Tampilkan error jika ada */}
            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
};

export default VerifyEmail;