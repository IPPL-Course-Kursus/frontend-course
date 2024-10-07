// File: ../../components/InstrukturComponents/UbahInstruktur.jsx

import PropTypes from "prop-types";
import InstrukturForm from "./InstrukturForm";

const UbahInstruktur = ({ show, onClose, existingData, updateInstructor }) => {
  const handleSubmit = (formData) => {
    updateInstructor(formData);
  };

  return (
    <InstrukturForm
      show={show}
      onClose={onClose}
      existingData={existingData}
      isEditMode={true}
      onSubmit={handleSubmit}
    />
  );
};

UbahInstruktur.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
  updateInstructor: PropTypes.func,
};

export default UbahInstruktur;
