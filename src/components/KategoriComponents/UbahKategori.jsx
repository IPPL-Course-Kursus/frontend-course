// // File: ../../components/KategoriComponents/UbahKategori.jsx

// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import KategoriForm from "./KategoriForm";
// import { updateCategory } from "../../redux/actions/adminDataKategoriActions";

// const UbahKategori = ({ show, onClose, existingData }) => {
//   if (!show || !existingData) return null;
//     const dispatch = useDispatch();
//     const [formData, setFormData] = useState({
//       categoryName: "",
//       image: null,
//       published: false,
//       // ...other fields if any...
//     });

//   // Initialize form data when existingData is available
//   useEffect(() => {
//     if (existingData) {
//       setFormData({
//         categoryName: existingData.categoryName || "",
//         image: existingData.image || null,
//         published: existingData.published || false,
//         // ...other fields if any...
//       });
//     }
//   }, [existingData]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     console.log("Updating category with data:", formData);

//     const formDataToSend = new FormData();
//     formDataToSend.append("categoryName", formData.categoryName);
//     if (formData.image instanceof File) {
//       formDataToSend.append("image", formData.image);
//     }
//     formDataToSend.append("published", formData.published);
//     // Append other fields if any

//     dispatch(updateCategory(existingData.id, formDataToSend));
//     onClose();
//   };

//   return (
//     <KategoriForm
//       show={show}
//       onClose={onClose}
//       formData={formData}
//       handleInputChange={handleInputChange}
//       handleSubmit={handleUpdate}
//       isEditMode={true}
//     />
//   );
// };

// UbahKategori.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   existingData: PropTypes.object, // fix warning
// };

// export default UbahKategori;

// File: ../../components/KategoriComponents/UbahKategori.jsx

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import KategoriForm from "./KategoriForm";
import { updateCategory } from "../../redux/actions/adminDataKategoriActions";

const UbahKategori = ({ show, onClose, existingData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    published: false,
    // ...other fields if any...
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Initialize form data when existingData is available
  useEffect(() => {
    if (existingData) {
      setFormData({
        categoryName: existingData.categoryName || "",
        published: existingData.published || false,
        // ...other fields if any...
      });
      setImagePreview(existingData.image || null);
    }
  }, [existingData]);

  // Handle text input changes and checkbox
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

    const formDataToSend = new FormData();
    formDataToSend.append("categoryName", formData.categoryName);
    formDataToSend.append("published", formData.published);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    // Append other fields if any
    dispatch(updateCategory(existingData.id, formDataToSend));
    onClose();
  };

  // If existingData is null, don't render the form
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