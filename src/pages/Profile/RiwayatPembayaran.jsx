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

  // Fungsi untuk memfilter berdasarkan tanggal
  const filterByDate = (filterType) => {
    if (!Array.isArray(paymentHistory)) {
      console.error("paymentHistory is not an array");
      return;
    }
    let filteredData;
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    if (filterType === "today") {
      filteredData = paymentHistory.filter(
        (payment) => payment.createdAt.split("T")[0] === new Date().toISOString().split("T")[0]
      );
    } else if (filterType === "week") {
      filteredData = paymentHistory.filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= startOfWeek && paymentDate <= new Date();
      });
    } else if (filterType === "month") {
      filteredData = paymentHistory.filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= startOfMonth && paymentDate <= new Date();
      });
    } else if (filterType === "year") {
      filteredData = paymentHistory.filter((payment) => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= startOfYear && paymentDate <= new Date();
      });
    } else if (filterType === "waitingPayment") {
      filteredData = paymentHistory.filter(
        (payment) => payment.paymentStatus === "waiting"
      );
    } else if (filterType === "paid") {
      filteredData = paymentHistory.filter(
        (payment) => payment.paymentStatus === "settlement"
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
              onClick={() => filterByDate("today")}
            >
              <span className="font-semibold text-xl">Hari Ini</span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("week")}
            >
              <span className="font-semibold text-xl">Minggu Ini</span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("month")}
            >
              <span className="font-semibold text-xl">Bulan Ini</span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("year")}
            >
              <span className="font-semibold text-xl">Tahun Ini</span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("waitingPayment")}
            >
              <span className="font-semibold text-xl">
                Menunggu pembayaran
              </span>
            </div>
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("paid")}
            >
              <span className="font-semibold text-xl">Telah dibayar</span>
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
                // courseRating=
                courseStatus={payment.paymentStatus === "settlement" ? "Paid" : "Waiting for Payment"}
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
