import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDataKonten,} from "../../../redux/actions/instruktorActions";

const DataKontenModule = ({ show, onClose, chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sort: "",
    contentTitle: "",
    teks: "",
    contentUrl: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "sort" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);

    const { sort, contentTitle, teks, contentUrl, duration } = formData;
    if (!sort || !contentTitle || !teks || !contentUrl || !duration) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const requestData = {
      sort: Number(sort),
      contentTitle,
      teks,
      contentUrl,
      duration: Number(duration),
    };

    dispatch(addDataKonten(requestData, chapterId))
      .then(() => {
        setLoading(false);
        onClose();
        // Reload window after successful addition
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
      <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
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
            <label className="block mb-1 font-semibold">Teks</label>
            <input
              type="text"
              name="teks"
              value={formData.teks}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan teks"
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
            <label className="block mb-1 font-semibold">Durasi</label>
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
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DataKontenModule.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  chapterId: PropTypes.string.isRequired,
};

export default DataKontenModule;

// const handleAdd = (e) => {
//   e.preventDefault();
//   setLoading(true);

//   const { sort, contentTitle, teks, contentUrl, duration } = formData;
//   if (!sort || !contentTitle || !teks || !contentUrl || !duration) {
//     alert("Please fill in all required fields.");
//     setLoading(false);
//     return;
//   }

//   const requestData = {
//     sort: Number(sort),
//     contentTitle,
//     teks,
//     contentUrl,
//     duration: Number(duration),
//   };

//   dispatch(addDataKonten(requestData, chapterId))
//     .then(() => {
//       setLoading(false);
//       onClose();
//     })
//     .catch((err) => {
//       setLoading(false);
//       setError(err.response?.data?.message || "Error adding content");
//       console.error("Error detail:", err);
//     });
// };
