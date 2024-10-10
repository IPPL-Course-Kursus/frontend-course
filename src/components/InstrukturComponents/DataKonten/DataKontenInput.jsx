import { useState } from "react";
import PropTypes from "prop-types";

function DataKontenInput({ show, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    Judulmateri: "",
    videoURL: "",
    durasi: "",
  });

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Panggil onAdd untuk menambahkan data
    onClose(); // Tutup modal setelah data ditambahkan
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg max-h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Data Konten</h2>

        <form onSubmit={handleSubmit}>
          {/* Judul Materi Input */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Materi</label>
            <input
              type="input"
              name="Judulmateri"
              value={formData.Judulmateri}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
            />
          </div>

          {/* Video URL Input */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Video URL</label>
            <input
              type="input"
              name="videoURL"
              value={formData.videoURL}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan Video URL"
            />
          </div>

          {/* Durasi Input */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Durasi</label>
            <input
              type="input"
              name="durasi"
              value={formData.durasi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan durasi video"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kategori</label>
            <select
              name="published"
              value={formData.published}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>Pilih</option>
              <option>True</option>
              <option>False</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

DataKontenInput.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onAdd: PropTypes.func, // Tambahkan propTypes untuk onAdd
};

export default DataKontenInput;
