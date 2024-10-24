import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import KategoriForm from "./KategoriForm";
import { updateCategory } from "../../redux/actions/adminDataKategoriActions";

const UbahKategori = ({ show, onClose, existingData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryCode: "",
    // Remove published from initial state
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Initialize form data when existingData is available
  useEffect(() => {
    if (existingData) {
      setFormData({
        categoryName: existingData.categoryName || "",
        categoryCode: existingData.categoryCode || "",
        // Remove published
      });
      setImagePreview(existingData.image || null);
    }
  }, [existingData]);


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

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updating category with data:", formData);

    // Construct FormData
    const formDataToSend = new FormData();
    formDataToSend.append("categoryName", formData.categoryName);
    formDataToSend.append("categoryCode", formData.categoryCode);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    dispatch(updateCategory(existingData.id, formDataToSend));
    onClose();
  };


  if (!existingData) return null;

  return (
    <KategoriForm
      show={show}
      onClose={onClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      handleSubmit={handleUpdate}
      imagePreview={imagePreview}
      isEditMode={true}
    />
  );
};

UbahKategori.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.object,
};

export default UbahKategori;
