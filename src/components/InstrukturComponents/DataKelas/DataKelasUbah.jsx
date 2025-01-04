import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDataCourse,
  fetchUserCourses,
} from "../../../redux/actions/instruktorActions";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";
import LoadSpinner from "../../Spinner/LoadSpinner";
import toast from "react-hot-toast";

const DataKelasUbah = ({ show, onClose, existingData }) => {
  const dispatch = useDispatch();

  // Form data state
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

  // Error states
  const [categoryIdError, setCategoryIdError] = useState(null);
  const [courseNameError, setCourseNameError] = useState(null);
  const [typeCourseIdError, setTypeCourseIdError] = useState(null);
  const [courseLevelIdError, setCourseLevelIdError] = useState(null);
  const [coursePriceError, setCoursePriceError] = useState(null);
  const [courseDiscountPercentError, setCourseDiscountPercentError] = useState(null);
  const [intendedForError, setIntendedForError] = useState(null);
  const [aboutCourseError, setAboutCourseError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [certificateStatusError, setCertificateStatusError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Selectors dengan fallback untuk mencegah destructuring undefined
  const category = useSelector((state) => state.category?.category || []);
  const typeCourses = useSelector((state) => state.typeCourse?.typeCourses || []);
  const levelCourses = useSelector((state) => state.levelCourse?.levelCourses || []);
  const courses = useSelector((state) => state.instruktor?.courses || []);

  // Logging untuk debugging
  console.log("Courses from Redux Store:", courses);
  console.log("Existing Data Prop:", existingData);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllTypeCourses());
    dispatch(getAllLevelCourses());
    dispatch(fetchUserCourses()); // Ambil semua kursus untuk pengecekan duplikasi

    if (existingData) {
      console.log("Setting form data with existingData:", existingData);
      setFormData({
        categoryId: existingData.categoryId || "",
        courseName: existingData.courseName || "",
        typeCourseId: existingData.typeCourseId || "",
        courseLevelId: existingData.courseLevelId || "",
        coursePrice: existingData.coursePrice || "",
        courseDiscountPercent: existingData.courseDiscountPercent || "",
        publish:
          existingData.publish !== undefined ? existingData.publish : true,
        certificateStatus:
          existingData.certificateStatus !== undefined
            ? existingData.certificateStatus
            : true,
        intendedFor: existingData.intendedFor || "",
        aboutCourse: existingData.aboutCourse || "",
      });
      setImagePreview(existingData.image || null);
    }
  }, [dispatch, existingData]);

  // Fungsi untuk memeriksa duplikasi kata
  const checkDuplicateWords = (text) => {
    const words = text
      .toLowerCase()
      .split(/\s+/) // Memisahkan kata berdasarkan spasi
      .filter((word) => word.trim() !== ""); // Mengabaikan kata kosong
    const wordSet = new Set(words); // Menggunakan Set untuk menghilangkan duplikasi
    return words.length !== wordSet.size; // Jika panjang array berbeda dengan size Set, berarti ada duplikasi
  };

  // Fungsi untuk memeriksa nama kelas yang duplikat
  const checkDuplicateCourseName = (name) => {
    if (!existingData || !existingData.id) {
      console.log("Existing data or ID not found. Skipping duplicate name check.");
      return false;
    }
    const existingIdStr = existingData.id.toString();
    const isDuplicate = courses.some(
      (course) =>
        course.courseName.toLowerCase() === name.toLowerCase() &&
        course.id.toString() !== existingIdStr
    );
    console.log(`Is "${name}" a duplicate course name?`, isDuplicate);
    return isDuplicate;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);

    if (name === "courseName") {
      if (checkDuplicateCourseName(value)) {
        setCourseNameError("Nama kelas sudah terdaftar.");
        toast.error("Nama kelas sudah ada! Silakan pilih nama lain.");
        return; // Jangan perbarui formData.courseName
      } else {
        setCourseNameError(null);
      }
    }

    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      // Handle special cases untuk "typeCourseId" (free/premium)
      if (name === "typeCourseId") {
        const selectedType = typeCourses.find(
          (type) => type.id.toString() === value.toString()
        );
        if (selectedType) {
          if (selectedType.typeName.toLowerCase() === "free") {
            updatedFormData.coursePrice = 0;
            updatedFormData.courseDiscountPercent = 0;
          } else if (selectedType.typeName.toLowerCase() === "premium") {
            // Jika beralih ke premium dan harga saat ini kurang dari 10000, set ke 10000
            updatedFormData.coursePrice = Math.max(
              parseInt(prevFormData.coursePrice, 10) || 0,
              10000
            );
          }
        }
      }

      // Handle konversi nilai "publish" dan "certificateStatus" ke boolean
      if (name === "publish") {
        updatedFormData.publish = value === "true";
      }
      if (name === "certificateStatus") {
        updatedFormData.certificateStatus = value === "true";
      }

      // Clear errors ketika pengguna mulai mengetik (selain courseName sudah dihandle di atas)
      switch (name) {
        case "categoryId":
          setCategoryIdError(null);
          break;
        case "typeCourseId":
          setTypeCourseIdError(null);
          break;
        case "courseLevelId":
          setCourseLevelIdError(null);
          break;
        case "coursePrice":
          setCoursePriceError(null);
          break;
        case "courseDiscountPercent":
          setCourseDiscountPercentError(null);
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
        default:
          break;
      }

      return updatedFormData;
    });
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("Image file selected:", file);
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        console.log("Image preview set:", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(existingData?.image || null); // Reset ke existing image jika tidak ada file baru yang dipilih
      console.log("Image file cleared. Preview reset to existing image.");
    }
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;

    // Category
    if (!formData.categoryId) {
      setCategoryIdError("Kategori harus dipilih.");
      isValid = false;
      console.log("Validation Error: Category not selected");
    }

    // Course Name
    if (!formData.courseName.trim()) {
      setCourseNameError("Nama kelas tidak boleh kosong.");
      isValid = false;
      console.log("Validation Error: Course name is empty");
    } else if (checkDuplicateWords(formData.courseName)) {
      setCourseNameError("Nama kelas tidak boleh mengandung duplikasi kata.");
      toast.error("Nama kelas tidak boleh mengandung duplikasi kata.");
      isValid = false;
      console.log("Validation Error: Duplicate words in course name");
    } else if (checkDuplicateCourseName(formData.courseName)) {
      setCourseNameError("Nama kelas sudah terdaftar.");
      toast.error("Nama kelas sudah ada! Silakan pilih nama lain.");
      isValid = false;
      console.log("Validation Error: Duplicate course name");
    }

    // Type Course
    if (!formData.typeCourseId) {
      setTypeCourseIdError("Tipe kelas harus dipilih.");
      isValid = false;
      console.log("Validation Error: Type course not selected");
    }

    // Course Level
    if (!formData.courseLevelId) {
      setCourseLevelIdError("Level kelas harus dipilih.");
      isValid = false;
      console.log("Validation Error: Course level not selected");
    }

    // Intended For
    if (!formData.intendedFor.trim()) {
      setIntendedForError("Bidang 'Intended For' tidak boleh kosong.");
      isValid = false;
      console.log("Validation Error: Intended For is empty");
    } else if (checkDuplicateWords(formData.intendedFor)) {
      setIntendedForError("Bidang 'Intended For' tidak boleh mengandung duplikasi kata.");
      toast.error("Bidang 'Intended For' tidak boleh mengandung duplikasi kata.");
      isValid = false;
      console.log("Validation Error: Duplicate words in Intended For");
    }

    // About Course
    if (!formData.aboutCourse.trim()) {
      setAboutCourseError("Deskripsi kelas tidak boleh kosong.");
      isValid = false;
      console.log("Validation Error: About Course is empty");
    } else if (checkDuplicateWords(formData.aboutCourse)) {
      setAboutCourseError("Deskripsi kelas tidak boleh mengandung duplikasi kata.");
      toast.error("Deskripsi kelas tidak boleh mengandung duplikasi kata.");
      isValid = false;
      console.log("Validation Error: Duplicate words in About Course");
    }

    // Publish Status
    if (formData.publish === "") {
      setPublishError("Status publish harus dipilih.");
      isValid = false;
      console.log("Validation Error: Publish status not selected");
    }

    // Certificate Status
    if (formData.certificateStatus === "") {
      setCertificateStatusError("Status sertifikat harus dipilih.");
      isValid = false;
      console.log("Validation Error: Certificate status not selected");
    }

    // Course Price
    const selectedTypeCourse = typeCourses.find(
      (type) => type.id.toString() === formData.typeCourseId.toString()
    );

    if (selectedTypeCourse) {
      if (selectedTypeCourse.typeName.toLowerCase() === "premium") {
        if (!formData.coursePrice) {
          setCoursePriceError("Harga kelas harus diisi untuk tipe Premium.");
          isValid = false;
          console.log("Validation Error: Course price not filled for premium");
        } else if (Number(formData.coursePrice) < 10000) {
          setCoursePriceError("Harga untuk tipe Premium harus lebih dari atau sama dengan 10.000.");
          toast.error("Harga untuk tipe Premium harus minimal 10.000.");
          isValid = false;
          console.log("Validation Error: Course price below 10,000 for premium");
        }
      } else if (selectedTypeCourse.typeName.toLowerCase() === "free") {
        // Untuk kursus gratis, pastikan harga adalah 0
        if (Number(formData.coursePrice) !== 0) {
          setCoursePriceError("Harga harus 0 untuk tipe Free.");
          toast.error("Harga harus 0 untuk tipe Free.");
          isValid = false;
          console.log("Validation Error: Course price not 0 for free");
        }
      }
    }

    return isValid;
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Perform validation
    const isFormValid = validateForm();
    if (!isFormValid) {
      console.log("Form validation failed. Submission stopped.");
      return; // Stop the form submission if validation fails
    }

    // Ensure that existingData and its ID are available
    if (!existingData || !existingData.id) {
      console.error("existingData atau ID tidak ditemukan");
      toast.error("Data kelas tidak ditemukan.");
      return;
    }

    const updatedData = {
      ...formData,
      image: imageFile || null, // Include image file if available
    };

    setLoading(true);
    console.log("Submitting updated data:", updatedData);

    try {
      const courseId = existingData.id;

      // Dispatch update action
      const response = await dispatch(updateDataCourse(courseId, updatedData));

      console.log("Update response:", response);

      // After update, fetch the latest data for courses
      if (response?.data) {
        // Refresh the course list dengan data terbaru
        dispatch(fetchUserCourses()); // Fetch updated course data after successful update
        console.log("Fetched updated courses after update.");
      }

      // Close modal dan tampilkan pesan sukses
      onClose();
      toast.success(response?.data?.message || "Course updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error?.response?.data?.message || "Failed to update course. Please try again.");
    } finally {
      setLoading(false);
      console.log("Loading state set to false.");
    }
  };

  // Jika modal tidak terlihat, kembalikan null
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
          {/* Image Upload */}
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
            <small className="text-gray-500">SVG, PNG, JPG atau GIF (MAX. 800x400px).</small>
          </div>

          {/* Category */}
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
                Pilih Kategori
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            {categoryIdError && <div className="text-red-500">{categoryIdError}</div>}
          </div>

          {/* Course Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nama Kelas</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                courseNameError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nama kelas"
              required
            />
            {courseNameError && <div className="text-red-500">{courseNameError}</div>}
          </div>

          {/* Type Course */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <select
              name="typeCourseId"
              value={formData.typeCourseId}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                typeCourseIdError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled hidden>
                Pilih Tipe Kelas
              </option>
              {typeCourses.map((typeCourse) => (
                <option key={typeCourse.id} value={typeCourse.id}>
                  {typeCourse.typeName}
                </option>
              ))}
            </select>
            {typeCourseIdError && <div className="text-red-500">{typeCourseIdError}</div>}
          </div>

          {/* Level Course */}
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
                Pilih Level Kelas
              </option>
              {levelCourses.map((levelCourse) => (
                <option key={levelCourse.id} value={levelCourse.id}>
                  {levelCourse.levelName}
                </option>
              ))}
            </select>
            {courseLevelIdError && <div className="text-red-500">{courseLevelIdError}</div>}
          </div>

          {/* Course Price */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Harga Kelas</label>
            <input
              type="number"
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                coursePriceError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Harga Kelas"
              required={(() => {
                const selectedType = typeCourses.find(
                  (type) => type.id.toString() === formData.typeCourseId.toString()
                );
                return selectedType?.typeName.toLowerCase() === "premium";
              })()}
              min={(() => {
                const selectedType = typeCourses.find(
                  (type) => type.id.toString() === formData.typeCourseId.toString()
                );
                return selectedType?.typeName.toLowerCase() === "premium" ? 10000 : 0;
              })()}
            />
            {coursePriceError && <div className="text-red-500">{coursePriceError}</div>}
          </div>

          {/* Course Discount */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Diskon Kelas</label>
            <input
              type="number"
              name="courseDiscountPercent"
              value={formData.courseDiscountPercent}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                courseDiscountPercentError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="%"
            />
            {courseDiscountPercentError && (
              <div className="text-red-500">
                {courseDiscountPercentError}
              </div>
            )}
          </div>

          {/* Publish Status */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Publish</label>
            <select
              name="publish"
              value={formData.publish.toString()} // Mengonversi boolean ke string
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

          {/* Certificate Status */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Status Sertifikat
            </label>
            <select
              name="certificateStatus"
              value={formData.certificateStatus.toString()} // Mengonversi boolean ke string
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-xl ${
                certificateStatusError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled hidden>
                Pilih Status
              </option>
              <option value="true">Tersedia</option>
              <option value="false">Tidak Tersedia</option>
            </select>
            {certificateStatusError && (
              <div className="text-red-500">
                {certificateStatusError}
              </div>
            )}
          </div>

          {/* Intended For */}
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
              required
            />
            {intendedForError && <div className="text-red-500">{intendedForError}</div>}
          </div>

          {/* Description */}
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
              required
            />
            {aboutCourseError && <div className="text-red-500">{aboutCourseError}</div>}
          </div>

          {/* Submit Button */}
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
              disabled={loading || courseNameError}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
                loading || courseNameError
                  ? "cursor-not-allowed bg-gray-500"
                  : "hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadSpinner size={24} color="white" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Ubah"
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
