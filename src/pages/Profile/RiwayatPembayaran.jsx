import React, { useState } from "react";
import ContentCard from "./RiwayatContentCard"; // Asumsi komponen ini sudah tersedia

const RiwayatPembayaran = () => {
  const allPayments = [
    {
      courseTitle: "Belajar Web Designer Dengan Figma",
      courseAuthor: "Angela Doe",
      courseCategory: "UI/UX Design",
      courseImage: "https://via.placeholder.com/350x150",
      courseLevel: "Intermediate Level",
      courseModule: 10,
      courseRating: 4.7,
      courseStatus: "Waiting for Payment",
      courseTime: 120,
      paymentDate: "2024-10-06",
    },
    {
      courseTitle: "Belajar React untuk Pemula",
      courseAuthor: "John Smith",
      courseCategory: "Web Development",
      courseImage: "https://via.placeholder.com/350x150",
      courseLevel: "Beginner Level",
      courseModule: 8,
      courseRating: 4.5,
      courseStatus: "Paid",
      courseTime: 150,
      paymentDate: "2024-09-26",
    },
    {
      courseTitle: "Advanced CSS Mastery",
      courseAuthor: "Jane Doe",
      courseCategory: "Web Design",
      courseImage: "https://via.placeholder.com/350x150",
      courseLevel: "Advanced Level",
      courseModule: 12,
      courseRating: 4.8,
      courseStatus: "Paid",
      courseTime: 200,
      paymentDate: "2024-09-27",
    },
  ];

  const [filteredPayments, setFilteredPayments] = useState(allPayments);
  const [selectedDate, setSelectedDate] = useState(""); // Tambahkan state untuk selectedDate

  // Fungsi untuk memfilter berdasarkan tanggal
  const filterByDate = (filterType) => {
    let filteredData;
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    ); // Awal minggu
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Awal bulan
    const startOfYear = new Date(today.getFullYear(), 0, 1); // Awal tahun

    if (filterType === "today") {
      filteredData = allPayments.filter(
        (payment) =>
          payment.paymentDate === new Date().toISOString().split("T")[0]
      );
    } else if (filterType === "week") {
      filteredData = allPayments.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= startOfWeek && paymentDate <= new Date();
      });
    } else if (filterType === "month") {
      filteredData = allPayments.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= startOfMonth && paymentDate <= new Date();
      });
    } else if (filterType === "year") {
      filteredData = allPayments.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate >= startOfYear && paymentDate <= new Date();
      });
    } else if (filterType === "waitingPayment") {
      filteredData = allPayments.filter(
        (payment) => payment.courseStatus === "Waiting for Payment"
      );
    } else if (filterType === "paid") {
      filteredData = allPayments.filter(
        (payment) => payment.courseStatus === "Paid"
      );
    } else {
      filteredData = allPayments; // Default, semua data
    }

    setFilteredPayments(filteredData);
  };

  // Fungsi untuk mengubah state selectedDate saat dropdown berubah
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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
            {/* Card 2 - Filter by Today */}
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("today")}
            >
              <span className="font-semibold text-xl">Hari Ini</span>
            </div>

            {/* Card 3 - Filter by This Week */}
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("week")}
            >
              <span className="font-semibold text-xl">Minggu Ini</span>
            </div>

            {/* Card 4 - Filter by This Month */}
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("month")}
            >
              <span className="font-semibold text-xl">Bulan Ini</span>
            </div>

            {/* Card 5 - Filter by This Year */}
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("year")}
            >
              <span className="font-semibold text-xl">Tahun Ini</span>
            </div>

            {/* Card 5 - Filter by Waiting to Pay */}
            <div
              className="bg-white border border-gray-300 shadow-lg rounded-2xl w-40 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => filterByDate("waitingPayment")}
            >
              <span className="px-7 font-semibold text-xl">
                Menunggu pembayaran
              </span>
            </div>

            {/* Card 5 - Filter by Paid */}
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
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment, index) => (
              <ContentCard
                key={index}
                courseAuthor={payment.courseAuthor}
                courseCategory={payment.courseCategory}
                courseImage={payment.courseImage}
                courseLevel={payment.courseLevel}
                courseModule={payment.courseModule}
                courseRating={payment.courseRating}
                courseStatus={payment.courseStatus}
                courseTime={payment.courseTime}
                courseTitle={payment.courseTitle}
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
