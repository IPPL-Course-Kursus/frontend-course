import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updateDataKonten } from "../../../redux/actions/instruktorActions";
import { useDispatch } from "react-redux";

function DataKontenUbah({ show, onClose, existingData }) {
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

  useEffect(() => {
    if (existingData) {
      setFormData({
        sort: existingData.sort || "",
        contentTitle: existingData.contentTitle || "",
        teks: existingData.teks || "",
        contentUrl: existingData.contentUrl || "",
        duration: existingData.duration || "",
      });
    }
  }, [existingData]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  const payload = {
    sort: formData.sort,
    contentTitle: formData.contentTitle,
    teks: formData.teks,
    contentUrl: formData.contentUrl,
    duration: formData.duration,
  };

  console.log("Updating with payload:", payload);

  try {
    await dispatch(updateDataKonten(existingData.id, payload));
    onClose();
    window.location.reload();
  } catch (error) {
    console.error("Failed to update data:", error.response?.data || error.message);
    if (error.response) {
      setError(`Error: ${error.response.data.message || 'Failed to update data. Please try again.'}`);
    } else {
      setError("Failed to update data. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Ubah Konten</h2>

        <form onSubmit={handleUpdate}>
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
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
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
              disabled={loading} // Disable button while loading
            >
              {loading ? "Mengupdate..." : "Ubah"} {/* Change button text based on loading state */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

DataKontenUbah.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
};

export default DataKontenUbah;
