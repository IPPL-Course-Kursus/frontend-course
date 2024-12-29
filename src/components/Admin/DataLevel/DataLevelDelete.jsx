import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteLevelCourseById } from "../../../redux/actions/levelCourseActions";
import { toast } from "react-hot-toast";

const DataLevelDelete = ({ show, onClose, levelId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Tambahkan state loading

  const handleConfirm = () => {
    setLoading(true);
    dispatch(deleteLevelCourseById(levelId))
      .then((response) => {
        if (response?.success) {
          toast.success(response.message, {
            style: { backgroundColor: "#4BB543", color: "#fff" },
          });
          onClose();
        } else {
          toast.error("Gagal menghapus level: " + (response?.message || "Tidak diketahui"), {
            style: { backgroundColor: "#d93025", color: "#fff" },
          });
        }
      })
      .catch((error) => {
        toast.error("course level cannot delete. because he is already connected in the course", {
          style: { backgroundColor: "#d93025", color: "#fff" },
        });
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-100">
        <h2 className="text-lg font-semibold text-left mb-4">
          Konfirmasi Hapus
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Apakah Anda yakin ingin menghapus level ini?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className={`bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleConfirm}
            disabled={loading} // Disable button saat loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Hapus"
            )}
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
            onClick={onClose}
            disabled={loading} // Disable tombol Batal saat loading
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

DataLevelDelete.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  levelId: PropTypes.string.isRequired,
};

export default DataLevelDelete;