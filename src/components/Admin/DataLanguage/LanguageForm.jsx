import React from "react";
import PropTypes from "prop-types";

const LanguageForm = ({
  show,
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
  isEditMode,
  isSubmitDisabled,
  isSubmitting,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
        <h2 className="text-xl font-bold text-center mb-4">
          {isEditMode ? "Ubah Bahasa Interpreter" : "Tambah Bahasa Interpreter"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Language Name */}
          <div className="mb-4">
            <label
              htmlFor="languageInterpreter"
              className="block text-sm font-medium text-gray-700"
            >
              Bahasa Interpreter <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="languageInterpreter"
              name="languageInterpreter"
              value={formData.languageInterpreter}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Masukkan Bahasa Interpreter"
            />
          </div>

          {/* Version */}
          <div className="mb-4">
            <label
              htmlFor="version"
              className="block text-sm font-medium text-gray-700"
            >
              Versi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="version"
              name="version"
              value={formData.version}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Masukkan Versi Bahasa"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md font-semibold hover:bg-gray-400 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled || isSubmitting} // Disable based on validation or submission
              className={`px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 ${
                isSubmitDisabled || isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting
                ? "Loading..."
                : isEditMode
                ? "Update"
                : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

LanguageForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    languageInterpreter: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  imagePreview: PropTypes.string,
  isSubmitDisabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

export default LanguageForm;
