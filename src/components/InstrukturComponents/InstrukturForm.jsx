import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const InstrukturForm = ({ show, onClose, existingData, isEditMode, handleSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    city: "",
    phoneNumber: "",
    tanggalLahir: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        fullName: existingData.fullName || "",
        country: existingData.country || "",
        city: existingData.city || "",
        phoneNumber: existingData.phoneNumber || "",
        tanggalLahir: existingData.tanggalLahir || "",
        email: existingData.email || "",
        password: "" // Tidak ada prefilled untuk password
      });
    } else {
      setFormData({
        fullName: "",
        country: "",
        city: "",
        phoneNumber: "",
        tanggalLahir: "",
        email: "",
        password: ""
      });
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

  const handleUpdate = (e) => {
    e.preventDefault();
    handleSubmit(formData);
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

        <form handleSubmit={handleUpdate}>
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
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan password"
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

InstrukturForm.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
  isEditMode: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default InstrukturForm;