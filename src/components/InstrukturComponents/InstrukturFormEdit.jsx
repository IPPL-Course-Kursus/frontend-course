import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const InstrukturFormEdit = ({ show, onClose, existingData, isEditMode, handleSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    role: "",
    tanggalLahir: "",
    city: "",
    country: ""
  });
  
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Menyimpan file yang akan diupload

  useEffect(() => {
    if (existingData) {
      setFormData({
        fullName: existingData.fullName || "",
        phoneNumber: existingData.phoneNumber || "",
        role: existingData.role || "",
        tanggalLahir: existingData.tanggalLahir || "",
        city: existingData.city || "",
        country: existingData.country || ""
      });
      setFilePreview(existingData.image || null); // Menampilkan gambar yang ada
    } else {
      setFormData({
        fullName: "",
        phoneNumber: "",
        role: "",
        tanggalLahir: "",
        city: "",
        country: ""
      });
      setFilePreview(null);
    }
  }, [existingData]);

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
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file.name, // Menggunakan nama file untuk pengiriman
      }));
      setFilePreview(photoUrl); // Preview gambar
      setSelectedFile(file); // Menyimpan file yang dipilih
    }
  };

  const submitForm = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
  
    // Membuat FormData untuk mengirim data
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    if (selectedFile) {
      formDataToSend.append("image", selectedFile); // Mengirim file gambar jika ada
    } else if (filePreview) {
      // Jika tidak ada file baru, sertakan gambar yang sudah ada
      formDataToSend.append("image", filePreview);
    }
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("tanggalLahir", formData.tanggalLahir);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("country", formData.country);
  
    // Memanggil callback handleSubmit untuk mengirim data ke backend
    handleSubmit(formData); // Panggil handleUpdate dengan FormData
    onClose();
  };
  

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">
          {isEditMode ? "Ubah Instruktur" : "Tambah Instruktur"}
        </h2>

        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload Foto</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-xl"
              accept="image/*"
              required={!isEditMode}
            />
          </div>

          {/* Preview gambar */}
          {filePreview && (
            <div className="mb-4">
              <img
                src={filePreview}
                alt="Preview"
                className="w-full h-24 object-contain rounded-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nomor Telepon</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan nomor telepon"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tanggal Lahir</label>
            <input
              type="date"
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kota</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan kota"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Negara</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan negara"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl"
            >
              {isEditMode ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

InstrukturFormEdit.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.object,
  isEditMode: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default InstrukturFormEdit;
