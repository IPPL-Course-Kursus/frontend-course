import React, {useState} from 'react';

const AdminDataKonten = () => {
    const content = [
        { id: 1, urutan: 1, title : 'Setup Awal', video: 'ixOd42SEUF0?si=D7mUnv467Ci_01eH', durasi: '20 Menit'},
        { id: 2, urutan: 2, title : 'Tools', video: 'ixOd42SEUF0?si=D7mUnv467Ci_01eH', durasi: '20 Menit'},
    ];

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);
    const [contentToDelete, setContentToDelete] = useState(null);

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
            content.map((content) =>
              content.id === currentContent.id ? currentContent : content
            )
          );
        } else {
          setContent([...content, { ...currentContent, id: contents.length + 1 }]);
        }
        setShowModal(false);
    };
            
    const handleDelete = (content) => {
        setContentToDelete(content);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        console.log('Hapus Konten:',  contentToDelete);
        setShowDeleteModal(false);
    };


    return (
        <div className="admin-data-konten">
          <h2 className="text-4xl font-bold text-gray-900">
            Data Konten
            <button
              className="w-40 font-bold text-white text-sm bg-blue-800 hover:bg-blue-600 md:text-base mx-1 mt-2 px-4 py-2 rounded-full shadow-lg float-right flex items-center justify-center"
              onClick={handleAdd}
            >
              <span className="text-lg">+</span>
              <span className="ml-2">Tambah</span>
            </button>
          </h2>
          <table className="content-table">
            <thead>
              <tr>
                <th>id</th>
                <th>Urutan</th>
                <th>Judul Materi</th>
                <th>Video</th>
                <th>Durasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {content.map((content) => (
                <tr key={content.id}>
                  <td className="font-bold">{content.id}</td>
                  <td className="font-bold">{content.urutan}</td>
                  <td className="font-bold">{content.title}</td>
                  <td className="font-bold">{content.video}</td>
                  <td className="font-bold">{content.durasi}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(content)}>Ubah</button>
                    <button className="delete-button" onClick={() => handleDelete(content)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
};
export default AdminDataKonten