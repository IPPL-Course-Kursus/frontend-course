import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InstrukturForm = ({
  show,
  onClose,
  existingData,
  isEditMode,
  onSubmit,
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneError) return; // Prevent submission if there's an error
    onSubmit(formData);
    onClose();
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Check if the button should be disabled
  const isSubmitDisabled = phoneError;

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
              className={`w-full p-2 border rounded-xl ${phoneError ? 'border-red-500' : ''}`}
              placeholder="Masukkan nomor telepon"
              required
            />
            {phoneError && (
              <p className="text-red-500 font-medium text-sm mt-1">{phoneError}</p>
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
                className="w-full p-2 border rounded-xl"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                aria-label="toggle password visibility"
                onClick={togglePassword}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 border rounded-lg"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`py-2 px-6 bg-[#0a61aa] text-white rounded-xl transition-colors duration-300 ${isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#1A73E8] active:bg-[#084D8C]"}`}
              disabled={isSubmitDisabled} // Disable if there's an error
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
