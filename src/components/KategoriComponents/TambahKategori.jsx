import React, { useState } from "react";
import { useDispatch } from "react-redux";
import KategoriForm from "./KategoriForm";
import { addCategory } from "../../redux/actions/adminDataKategoriActions";
import PropTypes from "prop-types";

const TambahKategori = ({ show, onClose, onSuccess, showPopupNotification }) => {
  const dispatch = useDispatch();

  const initialFormData = {
    categoryName: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    // Update image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if image is provided
    if (!formData.image) {
      showPopupNotification("Harap tambahkan Foto Kategori.", "error");
      return;
    }

    try {
      // Prepare form data for submission
      const submissionData = new FormData();
      submissionData.append("categoryName", formData.categoryName);
      submissionData.append("image", formData.image);

      // Dispatch addCategory action
      await dispatch(addCategory(submissionData));

      // Reset form data after successful submission
      setFormData(initialFormData);
      setImagePreview(null);

      // Close the popup
      handleClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Handle errors (e.g., backend validation errors)
      console.error("Error adding category:", error);
      showPopupNotification("Failed to add category. Please try again.", "error");
    }
  };

  const handleClose = () => {
    // Reset formData and imagePreview
    setFormData(initialFormData);
    setImagePreview(null);
    onClose();
  };

  return (
    <KategoriForm
      show={show}
      onClose={handleClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isEditMode={false}
      imagePreview={imagePreview}
      handleImageUpload={handleImageUpload}
    />
  );
};

TambahKategori.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  showPopupNotification: PropTypes.func.isRequired, // Added prop
};

export default TambahKategori;
