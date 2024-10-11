// File: ../../components/KategoriComponents/UbahKategori.jsx

import PropTypes from "prop-types";
import KategoriForm from "./KategoriForm";

const UbahKategori = ({ show, onClose, existingData }) => {
  return (
    <KategoriForm
      show={show}
      onClose={onClose}
      existingData={existingData}
      isEditMode={true}
    />
  );
};

UbahKategori.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
};

export default UbahKategori;
