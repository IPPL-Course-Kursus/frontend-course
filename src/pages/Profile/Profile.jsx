import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { getMe, updateProfile } from "../../redux/actions/authActions"; // Import action getMe dan updateProfile
import { selectProfile, selectProfileLoading, selectProfileError } from "../../redux/reducers/authReducers"; // Import selectors

const Profile = () => {
  const dispatch = useDispatch();

  // Ambil state dari Redux
  const profile = useSelector(selectProfile);
  const profileLoading = useSelector(selectProfileLoading);
  const profileError = useSelector(selectProfileError);

  // State lokal untuk form dan fokus input
  const [form, setForm] = useState({
    fullName: "",
    // email: "",
    phoneNumber: "",
    // bio: "",
    country: "",
    city: "",
    // address: "",
  });
  const [focusedField, setFocusedField] = useState("");

  // Mengambil data profil dari Redux saat komponen di-mount
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Mengatur form state berdasarkan data profil dari Redux
  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        // bio: profile.bio || "",
        country: profile.country || "",
        city: profile.city || "",
        // address: profile.address || "",
      });
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

  // Fungsi untuk menyimpan perubahan pada form
  const handleSave = () => {
    // Buat salinan dari form dan hapus email
    const updatedForm = { ...form };
    delete updatedForm.email; // Menghapus email dari objek
  
    // Dispatch action untuk mengupdate profil dengan data tanpa email
    dispatch(updateProfile(updatedForm));
  };

  // Fungsi untuk menangani fokus pada input field
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  // Fungsi untuk menangani kehilangan fokus pada input field
  const handleBlur = () => {
    setFocusedField("");
  };

  // Menampilkan loading atau error jika ada
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
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-52 h-52 rounded-full border-2 border-blue-800 shadow-lg"
          />

          {/* Ikon untuk mengganti foto profil */}
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-white border-2 border-blue-800 flex items-center justify-center shadow-md cursor-pointer">
            <FaCamera size={30} color="gray" />
          </div>
        </div>
        <div className="flex-1 mt-5">
          <p className="w-full text-3xl font-bold">Profile Saya</p>{" "}
          {/* Teks di bawah foto profil */}
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInputChange}
            onFocus={() => handleFocus("fullName")}
            onBlur={handleBlur}
            className={`block w-full py-2 border-b ${
              focusedField === "fullName" ? "border-black" : "border-gray-300"
            } focus:outline-none ${
              focusedField === "fullName" ? "text-black" : "text-gray-500"
            }`}
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
          } focus:outline-none ${
            focusedField === "email" ? "text-black" : "text-gray-500"
          }`}
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
          } focus:outline-none ${
            focusedField === "phoneNumber" ? "text-black" : "text-gray-500"
          }`}
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
          } focus:outline-none ${
            focusedField === "country" ? "text-black" : "text-gray-500"
          }`}
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
          } focus:outline-none ${
            focusedField === "city" ? "text-black" : "text-gray-500"
          }`}
          placeholder="Kota"
        />
        {/* <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleInputChange}
          onFocus={() => handleFocus("city")}
          onBlur={handleBlur}
          className={`block w-full p-2 border-b ${
            focusedField === "city" ? "border-black" : "border-gray-300"
          } focus:outline-none ${
            focusedField === "city" ? "text-black" : "text-gray-500"
          }`}
          placeholder="Kota"
        /> */}
        {/* <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleInputChange}
          onFocus={() => handleFocus("address")}
          onBlur={handleBlur}
          className={`block w-full p-2 border-b ${
            focusedField === "address" ? "border-black" : "border-gray-300"
          } focus:outline-none ${
            focusedField === "address" ? "text-black" : "text-gray-500"
          }`}
          placeholder="Alamat"
        /> */}
        <button onClick={handleSave} className="py-2 bg-blue-900 text-white rounded-full">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Profile;