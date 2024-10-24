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

const Profile = () => {
  const dispatch = useDispatch();

  // Ambil state dari Redux
  const profile = useSelector(selectProfile);
  const profileLoading = useSelector(selectProfileLoading);
  const profileError = useSelector(selectProfileError);

  // State lokal untuk form dan fokus input
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
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
      const formattedTanggalLahir = profile.tanggalLahir
        ? new Date(profile.tanggalLahir).toISOString().substring(0, 10)
        : "";
      setForm({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        city: profile.city || "",
        image: profile.image || "",
        tanggalLahir: formattedTanggalLahir || "",
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

  const handleSave = () => {
    const formData = new FormData();

    formData.append("fullName", form.fullName);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("city", form.city);
    formData.append("tanggalLahir", form.tanggalLahir);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    dispatch(updateProfile(formData));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

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
    <div className="flex flex-col items-center p-8">
      {/* Bagian paling atas untuk judul di tengah */}
      <p className="text-4xl font-bold mb-8 text-center">Profile Saya</p>

      <div className="flex w-full max-w-4xl">
        {/* Bagian kiri untuk foto profil */}
        <div className="flex flex-col items-center mr-12">
          <div className="relative">
            {/* Tampilkan preview gambar, ukuran diperbesar */}
            <img
              src={imagePreview}
              alt="Profile"
              className="w-64 h-64 rounded-full border-4 border-blue-800 shadow-lg" // Foto lebih besar
            />

            {/* Ikon untuk mengganti foto profil, ukuran disesuaikan */}
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

          {/* Nama di bawah foto */}
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

        {/* Bagian kanan untuk field email, telepon, dll */}
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

      {/* Tombol Simpan di bagian bawah, memenuhi lebar antara foto profil dan field */}
      <div className="w-full mt-12">
        <button
          onClick={handleSave}
          className="w-full py-3 bg-blue-900 text-white rounded-full max-w-5xl mx-auto"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Profile;
