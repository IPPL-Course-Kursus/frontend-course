import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postSuccessPayment, resumeTransaction } from "../../redux/actions/transactionActions";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [transactionStatus, setTransactionStatus] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const order = query.get("order_id");
    const status = query.get("transaction_status");

    if (status) {
      setTransactionStatus(status);
    }

    if (order) {
      setOrderId(order);
      dispatch(postSuccessPayment(order));
    }
  }, [dispatch, location.search]);

  const handleResumePayment = async () => {
    if (orderId) {
        const result = await dispatch(resumeTransaction(orderId)); // Menunggu hasil dari dispatch
        if (result && result.success) {
            // Navigasi ke paymentUrl setelah transaksi berhasil
            window.open(result.data.data.paymentUrl, "_blank"); // Buka di tab baru
        } else {
            console.error("Transaction resume failed", result); // Tambahkan logging untuk debugging
        }
    }
};


  return (
    <>
      <Navbar />
      <main className="max-w-sm md:max-w-5xl mx-auto mt-10 p-4 container">
        {transactionStatus === "pending" ? (
          <div className="bg-yellow-500 text-white p-2 rounded-lg text-center font-semibold mb-14">
            Pembayaran sedang diproses. Silakan tunggu beberapa saat atau lanjutkan pembayaran.
          </div>
        ) : (
          <div className="bg-green-500 text-white p-2 rounded-lg text-center font-semibold mb-14">
            Terimakasih atas pembayaran transaksi
          </div>
        )}

        <div className="text-center">
          {transactionStatus === "pending" ? (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-4">Pembayaran Pending</h1>
              <img
                src="/images/pending.png"
                alt="Pending Payment Image"
                className="mx-auto mb-8 max-w-full h-auto"
              />
              <p className="text-gray-600 mb-4">Pembayaran kelas premium Anda sedang menunggu konfirmasi.</p>
              <button
                onClick={handleResumePayment}
                className="bg-yellow-600 text-white py-2 px-32 rounded-full font-bold mb-4"
              >
                Lanjutkan Pembayaran
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Selamat!</h1>
              <img
                src="/images/image-2.png"
                alt="Confirmation Image"
                className="mx-auto mb-8 max-w-full h-auto"
              />
              <p className="text-gray-600 mb-4">Transaksi pembayaran kelas premium berhasil!</p>
            </>
          )}
          <div className="flex flex-col items-center space-y-4">
            <Link to={transactionStatus === "pending" ? "/" : "/mycourse"}>
              <a className={`py-2 px-32 rounded-full font-bold inline-block ${transactionStatus === "pending" ? "bg-yellow-600 text-white" : "bg-blue-600 text-white"}`}>
                {transactionStatus === "pending" ? "Kembali ke Beranda" : "Mulai Belajar"}
              </a>
            </Link>
            {transactionStatus !== "pending" && (
              <Link to="/">
                <a className="text-blue-600 font-semibold">Kembali ke Beranda</a>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SuccessPage;
