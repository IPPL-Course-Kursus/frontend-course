import React, { useState } from 'react';

const AdminDataInstuktur = () => {
  // Data instruktur
  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Benedicta', photoUrl: '/path/to/photo1.jpg' },
    { id: 2, name: 'Benedicta', photoUrl: '/path/to/photo2.jpg' },
    { id: 3, name: 'Benedicta', photoUrl: '/path/to/photo3.jpg' },
    { id: 4, name: 'Benedicta', photoUrl: '/path/to/photo4.jpg' }
  ]);

  // State untuk kontrol popup
  const [showPopup, setShowPopup] = useState(false);

  // Fungsi untuk menangani toggle popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Fungsi untuk menangani penambahan instruktur (dummy untuk sementara)
  const handleAddInstructor = (e) => {
    e.preventDefault();
    // Logic penambahan instruktur
    setShowPopup(false); // Tutup popup setelah submit
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hi, Admin!</h1>

      {/* Tabel Instruktur */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Data Instruktur</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={togglePopup}
          >
            Tambah
          </button>
        </div>

        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Url Photo</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor.id}>
                <td className="px-4 py-2 border">{instructor.id}</td>
                <td className="px-4 py-2 border">{instructor.name}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={instructor.photoUrl}
                    alt={instructor.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <button className="bg-red-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Tambah Instruktur */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Instruktur</h2>
            <form onSubmit={handleAddInstructor}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Upload File</label>
                <input
                  type="file"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Nama Pengajar</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Masukkan Nama"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  placeholder="Masukkan Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Buat Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded"
                  placeholder="Masukkan Password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Konfirmasi Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded"
                  placeholder="Konfirmasi Password"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDataInstuktur;
