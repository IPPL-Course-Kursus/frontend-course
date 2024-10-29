import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMulaiKelas,
    updateContentProgress,
    runCode,
} from "../../redux/actions/mulaiKelasActions";
import { resetOutput } from "../../redux/reducers/mulaiKelasReducers";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from '@uiw/codemirror-theme-github';
import { python } from "@codemirror/lang-python";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgressBar from "../../components/MyCourse/ProgressBar";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";


const MulaiKelas = () => {
    const dispatch = useDispatch();
    const { data, loading, error, output } = useSelector(
        (state) => state.mulaiKelas
    );
    const [sourceCode, setCode] = useState("");
    const [language, setLanguage] = useState("");
    const [selectedContent, setSelectedContent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchMulaiKelas(id));
            {
                if (selectedContent && selectedContent.interpreterStatus) {
                    setCode(selectedContent?.interpreter?.sourceCode || "");
                    setLanguage(
                        selectedContent?.interpreter?.languageInterpreter || ""
                    );
                }
            }
        }
    }, [id, dispatch, selectedContent]);

    const handleRunCode = () => {
        dispatch(runCode(language, sourceCode)).catch((error) => {
            console.error(
                "Error:",
                error.response ? error.response.data : error.message
            );
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

    if (loading) {
        return <p>Loading...</p>;
    }

    const contentFinish = data?.data?.contentFinish || 0;

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 lg:grid-cols-4 max-w-screen-xl mx-auto mt-10 p-4 gap-6">
                {/* Main Content */}
                <div className="col-span-3">
                    {/* Header Section */}
                    <header className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6">
                        {/* Back button */}
                        <Link to="/mycourse">
                            <div className="flex items-center gap-4">
                                <FaArrowLeft className="text-gray-500 cursor-pointer" />
                                <h1 className="text-xl font-bold text-gray-800">
                                    Kelas Lainnya
                                </h1>
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
                                <span className="text-gray-500">
                                    {data?.data?.course?._count.chapters} modul
                                </span>
                                <span className="text-gray-500">
                                    {data?.data?.course?.totalDuration
                                        ? `${data.data.course.totalDuration} menit`
                                        : "Durasi tidak tersedia"}
                                </span>
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
                            <h3 className="text-gray-700 text-2xl font-semibold">
                                {" "}
                                Deskripsi video{" "}
                            </h3>
                        ) : (
                            <h3 className="text-gray-700 text-2xl font-semibold">
                                Tentang Kelas
                            </h3>
                        )}
                        {/* // <h3 className="text-gray-700 text-2xl font-semibold">
                        //     Deskripsi Video
                        // </h3> */}
                        {selectedContent ? (
                            <p className="text-gray-600 mt-2">
                                {selectedContent.teks}
                            </p>
                        ) : (
                            <p className="text-gray-600 mt-2">
                                {data?.data?.course?.aboutCourse}
                            </p>
                        )}
                    </section>

                    {/* Code Editor Section */}
                    {selectedContent && selectedContent.interpreterStatus && (
                        <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
                            <h3 className="text-gray-700 text-2xl font-semibold mb-4">
                                Editor Kode
                            </h3>
                            <CodeMirror
                                id="code"
                                value={sourceCode}
                                theme={githubLight}
                                height="400px"
                                extensions={[python()]}
                                onChange={(value) => setCode(value)}
                                className="w-full p-3 border border-gray-600 rounded-lg mb-4"
                            ></CodeMirror>
                            <div className="flex space-x-4">
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg"
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
                                <h4 className="text-gray-700 font-semibold">
                                    Output:
                                </h4>
                                <p className="text-gray-600 mt-2">{output}</p>
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-gray-700 text-2xl font-semibold mb-4">
                        Materi Belajar
                    </h3>

                    {/* Progres Belajar */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-blue-600 font-bold">
                                Progres Belajar
                            </h4>
                            {/* <span className="text-sm text-gray-500">
                                {percentage}
                            </span> */}
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
                        <ul className="space-y-2 mt-4">
                            {data?.data?.course?.chapters?.map(
                                (chapter, chapterIndex) => {
                                    // Periksa apakah semua konten di chapter sebelumnya selesai
                                    const previousChapterCompleted =
                                        chapterIndex === 0 || // Jika ini adalah chapter pertama, selalu buka
                                        data.data.course.chapters[
                                            chapterIndex - 1
                                        ].contents.every((content) =>
                                            content.userContentProgress.some(
                                                (progress) =>
                                                    progress.contentStatus ===
                                                    true
                                            )
                                        );

                                    return (
                                        <div key={chapter.id} className="mb-4">
                                            <h5
                                                className={`${
                                                    previousChapterCompleted
                                                        ? "text-blue-600"
                                                        : "text-gray-400"
                                                } font-semibold`}
                                            >
                                                Chapter {chapter.sort}{" "}
                                                {chapter.chapterTitle}
                                            </h5>
                                            {chapter.contents?.map(
                                                (content, index) => {
                                                    const isLocked =
                                                        !previousChapterCompleted;

                                                    return (
                                                        <li
                                                            key={content.id}
                                                            className={`flex justify-between items-center ${
                                                                isLocked
                                                                    ? "text-gray-400"
                                                                    : "text-gray-700"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span
                                                                    className={`rounded-full h-8 w-8 flex items-center justify-center ${
                                                                        isLocked
                                                                            ? "bg-gray-200 text-gray-400"
                                                                            : "bg-blue-200 text-blue-800"
                                                                    }`}
                                                                >
                                                                    {index + 1}
                                                                </span>
                                                                {isLocked ? (
                                                                    <span className="text-gray-400">
                                                                        {
                                                                            content.contentTitle
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <Link
                                                                        to="#"
                                                                        onClick={() =>
                                                                            handleContentClick(
                                                                                content
                                                                            )
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {
                                                                                content.contentTitle
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                            <span className="text-green-500">
                                                                {isLocked
                                                                    ? "🔒"
                                                                    : "▶"}
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </div>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                </aside>
            </div>
            <Footer />
        </>
    );
};

export default MulaiKelas;
