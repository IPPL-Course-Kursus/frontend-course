import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateTypeCourseById } from "../../../redux/actions/typeCourseActions";
import { toast } from "react-hot-toast"; // Import toast for notifications

function DataTypeUbah({ show, onClose, existingData }) {
  const dispatch = useDispatch();

  const initialFormData = {
    typeName: existingData?.typeName || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  useEffect(() => {
    if (show) {
      // Reset form when modal is opened
      setFormData({ typeName: existingData?.typeName || "" });
      setIsSubmitting(false);
    } else {
      // Reset form when modal is closed
      setFormData(initialFormData);
      setIsSubmitting(false);
    }
  }, [show, existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure typeName is not empty
    if (!formData.typeName.trim()) {
      toast.error("Silakan isi Tipe Kelas.", {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
      return;
    }

    // Validation: Ensure the typeName is changed
    if (formData.typeName.trim() === existingData.typeName.trim()) {
      toast.error("Tipe Kelas tidak ada perubahan.", {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
      return;
    }

    setIsSubmitting(true); // Start submission

    try {
      // Dispatch the updateTypeCourseById action to update the type course
      await dispatch(updateTypeCourseById(existingData.id, formData.typeName));

      // Show success notification
      toast.success("Tipe Kelas berhasil diperbarui", {
        style: {
          borderRadius: "8px",
          background: "#4BB543",
          color: "#fff",
        },
      });

      // Close the modal after successful update
      handleClose();
    } catch (error) {
      console.error("Error updating type course:", error);

      toast.error("Gagal memperbarui Tipe Kelas. Silakan coba lagi.", {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const handleClose = () => {
    // Reset form and close modal
    setFormData(initialFormData);
    setIsSubmitting(false);
    onClose();
  };

  // Disable submit button if form is invalid, submission is in progress, or no change in data
  const isSubmitDisabled =
    !formData.typeName.trim() ||
    isSubmitting ||
    formData.typeName.trim() === existingData.typeName.trim(); // Ensure spaces are trimmed

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg max-h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={handleClose}
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
              disabled={isSubmitDisabled}
            >
              {isSubmitting ? "Memperbarui..." : "Ubah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

DataTypeUbah.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    typeName: PropTypes.string.isRequired,
  }).isRequired,
};

export default DataTypeUbah;
