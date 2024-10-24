import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { getMe, updateProfile } from "../../redux/actions/authActions";
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../../redux/reducers/authReducers";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  // Ambil state dari Redux
  const profile = useSelector(selectProfile);
  const profileLoading = useSelector(selectProfileLoading);
  const profileError = useSelector(selectProfileError);

  // State lokal untuk form dan fokus input
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
    city: "",
    image: "",
    tanggalLahir: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const [imagePreview, setImagePreview] = useState("/profile.jpg");
  const [imageFile, setImageFile] = useState(null);

  // Mengambil data profil dari Redux saat komponen di-mount
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  // Mengatur form state berdasarkan data profil dari Redux
  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        country: profile.country || "",
        city: profile.city || "",
        image: profile.image || "",
        tanggalLahir: profile.tanggalLahir || "",
      });

      setImagePreview(profile.image || "/profile.jpg");
    }
  }, [profile]);

  // Fungsi untuk menangani perubahan input pada form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("fullName", form.fullName);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("country", form.country);
    formData.append("city", form.city);
    formData.append("tanggalLahir", form.tanggalLahir);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Dispatch update profile
    await dispatch(updateProfile(formData));

    // Setelah update sukses, arahkan ke halaman profil
    navigate("/");
  };

  // Fungsi untuk menangani fokus pada input field
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  // Fungsi untuk menangani kehilangan fokus pada input field
  const handleBlur = () => {
    setFocusedField("");
  };

  // Fungsi untuk menangani input file dan preview gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setImageFile(file);
    }
  };

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  if (profileError) {
    return <div>Error: {profileError}</div>;
  }

  return (
    <div className="flex p-8">
      <div className="flex flex-col">
        <div className="relative items-center mr-8">
          {/* Tampilkan preview gambar */}
          <img
            src={imagePreview}
            alt="Profile"
            className="w-52 h-52 rounded-full border-2 border-blue-800 shadow-lg"
          />

          {/* Ikon untuk mengganti foto profil */}
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-white border-2 border-blue-800 flex items-center justify-center shadow-md cursor-pointer">
            <FaCamera size={30} color="gray" />
            <input
              type="file"
              accept="image/*"
              className="absolute opacity-0 w-full h-full cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="flex-1 mt-5">
          <p className="w-full text-3xl font-bold">Profile Saya</p>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInputChange}
            onFocus={() => handleFocus("fullName")}
            onBlur={handleBlur}
            className={`block w-full py-2 border-b ${
              focusedField === "fullName" ? "border-black" : "border-gray-300"
            } focus:outline-none ${focusedField === "fullName" ? "text-black" : "text-gray-500"}`}
            placeholder="Nama"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 ml-8">
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
          name="country"
          value={form.country}
          onChange={handleInputChange}
          onFocus={() => handleFocus("country")}
          onBlur={handleBlur}
          className={`block w-full p-2 border-b ${
            focusedField === "country" ? "border-black" : "border-gray-300"
          } focus:outline-none ${focusedField === "country" ? "text-black" : "text-gray-500"}`}
          placeholder="Negara"
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
          placeholder="tanggalLahir"
        />
        <button onClick={handleSave} className="py-2 bg-blue-900 text-white rounded-full">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Profile;
