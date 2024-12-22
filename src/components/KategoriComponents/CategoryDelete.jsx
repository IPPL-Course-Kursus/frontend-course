import React from "react";
import PropTypes from "prop-types";

const CategoryDelete = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-100">
        <h2 className="text-lg font-semibold text-left mb-4">
          Konfirmasi Hapus
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Apakah Anda yakin ingin menghapus konten ini?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
            onClick={onConfirm}
          >
            Hapus
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

CategoryDelete.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CategoryDelete;
