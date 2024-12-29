import PropTypes from "prop-types";
import InstrukturForm from "./InstrukturForm";

const TambahInstruktur = ({ show, onClose, addInstructor, isAdding }) => {
  const handleSubmit = (formData) => {
    addInstructor(formData);
  };

  if (!show) {
    return null; // Tidak render jika tidak ditampilkan
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="relative bg-white rounded-md shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat mengklik di dalam popup
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose} // Hanya menutup popup dengan klik tombol
        >
          &times;
        </button>
        <InstrukturForm
          show={show}
          onClose={onClose}
          existingData={null}
          isEditMode={false}
          onSubmit={handleSubmit}
          isAdding={isAdding}
        />
      </div>
    </div>
  );
};

TambahInstruktur.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addInstructor: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
};

export default TambahInstruktur;
