import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import untuk Redux
import RiwayatContentCard from "./RiawayatContentCard";
import {
  fetchPaymentHistory,
  resumeTransaction,
} from "../../redux/actions/transactionActions";

const RiwayatPembayaran = () => {
  const dispatch = useDispatch();

  // Ambil data payment history dan status loading dari Redux store
  const { paymentHistory, loading, error } = useSelector(
    (state) => state.paymentHistory || []
  );

  // Local state untuk filter
  const [filteredPayments, setFilteredPayments] = useState([]);

  // Fetch data saat komponen di-mount
  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  // Update filteredPayments setiap kali paymentHistory berubah
  useEffect(() => {
    setFilteredPayments(paymentHistory);
  }, [paymentHistory]);

  // Fungsi untuk memfilter data
  const filterPayments = (filterType) => {
    if (!Array.isArray(paymentHistory)) {
      console.error("paymentHistory is not an array");
      return;
    }
    let filteredData;

    if (filterType === "all") {
      filteredData = paymentHistory; // Tampilkan semua data
    } else if (filterType === "paid") {
      filteredData = paymentHistory.filter(
        (payment) => payment.paymentStatus === "settlement"
      );
    } else if (filterType === "pending") {
      filteredData = paymentHistory.filter(
        (payment) => payment.paymentStatus === "pending"
      );
    } else {
      filteredData = paymentHistory; // Default, semua data
    }

    setFilteredPayments(filteredData);
  };

  const handleResumePayment = async (orderId) => {
    try {
      // Panggil action untuk melanjutkan transaksi
      const result = await dispatch(resumeTransaction(orderId));

      if (result && result.success) {
        // Buka URL pembayaran di tab baru jika berhasil
        window.open(result.data.data.paymentUrl, "_blank");
      } else {
        console.error("Resume transaction failed", result);
        alert("Gagal melanjutkan pembayaran. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error while resuming payment:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return (
    <div className="p-4">
      <div className="bg-blue-800 text-white rounded-t-3xl p-3 font-semibold text-2xl text-center">
        Riwayat Pembayaran
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Filter side - hanya ditampilkan pada desktop */}
        <div className="hidden md:flex md:basis-1/5 p-3">
          <div className="flex md:flex-col space-y-4 items-center md:mt-10">
            {/* Filter buttons */}
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-full md:w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterPayments("all")}
            >
              <span className="font-semibold text-xl text-center">Semua</span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-full md:w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterPayments("paid")}
            >
              <span className="font-semibold text-xl text-center">
                Telah Dibayar
              </span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-full md:w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterPayments("pending")}
            >
              <span className="font-semibold text-xl text-center">Pending</span>
            </div>
          </div>
        </div>

        {/* Content side - riwayat pembayaran tetap ditampilkan pada mobile */}
        <div className="md:border-l shadow-md md:basis-4/5 p-5 max-h-screen overflow-y-scroll">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : filteredPayments.length > 0 ? (
            filteredPayments.map((payment, index) => (
              <RiwayatContentCard
                key={index}
                courseAuthor={payment.course.user.fullName}
                courseCategory={payment.course.category.categoryName}
                courseImage={payment.course.image}
                courseLevel={payment.course.courseLevel.levelName}
                courseModule={payment.totalChapters}
                courseStatus={
                  payment.paymentStatus === "settlement"
                    ? "Paid"
                    : payment.paymentStatus === "pending"
                    ? "Pending"
                    : "Cancel"
                }
                courseTime={payment.course.totalDuration}
                courseTitle={payment.courseName}
                onResumePayment={() => handleResumePayment(payment.orderId)}
              />
            ))
          ) : (
            <p>Tidak ada data yang sesuai dengan filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiwayatPembayaran;
