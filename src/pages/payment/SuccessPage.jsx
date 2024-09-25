// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const SuccessPage = () => {
  
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
  
    const runCode = () => {
      try {
        const result = eval(code); // Menggunakan eval untuk menjalankan kode
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
      <main className="max-w-sm md:max-w-5xl mx-auto mt-10 p-4">
        {/* Header Section */}
        <div className="bg-blue-800 text-white text-center py-4 rounded-lg mb-10">
          <h1 className="text-2xl font-bold">Mulai Kelas</h1>
        </div>
  
        {/* Course Info Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-blue-600 text-3xl font-bold mb-4">UI/UX Design</h2>
          <p className="text-gray-600">Intro to Basic of User Interaction Design</p>
          <p className="text-gray-500">by Simon Doe</p>
  
          <div className="flex items-center gap-6 mt-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Beginner Level</span>
            <span className="text-gray-600">5 Modul</span>
            <span className="text-gray-600">45 Menit</span>
          </div>
  
          {/* Video Placeholder */}
          <div className="w-full bg-gray-300 h-64 mt-6 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">Video Placeholder</p>
          </div>
  
          <div className="mt-6">
            <h3 className="text-gray-700 text-xl font-semibold">Tentang Kelas</h3>
            <p className="text-gray-600 mt-2">
              Design system adalah kumpulan komponen desain, code, ataupun dokumentasi...
            </p>
          </div>
  
          <div className="mt-6">
            <h3 className="text-gray-700 text-xl font-semibold">Kelas Ini Ditujukan Untuk</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-600">
              <li>Anda yang ingin memahami prinsip dasar desain system</li>
              <li>Anda yang ingin memahami penulisan elemen</li>
              <li>Anda yang ingin lebih memahami design system</li>
            </ul>
          </div>
        </section>
  
        {/* Code Editor Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">Code Editor and Compiler</h2>
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
            <h3 className="text-gray-700 font-semibold">Output:</h3>
            <p className="text-gray-600 mt-2">{output}</p>
          </div>
        </section>
      </main>
    );
  };
  

export default SuccessPage;