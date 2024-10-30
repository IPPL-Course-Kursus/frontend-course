

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
  const [language, setLanguage] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sort: "",
    contentTitle: "",
    teks: "",
    contentUrl: "",
    duration: "",
    interpreterId: "", // This will be converted to a number
    interpreterStatus: false, // Add interpreterStatus
  });

  // State for CodeMirror
  const [sourceCode, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "sort" || name === "duration" || name === "interpreterId"
          ? Number(value) // Convert to number for specific fields
          : value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);

    const { sort, contentTitle, teks, contentUrl, duration, interpreterId, interpreterStatus } =
      formData;

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
      interpreterId: interpreterStatus ? interpreterId || null : null, // Include interpreterId only if interpreterStatus is true
      interpreterStatus,
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
        console.error("Error detail:", err);
      });
  };

  // Handle running code with updated error handling
  const handleRunCode = () => {
    if (!language || !sourceCode) {
      setError("Language or source code is missing.");
      return;
    }

    setLoading(true);
    dispatch(runCode({ language, sourceCode }))
      .then((response) => {
        if (response.data) {
          setOutput(response.data.output); // Display output if available
        } else {
          setError("Error: Response data is undefined.");
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        setError(`Error executing code: ${errorMessage}`);
      })
      .finally(() => setLoading(false));
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
            <label className="block mb-1 font-semibold">Interpreter ID</label>
            <input
              type="number" // Change input type to number
              name="interpreterId"
              value={formData.interpreterId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan Interpreter ID"
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
                value={sourceCode}
                theme={githubLight}
                height="400px"
                extensions={[python()]}
                onChange={(value) => setCode(value)}
                className="w-full p-3 border border-gray-600 rounded-lg mb-4"
              />
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
