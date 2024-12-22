// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import PropTypes from "prop-types";
// import KategoriForm from "./KategoriForm";
// import { addCategory } from "../../redux/actions/adminDataKategoriActions";
// import { toast } from "react-hot-toast"; // Import toast

// const TambahKategori = ({
//   show,
//   onClose,
//   onSuccess,
// }) => {
//   const dispatch = useDispatch();

//   // Initial form data
//   const initialFormData = {
//     categoryName: "",
//     image: null, // Image file
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     if (show) {
//       // Set form data when the popup opens
//       setFormData({
//         categoryName: "",
//         image: null, // Reset image file
//       });
//       setImagePreview(null);
//     } else {
//       // Reset form data when the popup closes
//       setFormData(initialFormData);
//       setImagePreview(null);
//       setImageFile(null);
//     }
//   }, [show]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle image upload and preview
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       // If no file is selected, reset imageFile and imagePreview
//       setImageFile(null);
//       setImagePreview(null);
//     }
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     console.log("Adding category with data:", formData);

//     // Validation: Check if categoryName and image are provided
//     if (!formData.categoryName.trim()) {
//       toast.error("Silakan isi field Nama Kategori.", {
//         style: {
//           borderRadius: "8px",
//           background: "#FF3333",
//           color: "#fff",
//         },
//       });
//       return;
//     }

//     if (!imageFile) {
//       toast.error("Silakan pilih gambar untuk kategori.", {
//         style: {
//           borderRadius: "8px",
//           background: "#FF3333",
//           color: "#fff",
//         },
//       });
//       return;
//     }

//     try {
//       // Construct FormData
//       const formDataToSend = new FormData();
//       formDataToSend.append("categoryName", formData.categoryName);
//       formDataToSend.append("image", imageFile);

//       // Dispatch addCategory action and await its completion
//       await dispatch(addCategory(formDataToSend));

//       // If successful, proceed to close and notify
//       handleClose();
//       if (onSuccess) {
//         onSuccess();
//       }

//       // Show success notification
//       // toast.success("Kategori berhasil ditambahkan", {
//       //   style: {
//       //     borderRadius: "8px",
//       //     background: "#4BB543",
//       //     color: "#fff",
//       //   },
//       // });
//     } catch (error) {
//       // Handle errors (e.g., duplicate category name)
//       console.error("Error adding category:", error);

//       let errorMessage = "Gagal menambahkan kategori. Silakan coba lagi.";

//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         const backendMessage = error.response.data.message.toLowerCase();

//         if (
//           backendMessage.includes("duplicate") ||
//           backendMessage.includes("nama kategori sudah ada")
//         ) {
//           errorMessage =
//             "Gagal menambahkan nama kategori, nama kategori sudah ada.";
//         } else {
//           errorMessage = error.response.data.message;
//         }
//       }

//       toast.error(errorMessage, {
//         style: {
//           borderRadius: "8px",
//           background: "#FF3333",
//           color: "#fff",
//         },
//       });
//     }
//   };

//   const handleClose = () => {
//     // Reset form data and image preview
//     setFormData(initialFormData);
//     setImagePreview(null);
//     setImageFile(null);
//     onClose();
//   };

//   // Determine if the submit button should be disabled
//   const isSubmitDisabled = !formData.categoryName.trim() || !imageFile;

//   if (!show) return null;

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
//       isSubmitDisabled={isSubmitDisabled} // Pass the disabled state
//     />
//   );
// };

// TambahKategori.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSuccess: PropTypes.func,
// };

// export default TambahKategori;

// TambahKategori.jsx

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import KategoriForm from "./KategoriForm";
import { addCategory } from "../../redux/actions/adminDataKategoriActions";
import { toast } from "react-hot-toast"; // Import toast

const TambahKategori = ({ show, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  // Initial form data
  const initialFormData = {
    categoryName: "",
    image: null, // Image file
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  useEffect(() => {
    if (show) {
      // Reset form when popup opens
      setFormData({
        categoryName: "",
        image: null,
      });
      setImagePreview(null);
      setImageFile(null);
      setIsSubmitting(false);
    } else {
      // Reset form when popup closes
      setFormData(initialFormData);
      setImagePreview(null);
      setImageFile(null);
      setIsSubmitting(false);
    }
  }, [show]);

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
      setImagePreview(null);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("Adding category with data:", formData);

    // Validation: Check if categoryName and image are provided
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

    if (!imageFile) {
      toast.error("Silakan pilih gambar untuk kategori.", {
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
      formDataToSend.append("image", imageFile);

      // Dispatch addCategory action and await its completion
      await dispatch(addCategory(formDataToSend));

      // Close the popup first
      handleClose();

      // The `fetchAdminCategories` is already dispatched within the `addCategory` action

      // Execute any additional success actions
      if (onSuccess) {
        onSuccess();
      }

      // Show success notification
      toast.success("Kategori berhasil ditambahkan", {
        style: {
          borderRadius: "8px",
          background: "#4BB543",
          color: "#fff",
        },
      });
    } catch (error) {
      // Handle errors (e.g., duplicate category name)
      console.error("Error adding category:", error);

      let errorMessage = "Gagal menambahkan kategori. Silakan coba lagi.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const backendMessage = error.response.data.message.toLowerCase();

        if (
          backendMessage.includes("duplicate") ||
          backendMessage.includes("nama kategori sudah ada")
        ) {
          errorMessage =
            "Gagal menambahkan nama kategori, nama kategori sudah ada.";
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
    setImagePreview(null);
    setImageFile(null);
    setIsSubmitting(false);
    onClose();
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled =
    !formData.categoryName.trim() || !imageFile;

  if (!show) return null;

  return (
    <KategoriForm
      show={show}
      onClose={handleClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      handleSubmit={handleAdd}
      imagePreview={imagePreview}
      isEditMode={false}
      isSubmitDisabled={isSubmitDisabled}
      isSubmitting={isSubmitting} // Pass the submitting state
    />
  );
};

TambahKategori.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default TambahKategori;
