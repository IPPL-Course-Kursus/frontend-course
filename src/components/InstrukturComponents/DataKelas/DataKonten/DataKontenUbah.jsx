import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDataKonten, updateDataKonten } from "../../../../redux/actions/instruktorActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadSpinner from "../../../Spinner/LoadSpinner";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { python } from "@codemirror/lang-python";

function DataKontenUbah({ show, onClose, existingData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [sourceCode, setCode] = useState("");
  const [language, setLanguage] = useState(""); // Ensure this is managed
  const [output, setOutput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk membuka/menutup dropdown
  const [selectedLanguage, setSelectedLanguage] = useState("Pilih Bahasa"); // State untuk bahasa yang dipilih
  const { languages } = useSelector((state) => state.interpreterLanguages);
  const [formData, setFormData] = useState({
    sort: "",
    contentTitle: "",
    teks: "",
    contentUrl: "",
    duration: "",
    interpreterId: "",
    interpreterStatus: false,
  });

  const [errors, setErrors] = useState({
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
        interpreterId: existingData.interpreterId || "",
        interpreterStatus: existingData.interpreterStatus || false,
      });
    }
  }, [existingData]);

  if (!show) return null;
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.languageInterpreter);
    setIsDropdownOpen(false);
    setLanguage(language.languageInterpreter);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error for the specific field
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset errors
    setErrors({
      sort: "",
      contentTitle: "",
      teks: "",
      contentUrl: "",
      duration: "",
    });

    // Validation
    let valid = true;
    let validationErrors = {};

    if (!formData.contentTitle) {
      valid = false;
      validationErrors.contentTitle = "Judul materi harus diisi.";
    }
    if (!formData.teks) {
      valid = false;
      validationErrors.teks = "Teks harus diisi.";
    }
    if (!formData.contentUrl) {
      valid = false;
      validationErrors.contentUrl = "URL video harus diisi.";
    }
    if (!formData.duration || isNaN(formData.duration)) {
      valid = false;
      validationErrors.duration = "Durasi harus berupa angka.";
    }

    if (!valid) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const payload = {
      sort: formData.sort,
      contentTitle: formData.contentTitle,
      teks: formData.teks,
      contentUrl: formData.contentUrl,
      duration: parseInt(formData.duration, 10),
      interpreterId: formData.interpreterId,
      interpreterStatus: formData.interpreterStatus,
    };

    try {
      await dispatch(updateDataKonten(existingData.id, payload));
      toast.success("Module berhasil diperbarui");
      await dispatch(getDataKonten(existingData.chapterId));
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(`Error: ${error.message || "Gagal memperbarui module"}`);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRunCode = () => {
    if (!sourceCode || !language) {
      setError("Code and language must be selected.");
      return;
    }

    // Dispatch untuk mengirim request compileCode
    dispatch()
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
              disabled
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
            {errors.contentTitle && <p className="text-red-500 text-sm">{errors.contentTitle}</p>}
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
            {errors.teks && <p className="text-red-500 text-sm">{errors.teks}</p>}
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
            {errors.contentUrl && <p className="text-red-500 text-sm">{errors.contentUrl}</p>}
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
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
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
                "Ubah"
              )}
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
