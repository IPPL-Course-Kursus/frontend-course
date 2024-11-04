import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDataKonten } from "../../../redux/actions/instruktorActions";
import CodeMirror from "@uiw/react-codemirror"; // Adjust import if necessary
import { githubLight } from "@uiw/codemirror-theme-github";
import { python } from "@codemirror/lang-python";
import { runCode } from "../../../redux/actions/mulaiKelasActions";

const DataKontenModule = ({ show, onClose, chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(""); // Ensure this is managed
  const [sourceCode, setCode] = useState("");
  const [output, setOutput] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sort: "",
    contentTitle: "",
    teks: "",
    contentUrl: "",
    duration: "",
    interpreterStatus: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);

    const { sort, contentTitle, teks, contentUrl, duration, interpreterStatus } = formData;

    if (!sort || !contentTitle || !teks || !contentUrl || !duration) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Pastikan jika interpreterStatus true, maka sourceCode dan language juga harus ada
    if (interpreterStatus && (!sourceCode || !language)) {
      setError("Interpreter must be active and both source code and language must be filled.");
      setLoading(false);
      return;
    }

    const requestData = {
      sort: Number(sort),
      contentTitle,
      teks,
      contentUrl,
      duration: Number(duration),
      interpreterStatus,
      sourceCode: interpreterStatus ? sourceCode : null, // Set to null if not filled
      language: interpreterStatus ? language : null, // Set to null if not filled
    };

    dispatch(addDataKonten(requestData, chapterId))
      .then(() => {
        setLoading(false);
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.message || "Error adding content");
      });
  };

  const handleRunCode = () => {
    dispatch(runCode(language, sourceCode)).catch((error) => {
      console.error("Error:", error.response ? error.response.data : error.message);
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

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Interpreter</label>
            <input
              type="checkbox"
              name="interpreterStatus"
              checked={formData.interpreterStatus}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Aktif</span>
          </div>

          {/* Show CodeMirror when interpreterStatus is true */}
          {formData.interpreterStatus && (
            <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
              <h3 className="text-gray-700 text-2xl font-semibold mb-4">Editor Kode</h3>
              <CodeMirror
                id="code"
                value={sourceCode}
                theme={githubLight}
                height="400px"
                extensions={[python()]}
                onChange={(value) => setCode(value)}
                className="w-full p-3 border border-gray-600 rounded-lg mb-4"
              ></CodeMirror>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={handleRunCode}
                  disabled={loading}
                >
                  {loading ? "Running..." : "Run Code"}
                </button>

                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                  onClick={copyCode}
                >
                  Copy Code
                </button>
                <button className="bg-red-600 text-white py-2 px-4 rounded-lg" onClick={resetCode}>
                  Reset Code
                </button>
              </div>

              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="text-gray-700 font-semibold">Output:</h4>
                <p className="text-gray-600 mt-2">{output}</p>
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
