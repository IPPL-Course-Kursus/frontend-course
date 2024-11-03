import PropTypes from "prop-types";

const KategoriForm = ({
  show,
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
  isEditMode,
  imagePreview,
  handleImageUpload,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
        <h2 className="text-xl font-bold text-center mb-4">
          {isEditMode ? "Ubah Kategori" : "Tambah Kategori"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nama Kategori
            </label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Foto Kategori
            </label>

            {/* Display Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
            >
              {isEditMode ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

KategoriForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  imagePreview: PropTypes.string,
  handleImageUpload: PropTypes.func.isRequired,
};

export default KategoriForm;
