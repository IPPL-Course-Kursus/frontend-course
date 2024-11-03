import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import InstrukturForm from "./InstrukturFormEdit";
import { useDispatch } from "react-redux";
const UbahInstruktur = ({ show, onClose, existingData, updateInstructor }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    city: "",
    phoneNumber: "",
    tanggalLahir: "",
    email: "",
    password: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (existingData) {
      setFormData({
        fullName: existingData.fullName || "",
        country: existingData.country || "",
        city: existingData.city || "",
        phoneNumber: existingData.phoneNumber || "",
        tanggalLahir: existingData.tanggalLahir || "",
        email: existingData.email || "",
        password: "", 
      });
    }
  }, [existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formDataToSend);
  
    // Menggunakan FormData untuk mengirim data
    const formData = new FormData();
    formData.append("fullName", formDataToSend.fullName);
    formData.append("country", formDataToSend.country);
    formData.append("city", formDataToSend.city);
    formData.append("phoneNumber", formDataToSend.phoneNumber);
    formData.append("tanggalLahir", formDataToSend.tanggalLahir);
  
    // Jika ada gambar baru yang dipilih
    if (imageFile) {
      formData.append("image", imageFile);
    }
    
    dispatch(updateInstructor(existingData.id, formDataToSend));
    onSubmit(form);
    onClose();
  };

  if (!existingData) return null;

  return (
    <InstrukturForm
      show={show}
      onClose={onClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      onSubmit={handleSubmit} // Panggil handleUpdate yang benar
      isEditMode={true}
    />
  );
};

UbahInstruktur.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.object,
  updateInstructor: PropTypes.func.isRequired,
};

export default UbahInstruktur;
