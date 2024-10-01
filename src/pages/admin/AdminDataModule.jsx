import React, { useState } from "react";

const AdminDataModule = () => {
  const modules = [
    { id: 1, title: "Pengenalan", content: 2 },
    { id: 2, title: "Dasar-Dasar HTML, CSS, & Javascript", content: 3 },
    { id: 3, title: "Pengembangan Front End Lanjutan", content: 2 },
    { id: 4, title: "Pengembangan Back End", content: 4 },
    { id: 5, title: "Integrasi Front End dan Back End", content: 2 },
    { id: 6, title: "Melakukan Deploy", content: 2 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="w-full p-8">
        <h2 className="text-3xl font-bold mb-8">Hi, Admin!</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6">Data Module Kelas</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border text-left">ID</th>
                <th className="py-2 px-4 border text-left">Judul Chapter</th>
                <th className="py-2 px-4 border text-left">Konten</th>
                <th className="py-2 px-4 border text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id} className="text-center hover:bg-gray-100 transition-all">
                  <td className="py-2 px-4 border">{module.id}</td>
                  <td className="py-2 px-4 border">{module.title}</td>
                  <td className="py-2 px-4 border">{module.content}</td>
                  <td className="py-2 px-4 border">
                    <button className="bg-red-500 text-white py-1 px-2 mx-1 rounded hover:bg-red-600">
                      Kelola
                    </button>
                    <button className="bg-yellow-500 text-white py-1 px-2 mx-1 rounded hover:bg-yellow-600">
                      Ubah
                    </button>
                    <button className="bg-red-700 text-white py-1 px-2 mx-1 rounded hover:bg-red-800">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            + Tambah
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDataModule;