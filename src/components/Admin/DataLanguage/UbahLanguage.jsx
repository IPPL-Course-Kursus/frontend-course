import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../../redux/actions/adminDataInterLangActions";
import { toast } from "react-hot-toast";
import LanguageForm from "./LanguageForm"; // Shared form component
import { mapBackendErrorToFrontend } from "../../../components/Admin/DataLanguage/errorMapper";

const UbahLanguage = ({ show, onClose, onSuccess, existingLanguage }) => {
  const dispatch = useDispatch();

  // Initial form data with existing language details
  const initialFormData = {
    languageInterpreter: existingLanguage?.languageInterpreter || "",
    version: existingLanguage?.version || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when the modal is opened or closed
  useEffect(() => {
    if (show) {
      setFormData(initialFormData);
      setIsSubmitting(false);
    }
  }, [show, existingLanguage]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for updating a language
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
      await dispatch(updateLanguage(existingLanguage.id, formData));

      // Close the modal
      onClose();

      // Trigger any additional success actions
      if (onSuccess) onSuccess();

      // Show success toast
      toast.success("Bahasa berhasil diperbarui.", {
        style: {
          borderRadius: "8px",
          background: "#4BB543",
          color: "#fff",
        },
      });
    } catch (error) {
      // Map backend error to frontend message
      const errorMessage = mapBackendErrorToFrontend(error, true);

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
      isEditMode={true}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
};

UbahLanguage.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  existingLanguage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    languageInterpreter: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  }).isRequired,
};

export default UbahLanguage;
