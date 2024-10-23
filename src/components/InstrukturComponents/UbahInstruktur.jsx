// File: ../../components/InstrukturComponents/UbahInstruktur.jsx

import PropTypes from "prop-types";
import InstrukturFormEdit from "./InstrukturFormEdit";

const UbahInstruktur = ({ show, onClose, existingData, updateInstructor }) => {
  const handleSubmit = (formData) => {
    updateInstructor(formData);
  };

  return (
    <InstrukturFormEdit
      show={isEditMode}
      onClose={handleClose}
      existingData={selectedInstructorData} // Pastikan data ini benar
      isEditMode={true}
      onSubmit={handleUpdate}
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
