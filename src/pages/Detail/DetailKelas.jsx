
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import CardRecommended from "../../components/DetailComponent/CardRecommended";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { FaBook } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourse } from "../../redux/actions/detailActions";
import { createTransaction } from "../../redux/actions/transactionActions";

export const DetailKelas = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = useSelector((state) => state.course.detail);
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getDetailCourse(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", import.meta.env.VITE_PRIVATE_CLIENT_KEY);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleProceedToPayment = () => {
    dispatch(createTransaction(id))
      .then((res) => {
        const { data } = res;
        console.log("Response from API:", data);

        if (data.success) {
          if (data.message === "CourseUser created for free course") {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "Anda telah terdaftar di kursus gratis ini.",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/mycourse");
            });
          } else if (window.snap) {
            window.snap.pay(data.data.token, {
              onSuccess: function (result) {
                Swal.fire("Berhasil!", "Pembayaran berhasil!", "success");
                console.log(result);
              },
              onPending: function (result) {
                Swal.fire("Menunggu Pembayaran!", "Pembayaran sedang diproses.", "info");
                console.log(result);
              },
              onError: function (result) {
                Swal.fire("Gagal!", "Pembayaran gagal.", "error");
                console.log(result);
              },
              onClose: function () {
                Swal.fire(
                  "Dibatalkan!",
                  "Anda menutup popup tanpa menyelesaikan pembayaran.",
                  "warning"
                );
              },
            });
          } else {
            console.error("Midtrans Snap is not loaded.");
          }
        } else {
          setTransactionMessage("Transaksi gagal, silakan coba lagi.");
        }
      })
      .catch((err) => {
        console.error(err);
        setTransactionMessage("Terjadi kesalahan, silakan coba lagi.");
      });

    setModalOpen(false);
  };

  const handleButtonClick = () => {
    if (detail.isEnrolled) {
      // Navigasi ke halaman kelas jika sudah diambil
      navigate(`/course/${id}/chapter`);
    } else {
      // Tampilkan modal untuk pembayaran jika belum diambil
      handleModalOpen();
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full">
        <div className="flex flex-row-reverse justify-between mx-3 lg:flex lg:flex-col lg:gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 mx-2 hover:text-color-primary lg:text-lg "
          >
            <IoMdArrowRoundBack />
            <p>Kembali Ke Beranda</p>
          </Link>
        </div>

        {/* Bagian Judul dan Deskripsi */}
        <div className="w-full bg-[#f3f7fb]">
          <div className="max-w-screen-lg mx-auto px-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="w-full sm:w-1/2 pt-16 pb-16 pr-8">
              <h1 className="text-[#151515] text-[24px] sm:text-[32px] font-semibold leading-normal">
                {detail.courseName || "Loading..."}
              </h1>
              <p className="text-[#151515] text-[12px] sm:text-[15px] leading-tight mt-4">
                {detail.intendedFor || "Deskripsi belum tersedia"}
              </p>
              <button
                onClick={handleButtonClick}
                className="mt-6 px-4 py-2 bg-[#0a61aa] text-white text-xs font-bold rounded-md"
              >
                {detail.isEnrolled ? "Mulai Kelas" : "Beli Kelas"}
              </button>
            </div>
            <div className="w-full sm:w-[512px] pt-16 pb-16">
              <img className="w-full h-auto" src={detail.image} alt="Gambar Kelas" />
            </div>
          </div>
        </div>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Konfirmasi Pembayaran</h2>
              <p className="mt-4">
                Apakah Anda yakin ingin melanjutkan ke pembayaran untuk mengikuti kelas ini?
              </p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Batal
                </button>
                <button
                  onClick={handleProceedToPayment}
                  className="px-4 py-2 bg-[#0a61aa] text-white rounded-md"
                >
                  Lanjutkan Pembayaran
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bagian Tentang Kelas dan Detail Kelas */}
        <div className="max-w-screen-lg mx-auto px-4 mt-8">
          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-full sm:w-2/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
              <h2 className="text-xl font-semibold text-[#151515]">Tentang Kelas</h2>
              <p className="mt-4 text-[#151515] text-[15px] leading-5">
                {detail.aboutCourse || "Informasi tentang kelas ini belum tersedia."}
              </p>
            </div>
            <div className="w-full sm:w-1/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1] sm:ml-4 mt-4 sm:mt-0">
              <h2 className="text-xl font-semibold text-primary">Detail Kelas</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center bg-grey p-4 rounded-md">
                  <FaBook className="w-[50px] h-[50px] mr-4" />
                  <div>
                    <p className="font-medium text-[#151515] text-base leading-5">
                      {detail.chapters?.length || 0} Materi
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-grey p-4 rounded-md">
                  <GrCertificate className="w-[50px] h-[50px] mr-4" />
                  <div>
                    <p className="font-medium text-[#151515] text-base leading-5">Sertifikat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Chapter */}
        <div className="max-w-screen-lg mx-auto px-4 mt-8">
          <div className="p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
            <h2 className="text-xl font-semibold text-[#151515]">Chapter</h2>
            <div className="mt-4">
              {detail.chapters?.length > 0 ? (
                detail.chapters.map((chapter, index) => (
                  <Link
                    to={`/course/${id}/chapter/${chapter.id}`}
                    key={chapter.id}
                    className="block p-2 mb-2 rounded-md bg-gray-200 hover:bg-gray-300"
                  >
                    Chapter {index + 1}: {chapter.chapterTitle}
                  </Link>
                ))
              ) : (
                <p>Tidak ada chapter yang tersedia.</p>
              )}
            </div>
          </div>
        </div>

        {/* Rekomendasi Kelas */}
        <div className="mt-8">
          <CardRecommended />
        </div>
      </div>

      <Footer />

      {transactionMessage && <div className="text-red-500">{transactionMessage}</div>}
    </>
  );
};

export default DetailKelas;