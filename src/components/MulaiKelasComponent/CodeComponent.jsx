import { useState } from "react";

const CodeComponent = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      const result = eval(code); // Menjalankan kode yang dimasukkan
      setOutput(result || "Code ran successfully");
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Kode berhasil disalin!");
  };

  const resetCode = () => {
    setCode("");
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-800 p-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-white font-bold">LOGO</div>
          <div>
            <input
              type="text"
              placeholder="Cari Kursus terbaik..."
              className="rounded-full px-4 py-2"
            />
            <button className="bg-white text-blue-800 rounded-full px-4 py-2 ml-2">Kelas</button>
          </div>
        </div>
      </nav>

      {/* Course Content */}
      <div className="container mx-auto mt-8 flex gap-8">
        {/* Left Section (Course Info) */}
        <div className="w-3/4 bg-white p-6 shadow-lg rounded-lg">
          <div>
            <h2 className="text-blue-600 text-xl font-bold">UI/UX Design</h2>
            <p className="text-gray-600">Intro to Basic of User Interaction Design</p>
            <p className="text-gray-500">by Simon Doe</p>
          </div>

          {/* Course Metadata */}
          <div className="flex items-center gap-6 mt-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              Beginner Level
            </span>
            <span className="text-gray-600">5 Modul</span>
            <span className="text-gray-600">45 Menit</span>
          </div>

          {/* Video Placeholder */}
          <div className="w-full bg-gray-300 h-64 mt-6 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">Video Placeholder</p>
          </div>

          {/* Tentang Kelas Section */}
          <div className="mt-6">
            <h3 className="text-gray-700 text-xl font-semibold">Tentang Kelas</h3>
            <p className="text-gray-600 mt-2">
              Design system adalah kumpulan komponen desain, code, ataupun dokumentasi...
            </p>
          </div>

          {/* Target Audience Section */}
          <div className="mt-6">
            <h3 className="text-gray-700 text-xl font-semibold">Kelas Ini Ditujukan Untuk</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-600">
              <li>Anda yang ingin memahami prinsip dasar desain system</li>
              <li>Anda yang ingin memahami penulisan elemen</li>
              <li>Anda yang ingin lebih memahami design system</li>
            </ul>
          </div>
        </div>

        {/* Right Section (Materi Belajar) */}
        <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-gray-700 text-xl font-semibold">Materi Belajar</h3>

          <div className="mt-4">
            <p className="text-gray-600 font-bold">Chapter 1 - Pendahuluan</p>
            <ul className="ml-4 mt-2">
              <li className="flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full">
                  1
                </span>
                <p className="text-gray-600">Lorem Ipsum</p>
                <span className="ml-auto text-gray-500">✔️</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full">
                  2
                </span>
                <p className="text-gray-600">Lorem Ipsum</p>
                <span className="ml-auto text-gray-500">✔️</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full">
                  3
                </span>
                <p className="text-gray-600">Lorem Ipsum</p>
                <span className="ml-auto text-gray-500">🔒</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 font-bold">Chapter 2 - Memulai Desain</p>
            <ul className="ml-4 mt-2">
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full">
                  1
                </span>
                <p className="text-gray-600">Lorem Ipsum</p>
                <span className="ml-auto text-gray-500">🔒</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full">
                  2
                </span>
                <p className="text-gray-600">Lorem Ipsum</p>
                <span className="ml-auto text-gray-500">🔒</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full">
                  3
                </span>
                <p className="text-gray-600">Lorem Ipsum</p>
                <span className="ml-auto text-gray-500">🔒</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Code Editor and Compiler</h2>
        <textarea
          className="w-full h-48 mt-4 p-4 border-2 border-gray-300 rounded-md"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        ></textarea>

        <div className="mt-4 flex gap-4">
          <button
            className="btn-run bg-green-500 text-white py-2 px-4 rounded-md"
            onClick={runCode}
          >
            Run Code
          </button>
          <button
            className="btn-copy bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={copyCode}
          >
            Copy Code
          </button>
          <button
            className="btn-reset bg-red-500 text-white py-2 px-4 rounded-md"
            onClick={resetCode}
          >
            Reset Code
          </button>
        </div>

        <div className="output mt-4 p-4 bg-gray-100 border-2 border-gray-300 rounded-md">
          {output}
        </div>
      </div>
    </div>
  );
};

export default CodeComponent;
