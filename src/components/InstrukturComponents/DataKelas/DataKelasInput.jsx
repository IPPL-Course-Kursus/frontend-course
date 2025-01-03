// components/InstrukturComponents/DataKelas/DataKelasInput.jsx

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";
import { addDataKelas, fetchUserCourses } from "../../../redux/actions/instruktorActions";
import LoadSpinner from "../../Spinner/LoadSpinner";
import toast from "react-hot-toast";

const DataKelasInput = ({ show, onClose }) => {
  const dispatch = useDispatch();

  // State untuk form input
  const [requestData, setRequestData] = useState({
    categoryId: "",
    courseName: "",
    typeCourseId: "",
    courseLevelId: "",
    coursePrice: "",
    courseDiscountPercent: "",
    publish: "true", // Simpan sebagai string untuk kecocokan dengan backend
    certificateStatus: "true", // Simpan sebagai string untuk kecocokan dengan backend
    intendedFor: "",
    aboutCourse: "",
    imageFile: null,
  });

  // State untuk error spesifik setiap field
  const [categoryIdError, setCategoryIdError] = useState(null);
  const [courseNameError, setCourseNameError] = useState(null);
  const [typeCourseIdError, setTypeCourseIdError] = useState(null);
  const [courseLevelIdError, setCourseLevelIdError] = useState(null);
  const [intendedForError, setIntendedForError] = useState(null);
  const [aboutCourseError, setAboutCourseError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [certificateStatusError, setCertificateStatusError] = useState(null);
  const [imageFileError, setImageFileError] = useState(null);

  // State untuk error umum dan loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // State untuk tipe kelas yang dipilih
  const [selectedType, setSelectedType] = useState("");

  // State untuk preview gambar
  const [imagePreview, setImagePreview] = useState(null);

  // Selector dari Redux store
  const { category } = useSelector((state) => state.category);
  const { typeCourses } = useSelector((state) => state.typeCourse);
  const { levelCourses } = useSelector((state) => state.levelCourse);
  const existingCourses = useSelector((state) => state.course.mycourse); // Pastikan ini sesuai dengan struktur Redux store Anda

  // Fetch data kategori, tipe kursus, level kursus, dan kursus pengguna saat komponen dimount
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllTypeCourses());
    dispatch(getAllLevelCourses());
    dispatch(fetchUserCourses()); // Untuk memastikan existingCourses terbaru
  }, [dispatch]);

  // Handler untuk perubahan input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Handle perubahan tipe kursus untuk menyembunyikan/memperlihatkan harga dan diskon
    if (name === "typeCourseId") {
      setSelectedType(value);
      if (value === "free") {
        setRequestData((prevFormData) => ({
          ...prevFormData,
          coursePrice: "0",
          courseDiscountPercent: "0",
        }));
      } else {
        setRequestData((prevFormData) => ({
          ...prevFormData,
          coursePrice: prevFormData.coursePrice === "0" ? "" : prevFormData.coursePrice,
          courseDiscountPercent: prevFormData.courseDiscountPercent === "0" ? "" : prevFormData.courseDiscountPercent,
        }));
      }
    }

    // Reset error spesifik saat input berubah
    switch (name) {
      case "categoryId":
        setCategoryIdError(null);
        break;
      case "courseName":
        setCourseNameError(null);
        break;
      case "typeCourseId":
        setTypeCourseIdError(null);
        break;
      case "courseLevelId":
        setCourseLevelIdError(null);
        break;
      case "intendedFor":
        setIntendedForError(null);
        break;
      case "aboutCourse":
        setAboutCourseError(null);
        break;
      case "publish":
        setPublishError(null);
        break;
      case "certificateStatus":
        setCertificateStatusError(null);
        break;
      case "imageFile":
        setImageFileError(null);
        break;
      default:
        break;
    }

    // Update state requestData
    setRequestData((prevFormData) => ({
      ...prevFormData,
      [name]:
        ["categoryId", "courseLevelId", "coursePrice", "courseDiscountPercent", "typeCourseId"].includes(name)
          ? value === ""
            ? ""
            : value // Tetap sebagai string, konversi dilakukan di action
          : value,
    }));
  };

  // Handler untuk upload gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRequestData((prev) => ({
        ...prev,
        imageFile: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFileError(null);
    } else {
      setRequestData((prev) => ({
        ...prev,
        imageFile: null,
      }));
      setImagePreview(null);
    }
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset semua state error
    setError(null);
    setCategoryIdError(null);
    setCourseNameError(null);
    setTypeCourseIdError(null);
    setCourseLevelIdError(null);
    setIntendedForError(null);
    setAboutCourseError(null);
    setPublishError(null);
    setCertificateStatusError(null);
    setImageFileError(null);

    let hasError = false;

    // Validasi input
    if (!requestData.categoryId) {
      setCategoryIdError("Silahkan pilih kategori");
      hasError = true;
    }

    if (!requestData.courseName.trim()) {
      setCourseNameError("Silahkan isi judul kelas");
      hasError = true;
    }

    if (!requestData.typeCourseId) {
      setTypeCourseIdError("Silahkan pilih tipe kelas");
      hasError = true;
    }

    if (!requestData.courseLevelId) {
      setCourseLevelIdError("Silahkan pilih level kelas");
      hasError = true;
    }

    if (!requestData.intendedFor.trim()) {
      setIntendedForError("Silahkan isi tujuan kelas");
      hasError = true;
    }

    if (!requestData.aboutCourse.trim()) {
      setAboutCourseError("Silahkan isi tentang kelas");
      hasError = true;
    }

    if (requestData.publish === "") {
      setPublishError("Silahkan pilih status publish");
      hasError = true;
    }

    if (requestData.certificateStatus === "") {
      setCertificateStatusError("Silahkan pilih status sertifikat");
      hasError = true;
    }

    if (!requestData.imageFile) {
      setImageFileError("Silahkan upload file");
      hasError = true;
    }

    if (hasError) return;

    // Validasi duplikasi di frontend
    const duplicateCourse = existingCourses.find(
      (course) =>
        course.categoryId === parseInt(requestData.categoryId, 10) &&
        course.courseName.toLowerCase() === requestData.courseName.trim().toLowerCase()
    );

    if (duplicateCourse) {
      setCourseNameError("Judul kelas sudah ada .");
      // setError("Judul kelas sudah tersedia.");
      toast.error("Judul kelas sudah tersedia"); // Notifikasi error dalam Bahasa Indonesia
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(addDataKelas(requestData, requestData.imageFile));

      // Asumsikan action menangani pengambilan data kursus terbaru
      toast.success("Data kelas berhasil ditambahkan"); // Notifikasi sukses dalam Bahasa Indonesia
      onClose();

      // Reset form setelah berhasil
      setRequestData({
        categoryId: "",
        courseName: "",
        typeCourseId: "",
        courseLevelId: "",
        coursePrice: "",
        courseDiscountPercent: "",
        publish: "true",
        certificateStatus: "true",
        intendedFor: "",
        aboutCourse: "",
        imageFile: null,
      });
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      let backendError = err.response?.data?.message || "Gagal menambahkan kelas";

      // Debug: Log pesan error dari backend
      console.log("Pesan Error dari Backend:", backendError);

      // Mapping pesan error dari bahasa Inggris ke Bahasa Indonesia
      if (
        backendError.toLowerCase().includes("course already exists") ||
        backendError.toLowerCase().includes("course with the same name already exists")
      ) {
        backendError = "Judul kelas telah digunakan";
      }

      setError(backendError);
      toast.error(backendError); // Notifikasi error dalam Bahasa Indonesia

      // Jika error terkait duplikasi, set error spesifik
      if (backendError.includes("sudah ada")) {
        setCourseNameError("Gunakan Judul kelas yang lainnya");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kelas</h2>

        {/* Tampilkan pesan error umum */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Upload Gambar */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload File</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="kelas preview"
                className="w-full p-2 border rounded-xl mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={handleImageUpload}
              className={`w-full p-2 border rounded-xl ${
                imageFileError ? "border-red-500" : "border-gray-300"
              }`}
            />
            <small className="text-gray-500">SVG, PNG, JPG atau GIF (MAX. 800x400px).</small>
            {imageFileError && <div className="text-red-500">{imageFileError}</div>}
          </div>

          {/* Pilih Kategori */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kategori</label>
            <div className="relative">
              <select
                name="categoryId"
                value={requestData.categoryId}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-xl ${
                  categoryIdError ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled hidden>
                  Pilih
                </option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
            {categoryIdError && <div className="text-red-500">{categoryIdError}</div>}
          </div>

          {/* Nama Kelas */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Kelas</label>
            <input
              type="text"
              name="courseName"
              value={requestData.courseName}
              onChange={handleInputChange}
              placeholder="Masukkan judul kelas"
              className={`w-full p-2 border rounded-xl ${
                courseNameError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {courseNameError && <div className="text-red-500">{courseNameError}</div>}
          </div>

          {/* Pilih Tipe Kelas */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <select
              name="typeCourseId"
              value={requestData.typeCourseId}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                typeCourseIdError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled hidden>
                Pilih
              </option>
              {typeCourses.map((typeCourse) => (
                <option key={typeCourse.id} value={typeCourse.id}>
                  {typeCourse.typeName}
                </option>
              ))}
            </select>
            {typeCourseIdError && <div className="text-red-500">{typeCourseIdError}</div>}
          </div>

          {/* Pilih Level Kelas */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level Kelas</label>
            <select
              name="courseLevelId"
              value={requestData.courseLevelId}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                courseLevelIdError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled hidden>
                Pilih
              </option>
              {levelCourses.map((levelCourse) => (
                <option key={levelCourse.id} value={levelCourse.id}>
                  {levelCourse.levelName}
                </option>
              ))}
            </select>
            {courseLevelIdError && <div className="text-red-500">{courseLevelIdError}</div>}
          </div>

          {/* Harga dan Diskon Kelas */}
          {selectedType !== "free" && (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Harga Kelas</label>
                <input
                  type="text"
                  name="coursePrice"
                  value={requestData.coursePrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Periksa jika input valid atau 0
                    if (/^\d*$/.test(value)) {
                      handleInputChange(e);
                    }
                  }}
                  className={`w-full p-2 border rounded-xl`}
                  placeholder="Rp"
                />
                {/* Jika Anda mengaktifkan kembali validasi harga, tambahkan pesan error di sini */}
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Discount Kelas</label>
                <input
                  type="text"
                  name="courseDiscountPercent"
                  value={requestData.courseDiscountPercent}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Periksa jika input valid atau 0
                    if (/^\d*$/.test(value)) {
                      handleInputChange(e);
                    }
                  }}
                  className={`w-full p-2 border rounded-xl`}
                  placeholder="%"
                />
                {/* Jika Anda mengaktifkan kembali validasi diskon, tambahkan pesan error di sini */}
              </div>
            </>
          )}

          {/* Status Publish */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Publish</label>
            <select
              name="publish"
              value={requestData.publish}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                publishError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled hidden>
                Pilih Status
              </option>
              <option value="true">Published</option>
              <option value="false">Unpublished</option>
            </select>
            {publishError && <div className="text-red-500">{publishError}</div>}
          </div>

          {/* Status Sertifikat */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Sertifikat</label>
            <select
              name="certificateStatus"
              value={requestData.certificateStatus}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                certificateStatusError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled hidden>
                Pilih Status
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {certificateStatusError && <div className="text-red-500">{certificateStatusError}</div>}
          </div>

          {/* Intended For */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Intended For</label>
            <input
              type="text"
              name="intendedFor"
              value={requestData.intendedFor}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                intendedForError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Siapa yang diperuntukkan?"
            />
            {intendedForError && <div className="text-red-500">{intendedForError}</div>}
          </div>

          {/* Tentang Kelas */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tentang Kelas</label>
            <textarea
              name="aboutCourse"
              value={requestData.aboutCourse}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                aboutCourseError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Deskripsikan kelas ini"
            />
            {aboutCourseError && <div className="text-red-500">{aboutCourseError}</div>}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
                loading
                  ? "cursor-not-allowed bg-gray-500"
                  : "hover:bg-blue-700 active:bg-blue-800"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadSpinner size={24} color="white" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Tambah"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DataKelasInput.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DataKelasInput;
