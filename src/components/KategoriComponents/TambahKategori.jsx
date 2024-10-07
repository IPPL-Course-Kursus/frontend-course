// File: ../../components/KategoriComponents/TambahKategori.jsx

import PropTypes from "prop-types";
import KategoriForm from "./KategoriForm";

const TambahKategori = ({ show, onClose }) => {
  return (
    <KategoriForm
      show={show}
      onClose={onClose}
      existingData={null}
      isEditMode={false}
    />
  );
};

TambahKategori.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TambahKategori;
