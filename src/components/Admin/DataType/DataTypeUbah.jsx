import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateTypeCourseById } from "../../../redux/actions/typeCourseActions";

function DataTypeUbah({ show, onClose, existingData }) {
  const [formData, setFormData] = useState({
    typeName: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (existingData) {
      setFormData({
        typeName: existingData.typeName || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTypeCourseById(existingData.id, formData.typeName));
    onClose(); // Close the modal after updating
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg max-h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">
          Ubah Tipe Kelas
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Tipe Kelas Input */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <input
              type="text"
              name="typeName"
              value={formData.typeName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan Tipe Kelas"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl"
              type="submit"
            >
              Ubah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

DataTypeUbah.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
};

export default DataTypeUbah;
