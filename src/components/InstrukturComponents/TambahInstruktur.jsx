// File: ../../components/InstrukturComponents/TambahInstruktur.jsx

import PropTypes from "prop-types";
import InstrukturForm from "./InstrukturForm";

const TambahInstruktur = ({ show, onClose, addInstructor, isAdding }) => {
  const handleSubmit = (formData) => {
    addInstructor(formData);
  };

  return (
    <InstrukturForm
      show={show}
      onClose={onClose}
      existingData={null}
      isEditMode={false}
      onSubmit={handleSubmit}
      isAdding={isAdding}
    />
  );
};

TambahInstruktur.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  addInstructor: PropTypes.func,
  isAdding: PropTypes.bool,
};

export default TambahInstruktur;
