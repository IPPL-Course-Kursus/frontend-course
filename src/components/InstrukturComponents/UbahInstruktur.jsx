import React from "react";
import PropTypes from "prop-types";
import InstrukturForm from "./InstrukturForm";

const UbahInstruktur = ({ show, onClose, instructor, onSave }) => {
  return (
    <InstrukturForm
      show={show}
      onClose={onClose}
      existingData={instructor}  // Data instruktur yang ingin diubah
      isEditMode={true}
      onSubmit={onSave}  // Panggil fungsi onSave saat form disubmit
    />
  );
};

UbahInstruktur.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  instructor: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UbahInstruktur;
