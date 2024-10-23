import PropTypes from "prop-types";
import { useState } from "react";

const DataKelasInput = ({ show, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    file: null,
    kategori: "",
    judulKelas: "",
    tipeKelas: "",
    level: "",
    harga: "",
    pengajar: "",
    ditujukanUntuk: "",
    deskripsi: "",
  });

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));

    // Generate image preview
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tambah Kelas:", formData);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kelas</h2>

        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload File</label>
            <input type="file" className="w-full p-2 border rounded-xl" />
          </div> */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-xl"
              accept="image/*"
            />
            <small className="text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</small>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kategori</label>
            <div className="relative">
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl max-w-full overflow-y-auto"
                style={{ maxHeight: "200px" }} // Atur tinggi maksimum
              >
                <option>Pilih</option>
                {Array.from({ length: 20 }, (_, index) => (
                  <option key={index}>Kategori {index + 1}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Kelas</label>
            <input
              type="text"
              name="judulKelas"
              value={formData.judulKelas}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <select
              name="tipeKelas"
              value={formData.tipeKelas}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>Pilih</option>
              <option>Free</option>
              <option>Premium</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level Kelas</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>Pilih</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advance</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Harga Kelas</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan harga kelas"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Pengajar Kelas</label>
            <select
              name="pengajar"
              value={formData.pengajar}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>Pilih</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Published</label>
            <select
              name="pengajar"
              value={formData.pengajar}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option>Pilih</option>
              <option>True</option>
              <option>False</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Ditujukan Untuk</label>
            <textarea
              name="ditujukanUntuk"
              value={formData.ditujukanUntuk}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan peserta yang dituju"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan deskripsi kelas"
            />
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
};

DataKelasInput.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DataKelasInput;
