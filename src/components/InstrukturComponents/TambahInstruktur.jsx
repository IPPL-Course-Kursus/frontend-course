import React from "react";
import PropTypes from "prop-types";
import InstrukturForm from "./InstrukturForm";

const TambahInstruktur = ({ show, onClose, onSave }) => {
  return (
    <InstrukturForm
      show={show}
      onClose={onClose}
      existingData={null}  // Karena menambah, tidak ada data yang diisi sebelumnya
      isEditMode={false}
      onSubmit={onSave}  // Panggil fungsi onSave saat form disubmit
    />
  );
};

TambahInstruktur.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TambahInstruktur;
