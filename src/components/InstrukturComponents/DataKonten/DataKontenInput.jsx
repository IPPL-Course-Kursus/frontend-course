import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import KontenForm from "./KontenForm";
import { addDataKonten } from "../../../redux/actions/instruktorActions";

const TambahKategori = ({ show, onClose, chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sort: "",
    contentTitle: "",
    teks: "",
    contentUrl: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "sort" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state before dispatching action

    // Validate form data
    const { sort, contentTitle, teks, contentUrl, duration } = formData;
    if (!sort || !contentTitle || !teks || !contentUrl || !duration) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Log form data
    console.log("Form Data:", formData);
    console.log("Sort Value (after conversion):", sort); // Pastikan ini adalah number
    console.log("Duration Value (after conversion):", duration);

    // Create new form data
    const requestData = {
      sort: Number(sort), // Ensure this is a number
      contentTitle,
      teks,
      contentUrl,
      duration: Number(duration), // Ensure this is a number
    };

    // Dispatch action
    dispatch(addDataKonten(requestData, chapterId))
      .then(() => {
        setLoading(false);
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.message || "Error adding content");
        console.error("Error detail:", err);
      });
  };

  return (
    <KontenForm
      show={show}
      onClose={onClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleAdd}
      isEditMode={false}
    />
  );
};

TambahKategori.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  chapterId: PropTypes.string.isRequired, // Add chapterId prop type
};

export default TambahKategori;
