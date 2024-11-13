import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMulaiKelas,
  updateContentProgress,
  runCode,
} from "../../redux/actions/mulaiKelasActions";
import { resetOutput } from "../../redux/reducers/mulaiKelasReducers";
import { getMe } from "../../redux/actions/authActions";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/MyCourse/ProgressBar";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { fetchCertificate } from "../../redux/actions/certificateAction";
import jsPDF from "jspdf";
import sertifikat from "../../assets/sertif-ec.png";
import Swal from "sweetalert2";

const MulaiKelas = () => {
  const dispatch = useDispatch();
  const { data, loading, output } = useSelector((state) => state.mulaiKelas);
  const profile = useSelector((state) => state.getMe.profile);
  const [sourceCode, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedContent, setSelectedContent] = useState(null);
  const { data: certificateData } = useSelector((state) => state.certificate);
  const { id } = useParams();
  const name = profile?.fullName;
  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchMulaiKelas(id));
      {
        if (selectedContent && selectedContent.interpreterStatus) {
          setCode(selectedContent?.interpreter?.sourceCode || "");
          setLanguage(selectedContent?.interpreter?.languageInterpreterId || "");
        }
      }
    }
    dispatch(getMe());
    dispatch(fetchCertificate(id));
  }, [id, dispatch, selectedContent]);

  const handleRunCode = () => {
    dispatch(runCode(language, sourceCode)).catch((error) => {
      console.error("Error:", error.response ? error.response.data : error.message);
    });
  };

  const handleContentClick = (content) => {
    // Reset output sebelum berpindah ke konten yang baru
    dispatch(resetOutput());
    setSelectedContent(content);
    dispatch(updateContentProgress(id, content.id));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(sourceCode);
    alert("Code successfully copied!");
  };

  const resetCode = () => {
    setCode("");
  };

  const generateCertificate = () => {
    if (data?.data?.courseStatus !== "Completed") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Selesaikan semua materi untuk mendapatkan sertifikat.",
      });
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [842, 595],
    });

    // Tambahkan gambar sertifikat sebagai background
    doc.addImage(sertifikat, "PNG", 0, 0, 800, 600);

    // Tambahkan nama peserta di bawah "Diberikan pada"
    doc.setFontSize(28); // Ukuran font sedikit lebih besar
    doc.setTextColor(235, 167, 30); // Warna teks mirip dengan warna pada sertifikat
    doc.setFont("montserrat", "bold"); // Menambahkan font yang lebih tebal
    doc.text(name || "Nama Peserta", 90, 260, {
      align: "left",
      charSpace: 0.75, // Jarak antar karakter sedikit
    });

    // Tambahkan nama kursus di bawah "Atas kelulusannya pada kelas"
    doc.setFontSize(24);
    doc.setTextColor(235, 167, 30); // Sama dengan warna teks nama peserta
    doc.setFont("arial", "bold");
    doc.text(data?.data?.course?.courseName || "Nama Kursus", 90, 330, {
      align: "left",
      charSpace: 0.5,
    });

    doc.setFillColor(14, 43, 92); // Warna background
    doc.roundedRect(90, 180, 115, 20, 5, 5, "F");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255); // Warna teks untuk nomor sertifikat
    doc.setFont("montserrat", "normal");
    doc.text(` ${certificateData?.certificateNumber || "XXXXXX"}`, 95, 195, {
      align: "left",
    });

    // Tambahkan tanggal penerbitan sertifikat
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.setFont("montserrat", "bold");
    doc.text(
      `${certificateData?.issueDate ? formatTanggal(certificateData.issueDate) : "Tanggal Terbit"}`,
      90,
      405,
      {
        align: "left",
      }
    );

    // Unduh sertifikat
    doc.save(`Sertifikat ${data?.data?.course?.courseName}_${name}.pdf`);
  };

  // if (loading) {
  //     return <p>Loading...</p>;
  // }

  const contentFinish = data?.data?.contentFinish || 0;

  const getCodeMirrorExtensions = () => {
    return language === 1 ? [python()] : language === 2 ? [javascript()] : [];
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 mx-auto mt-10 p-4 gap-6">
          {/* Main Content */}
          <div className="col-span-3">
            {/* Header Section */}
            <header className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6">
              {/* Back button */}
              <Link to="/mycourse">
                <div className="flex items-center gap-4">
                  <FaArrowLeft className="text-gray-500 cursor-pointer" />
                  <h1 className="text-xl font-bold text-gray-800">Kelas Lainnya</h1>
                </div>
              </Link>

              {/* Main class information */}
              <div className="mt-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {data?.data?.course?.courseName
                    ? `${data.data.course.courseName} `
                    : "Course name tidak tersedia"}
                </h1>
                <h2 className="text-xl text-gray-600">
                  {data?.data?.course?.intendedFor
                    ? `${data.data.course.intendedFor} `
                    : "Tidak tersedia"}
                </h2>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-green-600 flex items-center gap-2">
                    <FaCheckCircle />
                    {data?.data?.course?.courseLevel.levelName}
                  </span>
                  <span className="text-gray-500">{data?.data?.course?._count.chapters} modul</span>
                  <span className="text-gray-500">
                    {data?.data?.course?.totalDuration
                      ? `${data.data.course.totalDuration} menit`
                      : "Durasi tidak tersedia"}
                  </span>
                  {/* Tombole generate sertifikat */}
                  <button
                    onClick={generateCertificate}
                    className={`p-2 rounded-lg ${
                      data?.data?.courseStatus === "Completed"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={data?.data?.courseStatus !== "Completed"}
                  >
                    Download Sertifikat
                  </button>
                </div>
              </div>
            </header>

            {/* Video Placeholder */}
            <section className="bg-black h-[600px] flex items-center relative justify-center mb-6">
              {selectedContent ? (
                selectedContent.contentUrl ? (
                  <iframe
                    width="560"
                    height="215"
                    src={selectedContent.contentUrl}
                    title={selectedContent.contentTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute w-full h-full"
                  ></iframe>
                ) : (
                  <img
                    src={data?.data?.course?.image}
                    alt={data?.data?.course?.courseName}
                    className="absolute w-full h-full"
                  />
                )
              ) : (
                <img
                  src={data?.data?.course?.image}
                  alt={data?.data?.course?.courseName}
                  className="absolute w-full h-full"
                />
              )}
            </section>

            {/* Course Info Section */}
            <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
              {selectedContent ? (
                <h3 className="text-gray-700 text-2xl font-semibold"> Deskripsi video </h3>
              ) : (
                <h3 className="text-gray-700 text-2xl font-semibold">Tentang Kelas</h3>
              )}
              {/* // <h3 className="text-gray-700 text-2xl font-semibold">
                        //     Deskripsi Video
                        // </h3> */}
              {selectedContent ? (
                <p className="text-gray-600 mt-2">{selectedContent.teks}</p>
              ) : (
                <p className="text-gray-600 mt-2">{data?.data?.course?.aboutCourse}</p>
              )}
            </section>

            {/* Code Editor Section */}
            {selectedContent && selectedContent.interpreterStatus && (
              <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
                <h3 className="text-gray-700 text-2xl font-semibold mb-4">Editor Kode</h3>
                <CodeMirror
                  id="code"
                  value={sourceCode}
                  theme={githubLight}
                  height="400px"
                  extensions={getCodeMirrorExtensions()}
                  onChange={(value) => setCode(value)}
                  className="w-full p-3 border border-gray-600 rounded-lg mb-4"
                ></CodeMirror>
                <div className="flex space-x-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleRunCode}
                    disabled={loading}
                  >
                    {loading ? "Running..." : "Run Code"}
                  </button>

                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                    onClick={copyCode}
                  >
                    Copy Code
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg"
                    onClick={resetCode}
                  >
                    Reset Code
                  </button>
                </div>

                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h4 className="text-gray-700 font-semibold">Output:</h4>
                  <p className="text-gray-600 mt-2">{output}</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="col-span-1 bg-white p-6 rounded-lg shadow-lg h-screen overflow-y-auto max-h-[calc(100vh-2rem)]">
            {" "}
            {/* Adjust height */}
            <h3 className="text-gray-700 text-2xl font-semibold mb-4">Materi Belajar</h3>
            {/* Progres Belajar */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h4 className="text-blue-600 font-bold mb-2">Progres Belajar</h4>
              </div>
              <ProgressBar contentFinish={contentFinish} />
            </div>
            {/* Chapter List */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {data?.data?.course?.totalDuration
                    ? `${data.data.course.totalDuration} menit`
                    : "Durasi tidak tersedia"}
                </span>
              </div>
              <ul className="space-y-4 mt-4">
                {data?.data?.course?.chapters?.map((chapter, chapterIndex) => {
                  const previousChapterCompleted =
                    chapterIndex === 0 ||
                    data.data.course.chapters[chapterIndex - 1].contents.every((content) =>
                      content.userContentProgress.some(
                        (progress) => progress.contentStatus === true
                      )
                    );

                  return (
                    <details key={chapter.id} className="mb-4">
                      <summary
                        className={`${
                          previousChapterCompleted ? "text-blue-600" : "text-gray-400"
                        } font-semibold cursor-pointer`}
                      >
                        Chapter {chapter.sort} {chapter.chapterTitle}
                      </summary>

                      <div className="pl-4 mt-2">
                        <ul>
                          {chapter.contents?.map((content, index) => {
                            const isLocked = !previousChapterCompleted;
                            const isSelected = selectedContent?.id === content.id;
                            const isCompleted = content.userContentProgress.some(
                              (progress) => progress.contentStatus === true
                            );

                            return (
                              <li
                                key={content.id}
                                onClick={() => !isLocked && handleContentClick(content)}
                                className={`flex justify-between items-center cursor-pointer
                                                            ${
                                                              isLocked
                                                                ? "text-gray-400"
                                                                : "text-gray-700"
                                                            }
                                                            ${
                                                              isSelected
                                                                ? "bg-blue-100"
                                                                : "hover:bg-gray-100"
                                                            }
                                                            transition-colors duration-200 p-2 rounded-lg`}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`rounded-full h-8 w-8 flex items-center justify-center text-lg font-semibold mr-2 p-4
                                                                    ${
                                                                      isLocked
                                                                        ? "bg-gray-200 text-gray-400"
                                                                        : "bg-blue-200 text-blue-800"
                                                                    }`}
                                  >
                                    {index + 1}
                                  </span>
                                  <span
                                    className={`${
                                      isSelected ? "text-blue-800 font-semibold" : ""
                                    } flex items-center`}
                                  >
                                    {content.contentTitle}
                                  </span>
                                </div>

                                <div className="flex items-center">
                                  {isCompleted ? (
                                    <FaCheckCircle className="w-4 h-4 text-green-500" />
                                  ) : isLocked ? (
                                    <IoIosLock className="w-4 h-4 text-yellow-500 " />
                                  ) : null}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </details>
                  );
                })}
              </ul>
            </div>
            {/* Tombole generate sertifikat
                    <div className="text-center border-t-2 border-gray-300">
                <button
                    onClick={generateCertificate}
                    className="bg-blue-600 text-white p-2 rounded-lg mt-5"
                >
                    Download Sertifikat
                </button>
            </div> */}
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MulaiKelas;
