import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const InstrukturForm = ({ show, onClose, existingData, isEditMode, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    image: "",
  });

  useEffect(() => {
    if (isEditMode && existingData) {
      setFormData(existingData);  // Set form data jika dalam mode edit
    }
  }, [isEditMode, existingData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Kirim data form ke fungsi onSubmit
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditMode ? "Ubah Instruktur" : "Tambah Instruktur"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              URL Foto
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 bg-gray-500 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              {isEditMode ? "Simpan Perubahan" : "Tambah Instruktur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

InstrukturForm.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.object,
  isEditMode: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InstrukturForm;
