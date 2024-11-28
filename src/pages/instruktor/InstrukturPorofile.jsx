import { useEffect, useState } from "react";
import SidebarInstruktur from "../../components/Sidebar/SidebarInstruktur";
import { FaBars, FaUpload } from "react-icons/fa";
import { getMe, updateProfile } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { selectProfile } from "../../redux/reducers/authReducers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadSpinner from "../../components/Spinner/LoadSpinner";

const InstrukturProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("/profile.jpg");
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    image: "",
    fullName: "",
    phoneNumber: "",
    city: "",
    tanggalLahir: "",
    email: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

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
      setImagePreview(profile.image || "/images/image/svg/default-profile.png");
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true); // Mark as dirty on input change
  };

const handleSave = () => {
  if (!form.fullName || !form.phoneNumber || !form.city || !form.tanggalLahir) {
    toast.error("Data tidak boleh kosong");
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

  setLoading(true);

  dispatch(updateProfile(formData))
    .then(() => {
      dispatch(getMe());
      toast.success("Profil berhasil diperbarui");
      setTimeout(() => {
        navigate("/inst/profile");
      }, 1000);
    })
    .catch((error) => {
      toast.error("Gagal memperbarui profil: " + (error?.message || "Terjadi kesalahan"));
    })
    .finally(() => {
      setLoading(false);
    });
};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setIsDirty(true); // Mark as dirty on image change
      };
      reader.readAsDataURL(file);
      setImageFile(file); // Set the file state
    }
  };

  // Conditional rendering for profile data
  if (!profile) {
    return <div></div>; // You can replace this with a loading spinner or skeleton component
  }

  return (
    <>
      <div className="flex bg-gray-100 min-h-screen font-poppins">
        <div
          className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarInstruktur />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 p-4 md:p-8 bg-secondary font-poppins overflow-auto">
          <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-xl">
            <button
              className="text-[#0a61aa] md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Instruktur!</h1>
          </div>

          <div className="flex flex-col items-center bg-[#EBF3FC] py-6 mt-10">
            <div className="card w-full max-w-6xl bg-base-100 shadow-xl mb-5">
              <div className="card-body flex flex-col md:flex-row items-center p-10 space-y-8 md:space-y-0">
                <div className="flex flex-col items-center md:w-1/3">
                  <div className="avatar mb-4 relative">
                    <div className="w-48 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden flex items-center justify-center">
                      <img
                        src={imagePreview || "/images/image/svg/default-profile.png"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label
                      htmlFor="imageInput"
                      className="absolute bottom-2 right-2 flex items-center bg-primary text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-opacity-80 transition duration-200"
                      title="Unggah Gambar"
                    >
                      <FaUpload className="w-6 h-6" />
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Form Data Profil */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Nama</span>
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      placeholder="Masukkan Nama"
                      className="input input-bordered placeholder:text-[12px] placeholder:text-[#8A8A8A] w-full rounded-2xl"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Email</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      disabled
                      placeholder="Masukkan Email"
                      className="input input-bordered placeholder:text-[12px] placeholder:text-[#8A8A8A] w-full rounded-2xl"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Nomor Telepon</span>
                    </div>
                    <input
                      type="text" // Tetap sebagai text
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={(e) => {
                        // Hanya mengizinkan angka
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          // Validasi hanya angka
                          handleInputChange(e);
                        }
                      }}
                      placeholder="Masukkan Nomor Telepon"
                      className="input input-bordered placeholder:text-[12px] placeholder:text-[#8A8A8A] w-full rounded-2xl"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Tanggal Lahir</span>
                    </div>
                    <input
                      type="date"
                      name="tanggalLahir"
                      value={form.tanggalLahir}
                      onChange={handleInputChange}
                      className="input input-bordered placeholder:text-[12px] placeholder:text-[#8A8A8A] w-full rounded-2xl hover:cursor-pointer"
                    />
                  </label>
                  <div className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Kota</span>
                    </div>
                    <input
                      type="text"
                      name="city" // Ensure this key matches the form data
                      value={form.city}
                      onChange={handleInputChange}
                      placeholder="Masukkan kota tempat tinggal"
                      className="input input-bordered placeholder:text-[12px] placeholder:text-[#8A8A8A] w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center p-8">
                <button
                  type="button"
                  onClick={handleSave}
                  className={`btn rounded-3xl w-full max-w-xs font-semibold transition-colors duration-300 ${
                    isDirty && !loading
                      ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isDirty || loading} // Disabled jika tidak ada perubahan atau sedang loading
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <LoadSpinner size={24} color="white" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Simpan Profil Saya"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstrukturProfile;
