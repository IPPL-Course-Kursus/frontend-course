import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import KategoriForm from "./KategoriForm";
import { addCategory } from "../../redux/actions/adminDataKategoriActions";

const TambahKategori = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryCode: "",
    // Remove published from initial state
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("Adding new category with data:", formData);

    // Construct FormData
    const formDataToSend = new FormData();
    formDataToSend.append("categoryName", formData.categoryName);
    formDataToSend.append("categoryCode", formData.categoryCode);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    dispatch(addCategory(formDataToSend));
    onClose();
  };

  return (
    <KategoriForm
      show={show}
      onClose={onClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      handleSubmit={handleAdd}
      imagePreview={imagePreview}
      isEditMode={false}
    />
  );
};

TambahKategori.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TambahKategori;
