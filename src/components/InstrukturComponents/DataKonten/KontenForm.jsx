import PropTypes from "prop-types";

const KontenForm = ({ show, onClose, formData, handleInputChange, handleSubmit, isEditMode }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kelas</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Urutan</label>
            <input
              type="number"
              name="sort"
              value={formData.sort}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="ex 1"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Materi</label>
            <input
              type="text"
              name="contentTitle"
              value={formData.contentTitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">teks</label>
            <input
              type="text"
              name="teks"
              value={formData.teks}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Video URL</label>
            <input
              type="text"
              name="contentUrl"
              value={formData.contentUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan Video URL"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Duration</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan durasi video"
            />
          </div>

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
    // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    //   <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
    //     <h2 className="text-xl font-bold text-center mb-4">
    //       {isEditMode ? "Ubah Kategori" : "Tambah Kategori"}
    //     </h2>
    //     <form onSubmit={handleSubmit}>
    //       {/* Sort */}
    //       <div className="mb-4">
    //         <label className="block mb-1 font-semibold">Urutan</label>
    //         <input
    //           type="number"
    //           name="sort"
    //           value={formData.sort}
    //           onChange={handleInputChange}
    //           className="w-full p-2 border rounded-xl"
    //           placeholder="ex 1"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block mb-1 font-semibold">Judul Materi</label>
    //         <input
    //           type="text"
    //           name="contentTitle"
    //           value={formData.contentTitle}
    //           onChange={handleInputChange}
    //           className="w-full p-2 border rounded-xl"
    //           placeholder="Masukkan judul kelas"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block mb-1 font-semibold">Teks</label>
    //         <input
    //           type="text"
    //           name="teks"
    //           value={formData.teks}
    //           onChange={handleInputChange}
    //           className="w-full p-2 border rounded-xl"
    //           placeholder="Masukkan judul kelas"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block mb-1 font-semibold">Video URL</label>
    //         <input
    //           type="text"
    //           name="contentUrl"
    //           value={formData.contentUrl}
    //           onChange={handleInputChange}
    //           className="w-full p-2 border rounded-xl"
    //           placeholder="Masukkan Video URL"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block mb-1 font-semibold">Durasi</label>
    //         <input
    //           type="number"
    //           name="duration"
    //           value={formData.duration}
    //           onChange={handleInputChange}
    //           className="w-full p-2 border rounded-xl"
    //           placeholder="Masukkan durasi video"
    //         />
    //       </div>

    //       {/* Buttons */}
    //       <div className="flex justify-end space-x-2">
    //         <button
    //           type="button"
    //           onClick={onClose}
    //           className="bg-gray-300 px-4 py-2 rounded-md font-semibold"
    //         >
    //           Batal
    //         </button>
    //         <button
    //           type="submit"
    //           className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
    //         >
    //           {isEditMode ? "Update" : "Tambah"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

KontenForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default KontenForm;
