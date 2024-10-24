import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetailCourseUser,
  fetchChapterByCourseId,
  fetchContentByChapterId,
  startCourse,
  updateProgressContent,
} from "../../redux/actions/mulaiKelasActions"; // Import action yang digunakan

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/MyCourse/ProgressBar";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const MulaiKelas = () => {
  const dispatch = useDispatch();
  const { detailCourseUser, chapters, content } = useSelector(state => state.mulaikelas);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    // Fetch detail course user dan chapters
    dispatch(fetchDetailCourseUser(1)); // ID user yang sesuai
    dispatch(fetchChapterByCourseId(1)); // ID course yang sesuai
    dispatch(fetchContentByChapterId(1)); // ID chapter yang sesuai
  }, [dispatch]);

  const handleStartCourse = () => {
    dispatch(startCourse(1)); // ID user yang sesuai
  };

  const handleUpdateProgress = (contentId) => {
    const progressData = { progress: 50 }; // Contoh data progress
    dispatch(updateProgressContent(contentId, progressData));
  };

  const runCode = () => {
    try {
      const result = eval(code);
      setOutput(result || "Code ran successfully");
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Code successfully copied!");
  };

  const resetCode = () => {
    setCode("");
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 max-w-screen-xl mx-auto mt-10 p-4 gap-6">
        {/* Main Content */}
        <div className="col-span-3">
          {/* Header Section */}
          <header className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6">
            {/* Back button */}
            <div className="flex items-center gap-4">
              <FaArrowLeft className="text-gray-500 cursor-pointer" />
              <h1 className="text-xl font-bold text-gray-800">Kelas Lainnya</h1>
            </div>

            {/* Main class information */}
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {detailCourseUser?.course?.title || "Java Script"}
              </h1>
              <h2 className="text-xl text-gray-600">
                {detailCourseUser?.course?.description || "Intro to Basic Java Script"}
              </h2>

              <div className="flex items-center gap-4 mt-4">
                <span className="text-green-600 flex items-center gap-2">
                  <FaCheckCircle />
                  {detailCourseUser?.course?.level || "Beginner Level"}
                </span>
                <span className="text-gray-500">{chapters?.length || 0} Modul</span>
                <span className="text-gray-500">45 Menit</span>
              </div>
            </div>
          </header>

          {/* Video Placeholder */}
          <section className="bg-black h-56 flex items-center justify-center mb-6">
            <div className="text-center">
              <span className="block text-white text-6xl mb-4">📹</span>
              <p className="text-white">Video Placeholder</p>
            </div>
          </section>

          {/* Course Info Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h3 className="text-gray-700 text-2xl font-semibold">Tentang Kelas</h3>
            <p className="text-gray-600 mt-2">
              {detailCourseUser?.course?.description || 
                "Learn JavaScript, the world’s most popular programming language, with our beginner-friendly class."
              }
            </p>
          </section>

          {/* Code Editor Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h3 className="text-gray-700 text-2xl font-semibold mb-4">Java Script Compiler</h3>
            <textarea
              id="code"
              placeholder="Write your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            ></textarea>

            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={runCode}>
                Run Code
              </button>
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg" onClick={copyCode}>
                Copy Code
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-lg" onClick={resetCode}>
                Reset Code
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="text-gray-700 font-semibold">Output:</h4>
              <p className="text-gray-600 mt-2">{output}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-700 text-2xl font-semibold mb-4">Materi Belajar</h3>

          {/* Progress bar menggunakan komponen ProgressBar */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h4 className="text-blue-600 font-bold">Progres Belajar</h4>
              <span className="text-sm text-gray-500">{detailCourseUser?.progress || 0}%</span>
            </div>
            <ProgressBar percentage={detailCourseUser?.progress || 0} />
          </div>

          {/* Chapter List */}
          {chapters?.map((chapter, index) => (
            <div key={chapter.id} className="mb-6">
              <div className="flex justify-between items-center">
                <h4 className="text-blue-600 font-bold">{`Chapter ${index + 1} - ${chapter.title}`}</h4>
                <span className="text-sm text-gray-500">{chapter.duration} Menit</span>
              </div>
              <ul className="space-y-2 mt-4">
                {content?.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-200 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center">
                        {item.order}
                      </span>
                      <span className="text-gray-700">{item.title}</span>
                    </div>
                    <span className="text-green-500 cursor-pointer" onClick={() => handleUpdateProgress(item.id)}>
                      ▶
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default MulaiKelas;
