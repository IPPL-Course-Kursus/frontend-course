import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createTypeCourse } from "../../../redux/actions/typeCourseActions";

function DataTypeInput({ show, onClose, onSuccess, onError }) {
  const [formData, setFormData] = useState({
    typeName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      setFormData({ typeName: "" }); // Reset form when popup opens
      setIsSubmitting(false); // Reset submitting state
    }
  }, [show]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.typeName.trim()) {
      onError("Silakan isi nama tipe kelas.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Dispatch createTypeCourse action
      await dispatch(createTypeCourse(formData.typeName));

      // Reset form data and close the popup
      setFormData({ typeName: "" });
      onClose();

      // Trigger success callback
      onSuccess("Tipe kelas berhasil ditambahkan");
    } catch (error) {
      console.error("Error adding type course:", error);
      onError("Gagal menambahkan tipe kelas. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled = !formData.typeName.trim();

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
          Tambah Tipe Kelas
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
              disabled={isSubmitDisabled || isSubmitting}
            >
              {isSubmitting ? "Menambahkan..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

DataTypeInput.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired, // New success callback prop
  onError: PropTypes.func.isRequired, // New error callback prop
};

export default DataTypeInput;
