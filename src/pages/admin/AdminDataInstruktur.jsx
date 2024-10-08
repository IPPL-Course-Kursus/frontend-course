// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import SideBar from "../../components/Sidebar/SidebarAdmin";
const AdminDataInstruktur = () => {
  // Data instruktur
  const [instructors, setInstructors] = useState([
    { id: 1, name: 'Benedicta', photoUrl: '/path/to/photo1.jpg' },
    { id: 2, name: 'John', photoUrl: '/path/to/photo2.jpg' },
    { id: 3, name: 'Sarah', photoUrl: '/path/to/photo3.jpg' },
    { id: 4, name: 'Michael', photoUrl: '/path/to/photo4.jpg' }
  ]);

  // State untuk kontrol popup tambah/edit
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    photoUrl: ''
  });

  // Fungsi untuk toggle popup tambah/edit
  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setNewInstructor({ name: '', photoUrl: '' });
      setIsEditing(false);
    }
  };

  // Fungsi untuk menangani input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor({ ...newInstructor, [name]: value });
  };

  // Fungsi untuk menangani file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const photoUrl = URL.createObjectURL(file);
    setNewInstructor({ ...newInstructor, photoUrl });
  };

  // Fungsi untuk tambah instruktur
  const handleAddInstructor = (e) => {
    e.preventDefault();
    const newId = instructors.length + 1;
    setInstructors([...instructors, { id: newId, ...newInstructor }]);
    togglePopup(); // Tutup popup setelah submit
  };

  // Fungsi untuk hapus instruktur
  const handleDeleteInstructor = (id) => {
    const updatedInstructors = instructors.filter((instructor) => instructor.id !== id);
    setInstructors(updatedInstructors);
  };

  // Fungsi untuk membuka form edit instruktur
  const handleEditInstructor = (instructor) => {
    setIsEditing(true);
    setCurrentInstructor(instructor);
    setNewInstructor(instructor);
    setShowPopup(true);
  };

  // Fungsi untuk menyimpan perubahan setelah edit
  const handleSaveEditInstructor = (e) => {
    e.preventDefault();
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id === currentInstructor.id ? newInstructor : instructor
    );
    setInstructors(updatedInstructors);
    togglePopup(); // Tutup popup setelah simpan perubahan
  };

  return (
    <>
    <div className='flex'>
    <SideBar/>
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

        <table className="min-w-full bg-white">
          <thead className="bg-[#F3F7FB] text-black">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Foto</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{instructor.id}</td>
                <td className="px-4 py-2 text-center">{instructor.name}</td>
                <td className="px-4 py-2 text-center">
                  <img
                    src={instructor.photoUrl}
                    alt={instructor.name}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEditInstructor(instructor)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteInstructor(instructor.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Tambah/Edit Instruktur */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Instruktur' : 'Tambah Instruktur'}
            </h2>
            <form onSubmit={isEditing ? handleSaveEditInstructor : handleAddInstructor}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Upload Foto</label>
                <input
                  type="file"
                  className="w-full border p-2 rounded"
                  onChange={handleFileChange}
                  required={!isEditing} // Required hanya saat tambah instruktur
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Nama Pengajar</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border p-2 rounded"
                  value={newInstructor.name}
                  onChange={handleChange}
                  placeholder="Masukkan Nama"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                {isEditing ? 'Simpan Perubahan' : 'Simpan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default AdminDataInstruktur;
