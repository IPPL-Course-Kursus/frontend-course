// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import KategoriForm from "./KategoriForm";
// import { addCategory } from "../../redux/actions/adminDataKategoriActions";

// const TambahKategori = ({ show, onClose }) => {
//   // Handle text input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle image upload and preview
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);

//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAdd = (e) => {
//     e.preventDefault();
//     console.log("Adding new category with data:", formData);

//     // Construct FormData
//     const formDataToSend = new FormData();
//     formDataToSend.append("categoryName", formData.categoryName);
//     formDataToSend.append("categoryCode", formData.categoryCode);

//     if (imageFile) {
//       formDataToSend.append("image", imageFile);
//     }

//     dispatch(addCategory(formDataToSend));
//     onClose();
//   };

//   const initialFormData = {
//     categoryName: '',
//     categoryCode: '',
//     image: null,
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleClose = () => {
//     // Reset formData and imagePreview
//     setFormData(initialFormData);
//     setImagePreview(null);
//     onClose();
//   };

//   return (
//     <KategoriForm
//       show={show}
//       onClose={handleClose}
//       formData={formData}
//       handleInputChange={handleInputChange}
//       handleImageUpload={handleImageUpload}
//       handleSubmit={handleAdd}
//       imagePreview={imagePreview}
//       isEditMode={false}
//     />
//   );
// };

// TambahKategori.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default TambahKategori;

// TambahKategori.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import KategoriForm from './KategoriForm';
import { addCategory } from '../../redux/actions/adminDataKategoriActions';

const TambahKategori = ({ show, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const initialFormData = {
    categoryName: '',
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit form data
      await dispatch(addCategory(formData));
      // Reset form data after successful submission
      setFormData(initialFormData);
      setImagePreview(null);
      // Close the popup
      handleClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Handle errors
      console.error('Error adding category:', error);
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

export default TambahKategori;
