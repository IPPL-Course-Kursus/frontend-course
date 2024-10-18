import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/MyCourse/ProgressBar";

const MulaiKelas = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.mulaiKelas); // Pastikan state sesuai dengan reducer
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const runCode = () => {
    try {
      const result = eval(code); // Gunakan eval dengan hati-hati
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

  const handleAddCourse = () => {
    const newCourse = {
      categoryId: 1,
      courseLevelId: 1,
      typeCourseId: 1,
      courseName: "New Course",
      coursePrice: 100,
      courseDiscountPercent: 0,
      certificateStatus: true,
      publish: "Published",
      totalDuration: 120,
    };
    dispatch(addCourse(newCourse));
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 max-w-screen-xl mx-auto mt-10 p-4 gap-6">
        {/* Main Content */}
        <div className="col-span-3">
          {/* Header Section */}
          <header className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <FaArrowLeft className="text-gray-500 cursor-pointer" />
              <h1 className="text-xl font-bold text-gray-800">Kelas Lainnya</h1>
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Java Script</h1>
              <h2 className="text-xl text-gray-600">Intro to Basic Java Script</h2>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-green-600 flex items-center gap-2">
                  <FaCheckCircle />
                  Beginner Level
                </span>
                <span className="text-gray-500">5 Modul</span>
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
              Learn JavaScript, the world’s most popular programming language, with our
              beginner-friendly class. This course is perfect for those looking to build
              foundational knowledge in JavaScript. You'll learn variables, functions, loops, and
              more, with practical examples to strengthen your skills.
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

          {/* Redux Actions Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h3 className="text-gray-700 text-2xl font-semibold mb-4">Redux Actions</h3>
            <button onClick={handleAddCourse} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Add Course
            </button>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <p>{JSON.stringify(courses)}</p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-700 text-2xl font-semibold mb-4">Materi Belajar</h3>
          <div className="mb-6">
            <h4 className="text-blue-600 font-bold">Progres Belajar</h4>
            <ProgressBar percentage={10} />
          </div>
          {/* Daftar Chapter */}
          <div className="mb-6">
            <h4 className="text-blue-600 font-bold">Chapter 1 - Pendahuluan</h4>
            <ul className="space-y-2 mt-4">
              <li className="text-gray-700">Lorem Ipsum</li>
              <li className="text-gray-700">Lorem Ipsum</li>
              <li className="text-gray-700">Lorem Ipsum</li>
            </ul>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default MulaiKelas;