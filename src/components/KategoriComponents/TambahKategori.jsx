// // File: ../../components/KategoriComponents/TambahKategori.jsx

// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import KategoriForm from "./KategoriForm";
// import { addCategory } from "../../redux/actions/adminDataKategoriActions";

// const TambahKategori = ({ show, onClose }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     categoryName: "",
//     image: null,
//     published: false, // or true, depending on your default
//     // ...other fields if any...
//   });

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

//   const handleAdd = (e) => {
//     e.preventDefault();
//     console.log("Adding new category with data:", formData);

//     // If you're sending a file, you might need to use FormData
//     const formDataToSend = new FormData();
//     formDataToSend.append("categoryName", formData.categoryName);
//     formDataToSend.append("image", formData.image);
//     formDataToSend.append("published", formData.published);
//     // Append other fields if any

//     dispatch(addCategory(formDataToSend));
//     onClose();
//   };

//   return (
//     <KategoriForm
//       show={show}
//       onClose={onClose}
//       formData={formData}
//       handleInputChange={handleInputChange}
//       handleSubmit={handleAdd}
//       isEditMode={false}
//     />
//   );
// };

// TambahKategori.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default TambahKategori;

// File: ../../components/KategoriComponents/TambahKategori.jsx

import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import KategoriForm from "./KategoriForm";
import { addCategory } from "../../redux/actions/adminDataKategoriActions";

const TambahKategori = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    published: false, // or true, depending on your default
    // ...other fields if any...
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("Adding new category with data:", formData);

    const formDataToSend = new FormData();
    formDataToSend.append("categoryName", formData.categoryName);
    formDataToSend.append("published", formData.published);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    // Append other fields if any

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