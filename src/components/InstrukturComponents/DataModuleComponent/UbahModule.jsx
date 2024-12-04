import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDataModule } from "../../../redux/actions/instruktorActions";

const UbahModule = ({ show, onClose, existingData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sort: "",
    chapterTitle: "",
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        sort: existingData.sort || "",
        chapterTitle: existingData.chapterTitle || "",
      });
    }
  }, [existingData]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "sort"
          ? value === "" // Jika kosong, set sebagai 0 atau tetap kosong
            ? 0
            : parseInt(value, 10) // Jika ada angka, lakukan parsing
          : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating chapter with data:", formData);

    try {
      const payload = {
        chapterTitle: formData.chapterTitle,
        sort: formData.sort,
      };

      console.log("Payload to update:", payload); // Log payload sebelum dikirim

      await dispatch(updateDataModule(existingData.id, payload));
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update data:", error);
      // Tambahkan error handling jika diperlukan
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Ubah Chapter</h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Urutan</label>
            <input
              type="text"
              name="sort"
              value={formData.sort}
              // disabled
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Validasi hanya angka
                  handleInputChange(e); // Perbarui state
                }
              }}
              className="w-full p-2 border rounded-xl" // Hapus bg-gray-200 dan cursor-not-allowed
              placeholder="ex 1"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Chapter</label>
            <input
              type="text"
              name="chapterTitle"
              value={formData.chapterTitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul chapter"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl">
              Ubah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UbahModule.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  existingData: PropTypes.object, // Hapus isRequired jika bisa null
};

export default UbahModule;
