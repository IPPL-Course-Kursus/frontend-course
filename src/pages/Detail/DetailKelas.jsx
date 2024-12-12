import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import CardRecommended from "../../components/DetailComponent/CardRecommended";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { FaBook } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourse } from "../../redux/actions/detailActions";
import { createTransaction } from "../../redux/actions/transactionActions";
import { getUserCourses } from "../../redux/actions/courseActions";
import { FaRupiahSign } from "react-icons/fa6";
import Cookies from "js-cookie";

export const DetailKelas = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const detail = useSelector((state) => state.course.detail);
    const userCourses = useSelector((state) => state.course.mycourse || []);
    const [isModalOpen, setModalOpen] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState("");
    const [expandedChapter, setExpandedChapter] = useState(null);
    const isCourseEnrolled = () => {
        return userCourses.some((course) => course.courseId === id);
    };
    const getEnrolledCourseId = () => {
      const enrolledCourse = userCourses.find(
          (course) => course.courseId === id
      );
      return enrolledCourse ? enrolledCourse.id : null; // Menggunakan 'id' dari userCourses
  };
  

    const handleExpandChapter = (chapterId) => {
        setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
    };

    useEffect(() => {
        if (id) {
            dispatch(getDetailCourse(id));
        }
        dispatch(getUserCourses());
    }, [id, dispatch]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_PRIVATE_CLIENT_KEY
        );
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
                                Swal.fire(
                                    "Berhasil!",
                                    "Pembayaran berhasil!",
                                    "success"
                                );
                                console.log(result);
                            },
                            onPending: function (result) {
                                Swal.fire(
                                    "Menunggu Pembayaran!",
                                    "Pembayaran sedang diproses.",
                                    "info"
                                );
                                console.log(result);
                            },
                            onError: function (result) {
                                Swal.fire(
                                    "Gagal!",
                                    "Pembayaran gagal.",
                                    "error"
                                );
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
                    setTransactionMessage(
                        "Transaksi gagal, silakan coba lagi."
                    );
                }
            })
            .catch((err) => {
                console.error(err);
                setTransactionMessage("Terjadi kesalahan, silakan coba lagi.");
            });

        setModalOpen(false);
    };

    const handleButtonClick = () => {
      const token = Cookies.get("token");
  
      if (!token) {
          Swal.fire({
              icon: "warning",
              title: "Harap Login",
              text: "Anda perlu login untuk membeli kelas. Silakan login terlebih dahulu.",
              confirmButtonText: "OK",
          });
          return;
      }
      if (isCourseEnrolled()) {
          // Ambil id dari data userCourses yang sudah diambil
          const enrolledCourseId = getEnrolledCourseId();
          // Navigasi ke halaman mulai kelas jika sudah diambil
          if (enrolledCourseId) {
              navigate(`/mulai-kelas/${enrolledCourseId}`); // Gunakan id dari userCourses untuk navigasi
          }
      } else {
          // Tampilkan modal untuk pembayaran jika belum diambil
          handleModalOpen();
      }
  };
  

    return (
        <>
            <Navbar />

            <div className="w-full h-full container">
                <div className="flex flex-row-reverse justify-between lg:flex lg:flex-col lg:gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 mx-2 hover:text-color-primary lg:text-lg"
                    >
                        <FaArrowLeft className="text-gray-700 cursor-pointer my-4" />
                    </Link>
                </div>

                {/* Bagian Judul dan Deskripsi */}
                <div className="w-full bg-[#f3f7fb]">
                    <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="w-full sm:w-1/2 pt-16 pb-16 pr-8">
                            <h1 className="text-[#151515] text-[24px] sm:text-[32px] font-semibold leading-normal">
                                {detail.courseName || "Loading..."}
                            </h1>
                            <p className="text-[#151515] text-[12px] sm:text-[15px] leading-tight mt-4">
                                {detail.intendedFor ||
                                    "Deskripsi belum tersedia"}
                            </p>
                            <button
                                onClick={handleButtonClick}
                                className="mt-6 px-4 py-2 bg-[#0a61aa] text-white text-xs font-bold rounded-md"
                            >
                                {isCourseEnrolled()
                                    ? "Pelajari Kelas"
                                    : "Beli Kelas"}
                            </button>
                        </div>
                        <div className="w-full sm:w-[512px] pt-16 pb-16">
                            <img
                                className="w-full rounded-xl h-auto"
                                src={detail.image}
                                alt="Gambar Kelas"
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Popup */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold">
                                Konfirmasi Pembayaran
                            </h2>
                            <p className="mt-4">
                                Apakah Anda yakin ingin melanjutkan ke
                                pembayaran untuk mengikuti kelas ini?
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
                <div className=" mx-auto px-4 mt-8">
                    <div className="flex flex-col sm:flex-row w-full">
                        <div className="w-full sm:w-2/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
                            <h2 className="text-xl font-semibold text-[#151515]">
                                Tentang Kelas
                            </h2>
                            <p className="mt-4 text-[#151515] text-[15px] leading-5">
                                {detail.aboutCourse ||
                                    "Informasi tentang kelas ini belum tersedia."}
                            </p>
                        </div>
                        <div className="w-full sm:w-1/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1] sm:ml-4 mt-4 sm:mt-0">
                            <h2 className="text-xl font-semibold text-primary">
                                Detail Kelas
                            </h2>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center bg-grey p-4 rounded-md">
                                    <FaBook className="w-[50px] h-[50px] mr-4" />
                                    <div>
                                        <p className="font-medium text-[#151515] text-base leading-5">
                                            {detail.totalContents} Materi
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-grey p-4 rounded-md">
                                    <GrCertificate className="w-[50px] h-[50px] mr-4" />
                                    <div>
                                        <p className="font-medium text-[#151515] text-base leading-5">
                                            Sertifikat
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center bg-grey p-4 rounded-md">
                                    <FaRupiahSign className="w-[50px] h-[50px] mr-4" />
                                    <div>
                                        <p className="font-medium text-[#151515] text-lg leading-5">
                                            {`${
                                                detail.promoStatus
                                                    ? detail.courseDiscountPrice
                                                    : detail.coursePrice
                                            }`}{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Chapter */}
                <div className=" mx-auto px-4 mt-8 ">
                <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chapters</h2>
        <div>
          {detail.chapters?.length > 0 ? (
            detail.chapters.map((chapter) => (
              <div key={chapter.id} className="mb-3">
                <div
                  onClick={() => handleExpandChapter(chapter.id)}
                  className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg cursor-pointer flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-700">
                    {chapter.chapterTitle}
                  </span>
                  <span className="text-gray-500">
                    {expandedChapter === chapter.id ? "▲" : "▼"}
                  </span>
                </div>
                {expandedChapter === chapter.id && (
                  <div className="mt-2 pl-4 bg-blue-50 rounded-lg py-2">
                    {chapter.contents?.length > 0 ? (
                      chapter.contents.map((content, contentIndex) => (
                        <div
                          key={contentIndex}
                          className="p-2 text-gray-600 hover:bg-blue-100 rounded-md cursor-pointer"
                        >
                          <li className="list-none">{content.contentTitle}</li>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 pl-2">
                        Tidak ada konten tersedia
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Tidak ada chapter yang tersedia.</p>
          )}
        </div>
      </div>
                </div>

                {/* Rekomendasi Kelas */}
                <div className="mt-8">
                    <CardRecommended className="gap-10" />
                </div>
            </div>

            <Footer />

            {transactionMessage && (
                <div className="text-red-500">{transactionMessage}</div>
            )}
        </>
    );
};

export default DetailKelas;
