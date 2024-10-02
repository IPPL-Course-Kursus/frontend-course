import React, { useState } from 'react';

const AdminDataKategori = () => {
  const categories = [
    { id: 1, name: 'Web Development', photo: "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg", published: true, pengajar: 'John Doe' },
    { id: 2, name: 'UI/UX Design', photo: "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg", published: true, pengajar: 'Jane Smith' },
    { id: 3, name: 'Android Development', photo: "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg", published: true, pengajar: 'John Doe' },
    { id: 4, name: 'Data Science', photo: "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg", published: true, pengajar: 'Jane Smith' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State untuk modal hapus
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null); // State untuk kategori yang akan dihapus
  const [filePreview, setFilePreview] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFilePreview(category.photo);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setFilePreview(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
        setCurrentCategory({ ...currentCategory, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setShowModal(false);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category); // Set kategori yang akan dihapus
    setShowDeleteModal(true); // Tampilkan modal konfirmasi hapus
  };

  const confirmDelete = () => {
    // Logika untuk menghapus kategori (misal, kirim permintaan delete ke API)
    console.log('Hapus kategori:', categoryToDelete);
    setShowDeleteModal(false); // Tutup modal setelah konfirmasi
  };

  return (
    <div className="admin-data-kategori">
      <h2 className="text-4xl font-bold text-gray-900">
        Data Kategori Kelas
        <button
          className="w-40 font-bold text-white text-sm bg-blue-800 hover:bg-blue-600 md:text-base mx-1 mt-2 px-4 py-2 rounded-full shadow-lg float-right flex items-center justify-center"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span className="ml-2">Tambah</span>
        </button>
      </h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Url Photo</th>
            <th>Published</th>
            <th>Pengajar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="font-bold">{category.id}</td>
              <td className="font-bold">{category.name}</td>
              <td>
                <img src={category.photo} alt={category.name} className="category-photo" />
              </td>
              <td className="font-bold">{category.published ? 'true' : 'false'}</td>
              <td className="font-bold">{category.pengajar}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(category)}>Ubah</button>
                <button className="delete-button" onClick={() => handleDelete(category)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal untuk Tambah/Edit */}
      {showModal ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-2/3 h- p-6 rounded-3xl shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={toggleModal}
            >
              &#x2716;
            </button>
            <h2 className="text-center text-2xl font-bold mb-4 text-blue-600 mt-5">
              {isEditMode ? 'Edit Kategori' : 'Tambah Kategori'}
            </h2>
            <form className="max-w-lg mx-auto">
              <div className="mb-8 rounded-3xl">
                <label className="block text-gray-700">Nama Kategori</label>
                <input
                  type="text"
                  value={currentCategory ? currentCategory.name : ''}
                  className="w-full border rounded px-3 py-2 mt-1"
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-4 rounded-3xl">
                <label className="block text-gray-700">Upload Gambar</label>
                <input
                  type="file"
                  className="w-full border rounded px-3 py-2 mt-1"
                  onChange={handleFileChange}
                />
              </div>

              {/* Preview gambar */}
              {filePreview && (
                <div className="mb-4">
                  <img src={filePreview} alt="Preview" className="w-full h-24 object-contain rounded-md" />
                </div>
              )}

              <div className="mb-4 rounded-3xl">
                <label className="block text-gray-700">Pengajar</label>
                <select
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={currentCategory ? currentCategory.pengajar : ''}
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, pengajar: e.target.value })
                  }
                >
                  <option>Pilih</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  className="items-center w-52 h-10 rounded-2xl bg-blue-600 text-white font-bold py-2 shadow"
                  onClick={handleSave}
                >
                  {isEditMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
            <h2 className="text-xl font-bold text-center mb-4">Yakin hapus data?</h2>
            <div className="flex justify-around mt-6">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-full font-bold"
                onClick={confirmDelete}
              >
                Hapus
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded-full font-bold"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDataKategori;
