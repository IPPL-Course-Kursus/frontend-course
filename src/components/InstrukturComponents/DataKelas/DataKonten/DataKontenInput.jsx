import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataKonten,
  compileCode,
  getDataKonten,
} from "../../../../redux/actions/instruktorActions";
import CodeMirror from "@uiw/react-codemirror"; // Adjust import if necessary
import { githubLight } from "@uiw/codemirror-theme-github";
import { python } from "@codemirror/lang-python";
import LoadSpinner from "../../../Spinner/LoadSpinner";
import { fetchLanguages } from "../../../../redux/actions/adminDataInterLangActions";

const DataKontenModule = ({ show, onClose, chapterId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(""); // Ensure this is managed
  const [sourceCode, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [formData, setFormData] = useState({
    sort: "",
    contentTitle: "",
    teks: "",
    contentUrl: "",
    duration: "",
    interpreterStatus: false,
  });

  const [sortError, setSortError] = useState(null);
  const [contentTitleError, setContentTitleError] = useState(null);
  const [teksError, setTeksError] = useState(null);
  const [contentUrlError, setContentUrlError] = useState(null);
  const [durationError, setDurationError] = useState(null);
  const [interpreterError, setInterpreterError] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState("Pilih Bahasa"); // State untuk bahasa yang dipilih
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk membuka/menutup dropdown
  const { languages } = useSelector((state) => state.interpreterLanguages);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked // Jika checkbox, set nilai menjadi true/false
          : ["sort", "duration"].includes(name) // Input angka
          ? value === ""
            ? 0 // Jika kosong, set sebagai 0
            : parseInt(value, 10) // Parsing angka jika ada nilai
          : value, // Untuk input teks, gunakan nilai langsung
    }));

    // Hapus pesan error saat pengguna mengetik
    if (error) setError(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Reset error messages
    setSortError(null);
    setContentTitleError(null);
    setTeksError(null);
    setContentUrlError(null);
    setDurationError(null);
    setInterpreterError(null);

    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true);
    try {
      const requestData = {
        sort: Number(formData.sort),
        contentTitle: formData.contentTitle,
        teks: formData.teks,
        contentUrl: formData.contentUrl,
        duration: Number(formData.duration),
        interpreterStatus: formData.interpreterStatus,
        sourceCode: formData.interpreterStatus ? sourceCode : null,
        language: formData.interpreterStatus ? language : null,
      };

      // Dispatch action untuk menambahkan konten
      await dispatch(addDataKonten(requestData, chapterId));
      console.log("Data konten berhasil ditambahkan");

      setLoading(false);
      onClose(); // Tutup modal setelah berhasil menambahkan
      await fetchData(); // Panggil fetchData untuk memperbarui data di state tanpa refresh halaman
    } catch (err) {
      setLoading(false);
      setSortError(err.response?.data?.message || "Error adding content");
      console.error("Error detail:", err);
    }
  };

  const validateInputs = () => {
    let errors = {};

    if (!formData.sort) errors.sortError = "Silahkan isi urutan";
    else if (isNaN(formData.sort)) errors.sortError = "Urutan harus berupa angka!";

    if (!formData.contentTitle) errors.contentTitleError = "Silahkan isi judul konten";

    if (!formData.teks) errors.teksError = "Silahkan isi teks konten";

    if (!formData.contentUrl) errors.contentUrlError = "Silahkan isi URL konten";

    if (!formData.duration) errors.durationError = "Silahkan isi durasi";
    else if (isNaN(formData.duration)) errors.durationError = "Durasi harus berupa angka!";

    if (formData.interpreterStatus && (!sourceCode || !language)) {
      errors.interpreterError = "Interpreter harus aktif dan kode sumber serta bahasa harus diisi.";
    }

    setSortError(errors.sortError || null);
    setContentTitleError(errors.contentTitleError || null);
    setTeksError(errors.teksError || null);
    setContentUrlError(errors.contentUrlError || null);
    setDurationError(errors.durationError || null);
    setInterpreterError(errors.interpreterError || null);

    return Object.keys(errors).length === 0; // True jika tidak ada error
  };

  const fetchData = async () => {
    try {
      await dispatch(getDataKonten(chapterId));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.languageInterpreter);
    setIsDropdownOpen(false);
    setLanguage(language.languageInterpreter);
  };

const handleRunCode = () => {
  if (!sourceCode || !language) {
    setError("Code and language must be selected.");
    return;
  }

  // Dispatch untuk mengirim request compileCode
  dispatch(
    compileCode({
      language, // Kirim bahasa yang dipilih
      sourceCode, // Kirim kode sumber
    })
  )
    .then((response) => {
      setOutput(response.data.result); // Asumsikan API mengembalikan output kode
      console.log("Code compiled successfully");
    })
    .catch((error) => {
      setError(error.response?.data?.message || "An error occurred while compiling the code.");
    });
};


  const copyCode = () => {
    navigator.clipboard.writeText(sourceCode);
    alert("Code successfully copied!");
  };

  const resetCode = () => {
    setCode("");
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
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Konten</h2>

        {/* Display error message */}
        {error && <div className="mb-4 text-center text-red-600">{error}</div>}

        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Urutan</label>
            <input
              type="text"
              name="sort"
              value={formData.sort}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Validasi hanya angka
                  handleInputChange(e); // Perbarui state
                }
              }}
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
              type="text"
              name="duration"
              value={formData.duration}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Validasi hanya angka
                  handleInputChange(e); // Perbarui state
                }
              }}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan durasi video"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Status Interpreter</label>
            <div className="flex items-center space-x-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="interpreterStatus"
                  checked={formData.interpreterStatus}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[2px] after:-translate-y-1/2 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
              <span className="text-gray-700 font-medium">Aktif</span>
            </div>
          </div>

          {/* Show CodeMirror when interpreterStatus is true */}
          {formData.interpreterStatus && (
            <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
              <h3 className="text-gray-700 text-2xl font-semibold mb-4">Editor Kode</h3>
              <div className="relative mb-4">
                <label className="block mb-2 font-semibold">Pilih Bahasa Pemrograman</label>
                <div className="relative inline-block">
                  {/* Tombol Dropdown */}
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <span>{selectedLanguage}</span> {/* Bahasa yang dipilih */}
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06-.02L10 10.44l3.71-3.25a.75.75 0 111.04 1.08l-4 3.5a.75.75 0 01-1.04 0l-4-3.5a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <ul className="absolute bg-white border rounded-md shadow-lg mt-1 min-w-max z-50">
                      {/* Tampilkan data bahasa dari Redux */}
                      {languages.length > 0 ? (
                        languages.map((language) => (
                          <li
                            key={language.id}
                            onClick={() => handleLanguageSelect(language)}
                            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-blue-100 hover:text-blue-600"
                          >
                            {language.languageInterpreter}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">Loading...</li> // Tampilkan teks "Loading" jika data belum tersedia
                      )}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <CodeMirror
                  value={sourceCode}
                  height="200px"
                  extensions={[python()]}
                  theme={githubLight}
                  onChange={(value) => setCode(value)}
                  className="rounded-lg border"
                />

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={handleRunCode}
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Run Code
                  </button>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Copy Code
                  </button>
                  <button
                    type="button"
                    onClick={resetCode}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Reset Code
                  </button>
                </div>
              </div>
              {/* Error and Output */}
              {error && <div className="text-red-500 mt-2">{error}</div>}

              <div className="mt-4">
                <h3 className="font-semibold text-lg">Output</h3>
                <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">{output}</pre>
              </div>
            </section>
          )}

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

DataKontenModule.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  chapterId: PropTypes.string.isRequired,
};

export default DataKontenModule;
