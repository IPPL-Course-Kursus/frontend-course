import React, { useState } from 'react';

const AdminDataKonten = () => {
    const [content, setContent] = useState([
        { id: 1, urutan: 1, title: 'Setup Awal', video: 'ixOd42SEUF0?si=D7mUnv467Ci_01eH', durasi: '20 Menit' },
        { id: 2, urutan: 2, title: 'Tools', video: 'ixOd42SEUF0?si=D7mUnv467Ci_01eH', durasi: '20 Menit' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);
    const [contentToDelete, setContentToDelete] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    const handleAdd = () => {
        setCurrentContent(null);
        setIsEditMode(false);
        setShowModal(true);
    };

    const handleEdit = (content) => {
        setCurrentContent(content);
        setIsEditMode(true);
        setShowModal(true);
    };

    const handleSave = () => {
        if (isEditMode) {
            setContent(
                content.map((c) =>
                    c.id === currentContent.id ? currentContent : c
                )
            );
        } else {
            setContent([...content, { ...currentContent, id: content.length + 1 }]);
        }
        setShowModal(false);
    };

    const handleDelete = (content) => {
        setContentToDelete(content);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        console.log('Hapus Konten:', contentToDelete);
        setShowDeleteModal(false);
    };

    const handleDetail = (content) => {
        setCurrentContent(content);
        setShowDetailModal(true);
    };

    const toggleDetailModal = () => setShowDetailModal(!showDetailModal);

    return (
      <div className="flex min-h-screen bg-white">
        <main className="flex-grow p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-lg p-4 relative min-h-[80vh] flex flex-col">
            <header className="mb-10">
            <h2 className="text-2xl md:text-3x1 font-bold text-blue-800 bg-blue-50 p-8 mb-5 rounded">Hi, Admin!</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
            <h3 className="text-xl md:text-2xl font-bold">Data Konten</h3>
            <button
              className="w-full md:w-40 font-bold text-white text-sm bg-blue-800 hover:bg-blue-600 md:text-base mx-1 mt-2 px-4 py-2 rounded-full shadow-lg flex items-center justify-center"
              onClick={handleAdd}
            >
              <span className="text-lg">+</span>
              <span className="ml-2">Tambah</span>
            </button>
            </div>
            </header>

            <table className="content-table w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="font-normal px-4 py-3">ID</th>
                  <th className="font-normal text-left px-4 py-3 md:px-4">Urutan</th>
                  <th className="font-normal text-left px-4 py-3 md:px-4">Judul Materi</th>
                  <th className="font-normal text-left px-4 py-3 md:px-4">Video</th>
                  <th className="font-normal text-left px-4 py-3 md:px-4">Durasi</th>
                  <th className="font-normal text-left px-4 py-3 md:px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {content.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-100 text-center transition-all">
                  <td className="font-bold px-4 py-3 md:px-4">{c.id}</td>
                  <td className="font-bold text-left px-4 py-3 md:px-4">{c.urutan}</td>
                  <td className="font-normal text-left px-4 py-3 md:px-4">{c.title}</td>
                  <td className="font-bold text-left px-4 py-3 md:px-4">{c.video}</td>
                  <td className="font-bold text-left px-4 py-3 md:px-4">{c.durasi}</td>
                  <td className="text-left px-4 py-3 md:px-4">
                    
                    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                      <button
                      className="bg-red-600 hover:bg-red-600 text-black font-semibold py-1 px-3 rounded"
                      onClick={() => handleEdit(c)}
                      >
                      Ubah
                      </button>
                      <button
                      className="bg-red-600 hover:bg-red-600 text-black font-semibold py-1 px-3 rounded"
                      onClick={() => handleDetail(c)}
                      >
                      Detail
                      </button>
                      <button
                      className="bg-red-600 hover:bg-red-600 text-black font-semibold py-1 px-3 rounded"
                      onClick={() => handleDelete(c)}
                      >
                      Hapus
                      </button>
                    </div>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Modal untuk Tambah/Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-11/12 md:w-2/3 p-6 rounded-3xl shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={toggleModal}
              >
                 &#x2716;
              </button>
              <h2 className="text-center text-xl md:text-2xl font-bold mb-4 text-blue-600 mt-5">
                {isEditMode ? 'Edit Konten' : 'Tambah Konten'}
              </h2>
              <form className="max-w-lg mx-auto">
                <div className="mb-4">
                  <label className="block text-gray-700">Judul Materi</label>
                  <input
                    type="text"
                    value={currentContent ? currentContent.title : ''}
                    className="w-full border rounded px-3 py-2 mt-1"
                    onChange={(e) =>
                      setCurrentContent({ ...currentContent, title: e.target.value })
                    }
                  />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">URL Video</label>
                    <input
                      type="text"
                      value={currentContent ? currentContent.video : ''}
                      className="w-full border rounded px-3 py-2 mt-1"
                      onChange={(e) =>
                        setCurrentContent({ ...currentContent, video: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Durasi Video</label>
                    <input
                      type="text"
                      value={currentContent ? currentContent.durasi : ''}
                      className="w-full border rounded px-3 py-2 mt-1"
                      onChange={(e) =>
                        setCurrentContent({ ...currentContent, durasi: e.target.value })
                      }
                    />
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
        )}

        {/* Modal Detail Kelas */}
        {showDetailModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-3/4 md:w-1/2 h-auto p-4 rounded-3xl shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={toggleDetailModal}
              >
                &#x2716;
              </button>
              <h2 className="text-center text-xl md:text-2xl font-bold mb-6 text-blue-600">
                Detail Kelas
              </h2>
              <form className="max-w-lg mx-auto">
                {/* Id Konten */}
                <div className="mb-4">
                  <label className="block text-gray-700">Id Konten</label>
                  <input
                    type="text"
                    value={currentContent.id}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    readOnly
                  />
                </div>

                {/* Judul Konten */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Judul Konten</label>
                    <input
                      type="text"
                      value={currentContent.title}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      readOnly
                    />
                  </div>

                {/* Urutan Konten */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Urutan Konten</label>
                    <input
                      type="text"
                      value={currentContent.urutan}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      readOnly
                    />
                  </div>

                {/* Video Konten */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Video Konten</label>
                      <div className="w-full h-40 rounded-lg overflow-hidden mt-1">
                        <img
                          src={currentContent.thumbnailUrl}
                          alt="Video Thumbnail"
                          className="object-cover w-full h-full"
                        />
                      </div>
                  </div>

                {/* Durasi Konten */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Durasi Konten</label>
                    <input
                      type="text"
                      value={currentContent.durasi}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      readOnly
                    />
                  </div>

                {/* Published */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Published</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      readOnly
                    />
                  </div>

                {/* Id Kelas */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Id Kelas</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      readOnly
                    />
                  </div>

                {/* Id Module */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Id Module</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      readOnly
                    />
                  </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}

export default AdminDataKonten;
