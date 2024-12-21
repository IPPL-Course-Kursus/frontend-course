import React from "react";
import PropTypes from "prop-types";

const CategoryDelete = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
        <h2 className="text-xl font-bold text-center mb-4">
          Yakin hapus data?
        </h2>
        <div className="flex justify-around mt-6">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors duration-200"
            onClick={onConfirm}
          >
            Hapus
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-bold hover:bg-gray-400 transition-colors duration-200"
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