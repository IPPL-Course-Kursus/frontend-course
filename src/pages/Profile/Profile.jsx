import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    country: "",
    city: "",
    address: "",
  });

  const [form, setForm] = useState({ ...profile });
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfile(form);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  return (
    <div className="flex p-8">
      <div className="flex flex-col">
        <div className="relative items-center mr-8">
          <img
            src="/profile.jpg"
            alt=""
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
            type="bio"
            name="bio"
            value={form.bio}
            onChange={handleInputChange}
            onFocus={() => handleFocus("bio")}
            onBlur={handleBlur}
            className={`block w-full py-2 border-b ${
              focusedField === "bio" ? "border-black" : "border-gray-300"
            } focus:outline-none ${focusedField === "bio" ? "text-black" : "text-gray-500"}`}
            placeholder="Bio"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 ml-8">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          onFocus={() => handleFocus("name")}
          onBlur={handleBlur}
          className={`block w-full p-2 border-b ${
            focusedField === "name" ? "border-black" : "border-gray-300"
          } focus:outline-none ${focusedField === "name" ? "text-black" : "text-gray-500"}`}
          placeholder="Nama"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          className={`block w-full p-2 border-b ${
            focusedField === "email" ? "border-black" : "border-gray-300"
          } focus:outline-none ${focusedField === "email" ? "text-black" : "text-gray-500"}`}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleInputChange}
          onFocus={() => handleFocus("phone")}
          onBlur={handleBlur}
          className={`block w-full p-2 border-b ${
            focusedField === "phone" ? "border-black" : "border-gray-300"
          } focus:outline-none ${focusedField === "phone" ? "text-black" : "text-gray-500"}`}
          placeholder="Nomor Telepon"
        />
        <input
          type="country"
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
          type="city"
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
          type="address"
          name="address"
          value={form.address}
          onChange={handleInputChange}
          onFocus={() => handleFocus("address")}
          onBlur={handleBlur}
          className={`block w-full p-2 border-b ${
            focusedField === "address" ? "border-black" : "border-gray-300"
          } focus:outline-none ${focusedField === "address" ? "text-black" : "text-gray-500"}`}
          placeholder="Alamat"
        />
        <button onClick={handleSave} className="py-2 bg-blue-900 text-white rounded-full">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Profile;
