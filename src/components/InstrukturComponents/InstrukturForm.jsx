// File: ../../components/InstrukturComponents/InstrukturForm.jsx

import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const InstrukturForm = ({ show, onClose, existingData, isEditMode, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
  });
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (existingData) {
      setFormData({
        id: existingData.id,
        name: existingData.name,
        photoUrl: existingData.photoUrl,
      });
      setFilePreview(existingData.photoUrl);
    } else {
      setFormData({
        name: "",
        photoUrl: "",
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
        photoUrl,
      }));
      setFilePreview(photoUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Buat FormData untuk mengirim file
    const formData = new FormData();
    formData.append("name", formData.name);
    if (formData.photoUrl) {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput.files[0]) {
        formData.append("photo", fileInput.files[0]); // Ubah nama field jika perlu
      }
    }
  
    onSubmit(formData);
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

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nama Instruktur</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan nama instruktur"
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

InstrukturForm.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
  isEditMode: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default InstrukturForm;
