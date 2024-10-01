// eslint-disable-next-line no-unused-vars
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
  const [isEditing, setIsEditing] = useState(false);
  const [editInstructorId, setEditInstructorId] = useState(null);

  // State untuk menyimpan instruktur baru atau yang sedang di-edit
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null
  });

  // Fungsi untuk menangani toggle popup (tambah dan edit)
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Fungsi untuk menangani file upload
  const handleFileChange = (e) => {
    setNewInstructor((prevState) => ({
      ...prevState,
      photo: URL.createObjectURL(e.target.files[0])
    }));
  };

  // Fungsi untuk menambah instruktur baru
  const handleAddInstructor = (e) => {
    e.preventDefault();
    if (newInstructor.password !== newInstructor.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }
    const newId = instructors.length + 1;
    const newInstructorData = {
      id: newId,
      name: newInstructor.name,
      photoUrl: newInstructor.photo
    };

    setInstructors([...instructors, newInstructorData]);

    // Reset form dan tutup popup
    resetForm();
    setShowPopup(false);
  };

  // Fungsi untuk menghapus instruktur
  const handleDeleteInstructor = (id) => {
    const updatedInstructors = instructors.filter((instructor) => instructor.id !== id);
    setInstructors(updatedInstructors);
  };

  // Fungsi untuk membuka popup edit instruktur
  const handleEditInstructor = (instructor) => {
    setNewInstructor({
      name: instructor.name,
      email: '',
      password: '',
      confirmPassword: '',
      photo: instructor.photoUrl
    });
    setEditInstructorId(instructor.id);
    setIsEditing(true);
    setShowPopup(true);
  };

  // Fungsi untuk menyimpan perubahan edit instruktur
  const handleSaveEditInstructor = (e) => {
    e.preventDefault();
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id === editInstructorId
        ? { ...instructor, name: newInstructor.name, photoUrl: newInstructor.photo || instructor.photoUrl }
        : instructor
    );
    setInstructors(updatedInstructors);
    resetForm();
    setShowPopup(false);
    setIsEditing(false);
  };

  // Fungsi untuk mereset form
  const resetForm = () => {
    setNewInstructor({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      photo: null
    });
    setEditInstructorId(null);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hi, Admin!</h1>

      {/* Tabel Instruktur */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Data Instruktur</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
            onClick={() => {
              resetForm();
              togglePopup();
            }}
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
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditInstructor(instructor)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
                <label className="block text-sm mb-2">Upload File</label>
                <input
                  type="file"
                  className="w-full border p-2 rounded"
                  onChange={handleFileChange}
                  required={!isEditing} // Required hanya saat tambah
                />
              </div>
      
