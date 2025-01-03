// src/components/InstrukturComponents/InstrukturForm.jsx

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Import spinner

const InstrukturForm = ({
  show,
  onClose,
  existingData,
  isEditMode,
  onSubmit,
  isAdding,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    phoneNumber: "",
    tanggalLahir: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [PassError, setPassError] = useState("");

  useEffect(() => {
    if (existingData) {
      setFormData({
        fullName: existingData.fullName || "",
        city: existingData.city || "",
        phoneNumber: existingData.phoneNumber || "",
        tanggalLahir: existingData.tanggalLahir || "",
        email: existingData.email || "",
        password: "", // Tidak ada prefilled untuk password
      });
    } else {
      setFormData({
        fullName: "",
        city: "",
        phoneNumber: "",
        tanggalLahir: "",
        email: "",
        password: "",
      });
    }
  }, [existingData]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers for phoneNumber
    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return; // Ignore non-numeric input
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate phone number length
    if (name === "phoneNumber") {
      if (value.length < 10) {
        setPhoneError("Nomor telepon harus minimal 10 karakter.");
      } else if (value.length > 15) {
        setPhoneError("Nomor telepon maksimal 15 karakter.");
      } else {
        setPhoneError("");
      }
    }

    if (name === "password") {
      if (value.length < 8) {
        setPassError("Password Minimal 8 karakter.");
      } else if (value.length > 16) {
        setPassError("Password Maksimal 16 karakter.");
      } else {
        setPassError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneError || PassError) return; // Prevent submission jika ada error
    onSubmit(formData);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Check if the button should be disabled
  const isSubmitDisabled = PassError || phoneError;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh] mx-4"
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
              className={`w-full p-2 border rounded-xl ${
                phoneError ? "border-red-500" : ""
              }`}
              placeholder="Masukkan nomor telepon"
              required
            />
            {phoneError && (
              <p className="text-red-500 font-medium text-sm mt-1">
                {phoneError}
              </p>
            )}
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 pr-10 border rounded-xl ${
                  PassError ? "border-red-500" : ""
                }`}
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                aria-label="toggle password visibility"
                onClick={togglePassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                style={{ pointerEvents: "auto" }}
              >
                {showPassword ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </button>
              {PassError && (
                <p className="text-red-500 font-medium text-sm mt-1 absolute bottom-[-1.5rem]">
                  {PassError}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`flex items-center justify-center py-2 px-6 bg-[#0a61aa] text-white rounded-xl transition-colors duration-300 ${
                isSubmitDisabled || isAdding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-[#1A73E8] active:bg-[#084D8C]"
              }`}
              disabled={isSubmitDisabled || isAdding} // Disable jika ada error atau sedang menambahkan
            >
              {isAdding ? (
                <>
                  <ClipLoader size={20} color="#ffffff" />
                  <span className="ml-2">Memproses...</span>
                </>
              ) : isEditMode ? (
                "Update"
              ) : (
                "Tambah"
              )}
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
  isAdding: PropTypes.bool,
};

export default InstrukturForm;
