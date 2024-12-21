import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import KategoriForm from "./KategoriForm";
import { updateCategory } from "../../redux/actions/adminDataKategoriActions";
import { toast } from "react-hot-toast"; // Import toast

const UbahKategori = ({
  show,
  onClose,
  existingData,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  // Initial form data
  const initialFormData = {
    categoryName: existingData ? existingData.categoryName : "",
    image: null, // Image file
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(
    existingData ? existingData.image : null
  );
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (show && existingData) {
      // Set form data when the popup opens
      setFormData({
        categoryName: existingData.categoryName || "",
        image: null, // Reset image file
      });
      setImagePreview(existingData.image || null);
    } else if (!show) {
      // Reset form data when the popup closes
      setFormData(initialFormData);
      setImagePreview(existingData ? existingData.image : null);
      setImageFile(null);
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

    try {
      // Construct FormData
      const formDataToSend = new FormData();
      formDataToSend.append("categoryName", formData.categoryName);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      // Dispatch updateCategory action and await its completion
      await dispatch(updateCategory(existingData.id, formDataToSend));

      // If successful, proceed to close and notify
      handleClose();
      if (onSuccess) {
        onSuccess();
      }

      // Show success notification
      toast.success("Kategori berhasil diubah", {
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
    }
  };

  const handleClose = () => {
    // Reset form data and image preview
    setFormData(initialFormData);
    setImagePreview(existingData ? existingData.image : null);
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
  existingData: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

export default UbahKategori;
