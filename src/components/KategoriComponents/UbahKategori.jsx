import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import KategoriForm from "./KategoriForm";
import { updateCategory } from "../../redux/actions/adminDataKategoriActions";

const UbahKategori = ({ show, onClose, existingData, onSuccess }) => {
  const dispatch = useDispatch();

  // Initial form data without categoryCode
  const initialFormData = {
    categoryName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Update formData and imagePreview when popup opens or closes
  useEffect(() => {
    if (show && existingData) {
      // Set form data when the popup opens
      setFormData({
        categoryName: existingData.categoryName || "",
      });
      setImagePreview(existingData.image || null);
      setImageFile(null);
    } else if (!show) {
      // Reset form data when the popup closes
      setFormData(initialFormData);
      setImagePreview(null);
      setImageFile(null);
    }
  }, [show, existingData]);

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

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    dispatch(updateCategory(existingData.id, formDataToSend));

    // Close the popup and reset form data
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    // Reset form data and image preview
    setFormData(initialFormData);
    setImagePreview(null);
    setImageFile(null);
    onClose();
  };

  if (!show || !existingData) return null;

  return (
    <KategoriForm
      show={show}
      onClose={handleClose}
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
