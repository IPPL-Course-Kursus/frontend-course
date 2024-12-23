export const mapBackendErrorToFrontend = (error, isEdit = false) => {
    if (!error || !error.response || !error.response.data) {
      return isEdit
        ? "Gagal memperbarui bahasa. Silakan coba lagi."
        : "Gagal menambahkan bahasa. Silakan coba lagi.";
    }
  
    const backendMessage = error.response.data.message.toLowerCase();
  
    if (backendMessage.includes("category already exists") || backendMessage.includes("sudah ada")) {
      return isEdit
        ? "Gagal memperbarui nama bahasa, bahasa sudah ada."
        : "Bahasa sudah ada.";
    }
  
    return error.response.data.message || (isEdit ? "Gagal memperbarui bahasa. Silakan coba lagi." : "Gagal menambahkan bahasa. Silakan coba lagi.");
  };
  