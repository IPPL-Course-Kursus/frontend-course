import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { getMe, updateProfile } from "../../redux/actions/authActions";
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../../redux/reducers/authReducers";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // useNavigate for navigation
import { toast } from "react-toastify"; // For notification

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Redux state
  const profile = useSelector(selectProfile);
  const profileLoading = useSelector(selectProfileLoading);
  const profileError = useSelector(selectProfileError);

  // Local state for form
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    image: "",
    tanggalLahir: "",
  });
  const [initialForm, setInitialForm] = useState({}); // For change detection
  const [focusedField, setFocusedField] = useState("");
  const [imagePreview, setImagePreview] = useState("/profile.jpg");
  const [imageFile, setImageFile] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false); // For save button activation
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  // Fetch profile data when component mounts
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  // Set form state based on profile data
  useEffect(() => {
    if (profile) {
      const formattedTanggalLahir = profile.tanggalLahir
        ? new Date(profile.tanggalLahir).toISOString().substring(0, 10)
        : "";
      const newForm = {
        fullName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        city: profile.city || "",
        image: profile.image || "",
        tanggalLahir: formattedTanggalLahir || "",
      };

      setForm(newForm);
      setInitialForm(newForm); // Save initial form for change comparison
      setImagePreview(profile.image || "/profile.jpg");
    }
  }, [profile]);

  // Check for form changes or image file changes
  useEffect(() => {
    const formChanged =
      JSON.stringify(form) !== JSON.stringify(initialForm) || imageFile !== null;
    setIsFormChanged(formChanged);
  }, [form, initialForm, imageFile]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Save profile changes
  const handleSave = () => {
    // Validate if any field is empty
    if (!form.fullName || !form.phoneNumber || !form.city || !form.tanggalLahir) {
      toast.error("Data tidak boleh kosong"); // Notification error
      return;
    }

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("city", form.city);
    formData.append("tanggalLahir", form.tanggalLahir);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Set the loading state to true
    setIsSubmitting(true);

    // Dispatch action to update profile
    dispatch(updateProfile(formData))
      .then(() => {
        toast.success("Profil berhasil diperbarui!"); // Success notification

        // Re-fetch the profile data to refresh the state
        dispatch(getMe());

        // Reset submission state and navigate after a delay
        setTimeout(() => {
          setIsSubmitting(false); // Reset submitting state
          navigate("/profile"); // Navigate to profile page
        }, 1000);
      })
      .catch(() => {
        toast.error("Terjadi kesalahan saat memperbarui profil.");
        setIsSubmitting(false); // Reset submitting state on error
      });
  };

  // Handle focus
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setImageFile(file); // Set the file state
    }
  };

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  if (profileError) {
    return <div>Error: {profileError}</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <p className="text-4xl font-bold mb-8 text-center">Profile Saya</p>

      <div className="flex w-full max-w-4xl">
        <div className="flex flex-col items-center mr-12">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-64 h-64 rounded-full border-4 border-blue-800 shadow-lg"
            />
            <div className="absolute bottom-2 right-2 w-16 h-16 bg-white border-2 border-blue-800 flex items-center justify-center shadow-md cursor-pointer rounded-full">
              <FaCamera size={24} color="gray" />
              <input
                type="file"
                accept="image/*"
                className="absolute opacity-0 w-full h-full cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="mt-5 w-full text-center">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleInputChange}
              onFocus={() => handleFocus("fullName")}
              onBlur={handleBlur}
              className={`block w-full py-2 text-center border-b ${
                focusedField === "fullName" ? "border-black" : "border-gray-300"
              } focus:outline-none ${focusedField === "fullName" ? "text-black" : "text-gray-500"}`}
              placeholder="Nama"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-9 flex-1">
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            onFocus={() => handleFocus("email")}
            onBlur={handleBlur}
            className={`block w-full p-2 border-b ${
              focusedField === "email" ? "border-black" : "border-gray-300"
            } focus:outline-none ${focusedField === "email" ? "text-black" : "text-gray-500"}`}
            placeholder="Email"
          />
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleInputChange}
            onFocus={() => handleFocus("phoneNumber")}
            onBlur={handleBlur}
            className={`block w-full p-2 border-b ${
              focusedField === "phoneNumber" ? "border-black" : "border-gray-300"
            } focus:outline-none ${focusedField === "phoneNumber" ? "text-black" : "text-gray-500"}`}
            placeholder="Nomor Telepon"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleInputChange}
            onFocus={() => handleFocus("city")}
            onBlur={handleBlur}
            className={`block w-full p-2 border-b ${
              focusedField === "city" ? "border-black" : "border-gray-300"
            } focus:outline-none ${focusedField === "city" ? "text-black" : "text-gray-500"}`}
            placeholder="Kota"
          />
          <input
            type="date"
            name="tanggalLahir"
            value={form.tanggalLahir}
            onChange={handleInputChange}
            onFocus={() => handleFocus("tanggalLahir")}
            onBlur={handleBlur}
            className={`block w-full p-2 border-b ${
              focusedField === "tanggalLahir" ? "border-black" : "border-gray-300"
            } focus:outline-none ${focusedField === "tanggalLahir" ? "text-black" : "text-gray-500"}`}
            placeholder="Tanggal Lahir"
          />
        </div>
      </div>

      <div className="w-full mt-12">
        <button
          onClick={handleSave}
          className={`w-full py-3 bg-blue-900 text-white rounded-full max-w-5xl mx-auto ${
            (!isFormChanged || isSubmitting) ? "opacity-50 cursor-not-allowed" : "" // Disable button if no changes or during submission
          }`}
          disabled={!isFormChanged || isSubmitting} // Disabled if no form changes or submission in progress
        >
          {isSubmitting ? "Menyimpan..." : "Simpan"} {/* Show loading text when submitting */}
        </button>
      </div>
    </div>
  );
};

export default Profile;
