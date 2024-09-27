import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const UbahPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const passwordValidation = {
    length: newPassword.length >= 8,
    capital: /[A-Z]/.test(newPassword),
    number: /\d/.test(newPassword),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <main className="flex-grow p-10 bg-white">
        <h1 className="text-2xl font-bold mb-8">Ubah Password</h1>
        <form className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-gray-700">Password Lama</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-0 px-3 text-gray-500"
              >
                {showOldPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700">Password Baru</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 px-3 text-gray-500"
              >
                {showNewPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700">Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-md mt-6">
            <ul className="text-sm space-y-1">
              <li className={passwordValidation.length ? "text-green-500" : "text-red-500"}>*Minimal 8 karakter</li>
              <li className={passwordValidation.capital ? "text-green-500" : "text-red-500"}>*Tambahkan huruf kapital</li>
              <li className={passwordValidation.number ? "text-green-500" : "text-red-500"}>*Gunakan huruf dan angka</li>
              <li className={passwordValidation.symbol ? "text-green-500" : "text-red-500"}>*Gunakan simbol</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isPasswordValid || newPassword !== confirmPassword}
            className={`w-full py-2 bg-blue-900 text-white rounded-full ${
              (!isPasswordValid || newPassword !== confirmPassword) && "opacity-50 cursor-not-allowed"
            }`}
          >
            Simpan
          </button>
        </form>
      </main>
    </div>
  );
};

export default UbahPassword;