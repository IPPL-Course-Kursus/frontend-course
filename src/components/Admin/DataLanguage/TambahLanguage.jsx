import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createLanguage } from "../../../redux/actions/adminDataInterLangActions";
import { toast } from "react-hot-toast";
import LanguageForm from "./LanguageForm";

const TambahLanguage = ({ show, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  // Initial form data
  const initialFormData = {
    languageInterpreter: "",
    version: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when the modal is opened or closed
  useEffect(() => {
    if (show) {
      setFormData(initialFormData);
      setIsSubmitting(false);
    }
  }, [show]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Custom error message mapping function
  const mapBackendErrorToFrontend = (error) => {
    let errorMessage = "Gagal menambahkan bahasa. Silakan coba lagi.";

    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      const backendMessage = error.response.data.message.toLowerCase();

      if (
        backendMessage.includes("duplicate") ||
        backendMessage.includes("bahasa sudah ada")
      ) {
        errorMessage = "Bahasa sudah ada.";
      } else {
        errorMessage = error.response.data.message;
      }
    }

    return errorMessage;
  };

  // Handle form submission for adding a language
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.languageInterpreter.trim() || !formData.version.trim()) {
      toast.error("Silakan isi semua field.", {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(createLanguage(formData));

      onClose();

      // Trigger any additional success actions
      if (onSuccess) onSuccess();

      // Show success toast
      toast.success("Bahasa berhasil ditambahkan.", {
        style: {
          borderRadius: "8px",
          background: "#4BB543",
          color: "#fff",
        },
      });
    } catch (error) {
      // Map backend error to frontend message
      const errorMessage = mapBackendErrorToFrontend(error);

      // Show error toast
      toast.error(errorMessage, {
        style: {
          borderRadius: "8px",
          background: "#FF3333",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled =
    !formData.languageInterpreter.trim() || !formData.version.trim();

  if (!show) return null;

  return (
    <LanguageForm
      show={show}
      onClose={onClose}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isEditMode={false}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
};

TambahLanguage.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default TambahLanguage;
