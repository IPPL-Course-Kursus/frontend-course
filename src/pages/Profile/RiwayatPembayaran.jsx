import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import untuk Redux
import RiwayatContentCard from "./RiawayatContentCard";
import { fetchPaymentHistory } from "../../redux/actions/transactionActions";

const RiwayatPembayaran = () => {
  const dispatch = useDispatch();

  // Ambil data payment history dan status loading dari Redux store
  const { paymentHistory, loading, error } = useSelector((state) => state.paymentHistory || []);

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
    } else if (filterType === "cancel") {
      filteredData = paymentHistory.filter(
        (payment) => payment.paymentStatus === "cancel"
      );
    } else {
      filteredData = paymentHistory; // Default, semua data
    }

    setFilteredPayments(filteredData);
  };

  return (
    <div>
      <div className="flex-col bg-blue-800 text-white rounded-t-3xl p-3 font-semibold text-2xl">
        Riwayat Pembayaran
      </div>
      <div className="flex">
        {/* Filter side */}
        <div className="basis-1/5 p-3">
          <div className="flex flex-col space-y-4 items-center mt-10">
            {/* Filter buttons */}
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterPayments("all")}
            >
              <span className="font-semibold text-xl text-center">Semua</span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterPayments("paid")}
            >
              <span className="font-semibold text-xl text-center">Telah Dibayar</span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterPayments("cancel")}
            >
              <span className="font-semibold text-xl text-center">Dibatalkan</span>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="border-l shadow-md basis-4/5 p-5 max-h-screen overflow-y-scroll mr-5">
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
                courseStatus={payment.paymentStatus === "settlement" ? "Paid" : "cancel"}
                courseTime={payment.course.totalDuration}
                courseTitle={payment.courseName}
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
