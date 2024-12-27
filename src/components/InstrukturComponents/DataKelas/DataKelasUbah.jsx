import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDataCourse } from "../../../redux/actions/instruktorActions";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";
import LoadSpinner from "../../Spinner/LoadSpinner";
import toast from "react-hot-toast";

const DataKelasUbah = ({ show, onClose, existingData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryId: "",
    courseName: "",
    typeCourseId: "",
    courseLevelId: "",
    coursePrice: "",
    courseDiscountPercent: "",
    publish: true,
    certificateStatus: true,
    intendedFor: "",
    aboutCourse: "",
  });
  const [categoryIdError, setCategoryIdError] = useState(null);
  const [courseNameError, setCourseNameError] = useState(null);
  const [typeCourseIdError, setTypeCourseIdError] = useState(null);
  const [courseLevelIdError, setCourseLevelIdError] = useState(null);
  // const [coursePriceError, setCoursePriceError] = useState(null);
  // const [courseDiscountPercentError, setCourseDiscountPercentError] = useState(null);
  const [intendedForError, setIntendedForError] = useState(null);
  const [aboutCourseError, setAboutCourseError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [certificateStatusError, setCertificateStatusError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { category } = useSelector((state) => state.category);
  const { typeCourses } = useSelector((state) => state.typeCourse);
  const { levelCourses } = useSelector((state) => state.levelCourse);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllTypeCourses());
    dispatch(getAllLevelCourses());

    if (existingData) {
      setFormData({
        categoryId: existingData.categoryId || "",
        courseName: existingData.courseName || "",
        typeCourseId: existingData.typeCourseId || "",
        courseLevelId: existingData.courseLevelId || "",
        coursePrice: existingData.coursePrice || "",
        courseDiscountPercent: existingData.courseDiscountPercent || "",
        publish: existingData.publish || true,
        certificateStatus: existingData.certificateStatus || true,
        intendedFor: existingData.intendedFor || "",
        aboutCourse: existingData.aboutCourse || "",
      });
      setImagePreview(existingData.image || null);
    }
  }, [dispatch, existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Jika value 'free', set harga dan diskon menjadi 0
    if (value === "free") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        coursePrice: 0,
        courseDiscountPercent: 0,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    if (name === "courseName") {
      setCourseNameError(null);
    } 
    // else if (name === "coursePrice") {
    //   setCoursePriceError(null);
    // } else if (name === "courseDiscountPercent") {
    //   setCourseDiscountPercentError(null);
    // } 
    else if (name === "intendedFor") {
      setIntendedForError(null);
    } else if (name === "aboutCourse") {
      setAboutCourseError(null);
    } else if (name === "categoryId") {
      setCategoryIdError(null);
    } else if (name === "typeCourseId") {
      setTypeCourseIdError(null);
    } else if (name === "courseLevelId") {
      setCourseLevelIdError(null);
    } else if (name === "publish") {
      setPublishError(null);
    } else if (name === "certificateStatus") {
      setCertificateStatusError(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(existingData.image || null); // Reset ke gambar lama jika tidak ada file baru
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!existingData || !existingData.id) {
      console.error("existingData atau ID tidak ditemukan");
      return;
    }

    const updatedData = {
      ...formData,
      image: imageFile ? imageFile : null, // Pastikan imageFile sudah ada dan valid
    };


    setCourseNameError(null);
    // setCoursePriceError(null);
    // setCourseDiscountPercentError(null);
    setIntendedForError(null);
    setAboutCourseError(null);
    setCategoryIdError(null);
    setTypeCourseIdError(null);
    setCourseLevelIdError(null);
    setPublishError(null);
    setCertificateStatusError(null);

    let hasError = false;

    // Validasi input requestData jika perlu
    if (!existingData.categoryId) {
      setCategoryIdError("Silahkan pilih kategori");
      hasError = true;
    }
    if (!existingData.courseName) {
      setCourseNameError("Silahkan isi judul kelas");
      hasError = true;
    }

    if (!existingData.typeCourseId) {
      setTypeCourseIdError("Silahkan pilih tipe kelas");
      hasError = true;
    }

    if (!existingData.courseLevelId) {
      setCourseLevelIdError("Silahkan pilih level kelas");
      hasError = true;
    }
    // if (!existingData.coursePrice) {
    //   setCoursePriceError("Silahkan isi harga kelas");
    //   hasError = true;
    // }
    // if (!existingData.courseDiscountPercent) {
    //   setCourseDiscountPercentError("Silahkan isi diskon kelas");
    //   hasError = true;
    // }
    if (!existingData.intendedFor) {
      setIntendedForError("Silahkan isi tujuan kelas");
      hasError = true;
    }
    if (!existingData.aboutCourse) {
      setAboutCourseError("Silahkan isi tentang kelas");
      hasError = true;
    }
    if (!existingData.publish) {
      setPublishError("Silahkan pilih status publish");
      hasError = true;
    }
    if (!existingData.certificateStatus) {
      setCertificateStatusError("Silahkan pilih status sertifikat");
      hasError = true;
    }

    if (hasError) return; // Jika ada error, jangan lanjut

    setLoading(true);

    try {
      const courseId = existingData.id;

      // Mengupdate data course
      const response = await dispatch(updateDataCourse(courseId, updatedData));

      // Menutup modal setelah update
      onClose();

      // Cek apakah ada pesan dari response backend
      const successMessage = response?.data?.message || "Course berhasil diperbarui!";

      // Menampilkan toast sukses dengan pesan dari backend
      toast.success(successMessage);
    } catch (error) {
      console.error(error);

      // Menampilkan toast error dengan pesan dari backend (jika ada)
      const errorMessage =
        error?.response?.data?.message || "Gagal memperbarui course. Silakan coba lagi.";
      toast.error(errorMessage);
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
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Ubah Kelas</h2>

        <form onSubmit={handleUpdate}>
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
              name="image"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-xl"
            />
            <small className="text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</small>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kategori</label>
            <select
              name="categoryId"
              value={formData.categoryId}
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
            {categoryIdError && <div className="text-red-500">{categoryIdError}</div>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Kelas</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                courseNameError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan judul kelas"
            />
            {courseNameError && <div className="text-red-500">{courseNameError}</div>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <select
              name="typeCourseId"
              value={formData.typeCourseId}
              onChange={(e) => {
                const { value } = e.target;
                handleInputChange(e); // Update state untuk tipe kelas yang dipilih

                // Periksa jika tipe kelas adalah 'free' dan set harga serta diskon menjadi 0
                if (value === "free") {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    coursePrice: 0,
                    courseDiscountPercent: 0,
                  }));
                }
              }}
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

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level Kelas</label>
            <select
              name="courseLevelId"
              value={formData.courseLevelId}
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

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Harga Kelas</label>
            <input
              type="text" // Tetap sebagai teks agar tidak muncul panah
              name="coursePrice"
              value={formData.coursePrice === 0 ? "" : formData.coursePrice} // Kosongkan jika harga 0
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Validasi hanya angka
                  handleInputChange(e); // Perbarui state dengan nilai yang valid
                }
              }}
              className="w-full p-2 border rounded-xl"
              placeholder="Rp"
            />
            {/* {coursePriceError && <div className="text-red-500">{coursePriceError}</div>} */}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount Kelas</label>
            <input
              type="text"
              name="courseDiscountPercent"
              value={formData.courseDiscountPercent === 0 ? "" : formData.courseDiscountPercent} // Kosongkan jika diskon 0
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Validasi hanya angka
                  handleInputChange(e); // Perbarui state dengan nilai diskon
                }
              }}
              className="w-full p-2 border rounded-xl"
              placeholder="%"
            />
            {/* {courseDiscountPercentError && (
              <div className="text-red-500">{courseDiscountPercentError}</div>
            )} */}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Publish</label>
            <select
              name="publish"
              value={formData.publish}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                publishError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Pilih Status</option>
              <option value={true}>Published</option>
              <option value={false}>Unpublished</option>
            </select>
            {publishError && <div className="text-red-500">{publishError}</div>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Sertifikat</label>
            <select
              name="certificateStatus"
              value={formData.certificateStatus}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                certificateStatusError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Pilih Status</option>
              {[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {certificateStatusError && <div className="text-red-500">{certificateStatusError}</div>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Intended For</label>
            <input
              type="text"
              name="intendedFor"
              value={formData.intendedFor}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                intendedForError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Siapa yang diperuntukkan?"
            />
            {intendedForError && <div className="text-red-500">{intendedForError}</div>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Deskripsi Kelas</label>
            <textarea
              name="aboutCourse"
              value={formData.aboutCourse}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                aboutCourseError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Deskripsikan kelas ini"
            />
            {aboutCourseError && <div className="text-red-500">{aboutCourseError}</div>}
          </div>

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
                loading ? "cursor-not-allowed bg-gray-500" : "hover:bg-blue-700 active:bg-blue-800"
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

DataKelasUbah.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.object,
};

export default DataKelasUbah;
