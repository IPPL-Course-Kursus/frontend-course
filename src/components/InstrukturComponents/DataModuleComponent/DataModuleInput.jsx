import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDataModule, getDataModule } from "../../../redux/actions/instruktorActions";
import LoadSpinner from "../../Spinner/LoadSpinner";
import toast from "react-hot-toast";

const DataModuleInput = ({ show, onClose, courseId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sortError, setSortError] = useState(null);
  const [chapterTitleError, setChapterTitleError] = useState(null);
  const [formData, setFormData] = useState({
    sort: "",
    chapterTitle: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "sort"
          ? value === "" // Jika kosong, set sebagai 0 atau tetap kosong
            ? 0
            : parseInt(value, 10) // Jika ada angka, lakukan parsing
          : value,
    }));
    // Reset error messages when the user starts typing
    if (name === "sort") {
      setSortError(null);
    } else if (name === "chapterTitle") {
      setChapterTitleError(null);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Reset error messages
    setSortError(null);
    setChapterTitleError(null);

    let hasError = false;

    

    if (!formData.chapterTitle) {
      setChapterTitleError("Silahkan isi judul materi");
      hasError = true;
    }

    if (hasError) return; // Jika ada error, jangan lanjut

    setLoading(true); // Set loading true sebelum proses async dimulai
    try {
      const requestData = {
        sort: Number(formData.sort),
        chapterTitle: formData.chapterTitle,
      };

      // Dispatch action untuk menambahkan modul
      await dispatch(addDataModule(requestData, courseId));
      console.log("Data module berhasil ditambahkan");

      // Show success notification
      toast.success("Modul berhasil ditambahkan");

      setLoading(false);
      onClose(); // Tutup modal setelah berhasil menambahkan
      await fetchData(); // Panggil fetchData untuk memperbarui data di state
    } catch (err) {
      setLoading(false);

      // Show error notification
      toast.error(err.response?.data?.message || "Terjadi kesalahan saat menambahkan modul");

      setSortError(err.response?.data?.message || "Error adding content");
      console.error("Error detail:", err);
    }
  };

  const fetchData = async () => {
    try {
      await dispatch(getDataModule(courseId));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-11/12 sm:w-9/12 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-screen"
      >
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kategori</h2>

        <form onSubmit={handleAdd}>
          

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Materi</label>
            <input
              type="text"
              name="chapterTitle"
              value={formData.chapterTitle}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                chapterTitleError ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="Masukkan judul kelas"
            />
            {chapterTitleError && <div className="text-red-600 mt-1">{chapterTitleError}</div>}{" "}
            {/* Tampilkan error untuk chapterTitle */}
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
              className={`bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
                loading ? "cursor-not-allowed bg-gray-500" : "hover:bg-blue-700 active:bg-blue-800"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadSpinner size={24} color="white" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Tambah"
              )}
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
