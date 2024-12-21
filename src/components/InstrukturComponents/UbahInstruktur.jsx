import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import InstrukturForm from "./InstrukturFormEdit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Menambahkan react-toastify
import "react-toastify/dist/ReactToastify.css"; // Mengimpor CSS untuk react-toastify

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

  const dispatch = useDispatch();

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

    // Validasi nomor telepon
    if (formData.phoneNumber.length < 10) {
      toast.error("Nomor telepon harus lebih dari 10 karakter.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Menggunakan FormData untuk mengirim data
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("tanggalLahir", formData.tanggalLahir);
  
    // Jika ada gambar baru yang dipilih
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }
    
    dispatch(updateInstructor(existingData.id, formDataToSend))
      .then(() => {
        toast.success("Instruktur berhasil diperbarui!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onClose();
      })
      .catch((error) => {
        toast.error("Terjadi kesalahan saat memperbarui instruktur.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  if (!existingData) {
    toast.info("Data instruktur tidak ditemukan.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return null;
  }

  return (
    <InstrukturForm
      show={show}
      onClose={onClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      onSubmit={handleSubmit}
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
