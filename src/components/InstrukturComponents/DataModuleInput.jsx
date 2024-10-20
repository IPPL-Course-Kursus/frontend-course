import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDataModule } from "../../redux/actions/instruktorActions";

const DataModuleInput = ({ show, onClose, courseId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    sort: "",
    chapterTitle: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "sort" ? Number(value) : value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);

    const { sort, chapterTitle } = formData;
    if (!sort || !chapterTitle) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const requestData = {
      sort: Number(sort),
      chapterTitle,
    };

    dispatch(addDataModule(requestData, courseId))
      .then(() => {
        console.log("Data module berhasil ditambahkan");
        setLoading(false);
        onClose();
        // Reload window after adding the data
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.message || "Error adding content");
        console.error("Error detail:", err);
      });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg h-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kategori</h2>

        {/* Display loading indicator */}
        {loading && <div className="mb-4 text-center text-blue-600">Loading...</div>}

        {/* Display error message */}
        {error && <div className="mb-4 text-center text-red-600">{error}</div>}

        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Urutan</label>
            <input
              type="text"
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
              name="chapterTitle"
              value={formData.chapterTitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
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
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DataModuleInput.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default DataModuleInput;
