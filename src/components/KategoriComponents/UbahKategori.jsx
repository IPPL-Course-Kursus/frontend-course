import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import KategoriForm from "./KategoriForm";
import { updateCategory } from "../../redux/actions/adminDataKategoriActions";
import { toast } from "react-hot-toast"; // Import toast

const UbahKategori = ({ show, onClose, onSuccess, existingData }) => {
  const dispatch = useDispatch();

  // Initial form data with existing category details
  const initialFormData = {
    categoryName: existingData?.categoryName || "",
    image: null, // Image file (optional, in case user wants to change it)
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(existingData?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  useEffect(() => {
    if (show) {
      // Reset form when popup opens with existing data
      setFormData({
        categoryName: existingData?.categoryName || "",
        image: null,
      });
      setImagePreview(existingData?.image || null);
      setImageFile(null);
      setIsSubmitting(false);
    } else {
      // Reset form when popup closes
      setFormData(initialFormData);
      setImagePreview(existingData?.image || null);
      setImageFile(null);
      setIsSubmitting(false);
    }
  }, [show, existingData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, reset imageFile and imagePreview
      setImageFile(null);
      setImagePreview(existingData?.image || null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating category with data:", formData);

    // Validation: Check if categoryName is provided
    if (!formData.categoryName.trim()) {
      toast.error("Silakan isi field Nama Kategori.", {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
      return;
    }

    setIsSubmitting(true); // Start submission

    try {
      // Construct FormData
      const formDataToSend = new FormData();
      formDataToSend.append("categoryName", formData.categoryName);
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      // Dispatch updateCategory action and await its completion
      await dispatch(updateCategory(existingData.id, formDataToSend));

      // Close the popup first
      handleClose();

      // Execute any additional success actions
      if (onSuccess) {
        onSuccess();
      }

      // Show success notification
      toast.success("Kategori berhasil diperbarui", {
        style: {
          borderRadius: "8px",
          background: "#4BB543",
          color: "#fff",
        },
      });
    } catch (error) {
      // Handle errors (e.g., duplicate category name)
      console.error("Error updating category:", error);

      let errorMessage = "Gagal memperbarui kategori. Silakan coba lagi.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const backendMessage = error.response.data.message.toLowerCase();

        if (
          backendMessage.includes("duplicate") ||
          backendMessage.includes("category already exists")
        ) {
          errorMessage =
            "Gagal memperbarui nama kategori, nama kategori sudah ada.";
        } else {
          errorMessage = error.response.data.message;
        }
      }

      toast.error(errorMessage, {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const handleClose = () => {
    // Reset form data and image preview
    setFormData(initialFormData);
    setImagePreview(existingData?.image || null);
    setImageFile(null);
    setIsSubmitting(false);
    onClose();
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled =
    !formData.categoryName.trim() || isSubmitting;

  if (!show) return null;

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
      isSubmitDisabled={isSubmitDisabled}
      isSubmitting={isSubmitting} // Pass the submitting state
    />
  );
};

UbahKategori.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  existingData: PropTypes.shape({
    id: PropTypes.number.isRequired, // Adjust type based on your data
    categoryName: PropTypes.string.isRequired,
    image: PropTypes.string, // URL to the image
  }).isRequired,
};

export default UbahKategori;
