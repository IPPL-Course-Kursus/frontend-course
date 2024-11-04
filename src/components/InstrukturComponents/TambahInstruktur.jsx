// File: ../../components/InstrukturComponents/TambahInstruktur.jsx

import PropTypes from "prop-types";
import InstrukturForm from "./InstrukturForm";

const TambahInstruktur = ({ show, onClose, addInstructor }) => {
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
    />
  );
};

TambahInstruktur.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  addInstructor: PropTypes.func,
};

export default TambahInstruktur;
