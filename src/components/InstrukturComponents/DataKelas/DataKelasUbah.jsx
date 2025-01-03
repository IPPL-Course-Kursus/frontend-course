import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDataCourse, fetchUserCourses } from "../../../redux/actions/instruktorActions";
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
      setImagePreview(existingData.image || null );
    }
  }, [dispatch, existingData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      // Handle special cases for "free" and "premium"
      if (name === "typeCourseId") {
        if (value === "free") {
          updatedFormData.coursePrice = 0;
          updatedFormData.courseDiscountPercent = 0;
        } else if (value === "premium") {
          updatedFormData.coursePrice = Math.max(prevFormData.coursePrice, 10000); // Ensure minimum price for premium
        }
      }

      // Clear errors when user starts typing
      if (name === "coursePrice") {
        setCoursePriceError(null);
      }
      if (name === "courseDiscountPercent") {
        setCourseDiscountPercentError(null);
      }

      return updatedFormData;
    });
  };

  // Handle image upload and preview
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
      setImagePreview(existingData.image || null); // Reset to existing image if no new file is selected
    }
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate price for premium courses
    if (formData.typeCourseId === "premium" && formData.coursePrice < 10000) {
      setCoursePriceError("Harga untuk tipe Premium harus lebih dari atau sama dengan 10.000");
      return; // Stop the form submission if the price is too low
    } else {
      setCoursePriceError(null); // Clear the error if valid
    }

    // Ensure that existingData and its ID are available
    if (!existingData || !existingData.id) {
      console.error("existingData or ID not found");
      return;
    }

    const updatedData = {
      ...formData,
      image: imageFile || null, // Include image file if available
    };

    setLoading(true);

    try {
      const courseId = existingData.id;

      // Dispatch update action
      const response = await dispatch(updateDataCourse(courseId, updatedData));

      // After update, fetch the latest data for courses
      if (response?.data) {
        // Refresh the course list with the latest data
        dispatch(fetchUserCourses()); // Fetch updated course data after successful update
      }

      // Close modal and show success message
      onClose();
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      toast.success(response?.data?.message || "Course updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If modal is not visible, return null
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
            <small className="text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</small>
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
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan nama kelas"
              required
            />
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
              required
            />
            {coursePriceError && <div className="text-red-500">{coursePriceError}</div>}
          </div>

          {/* Course Discount */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount Kelas</label>
            <input
              type="number"
              name="courseDiscountPercent"
              value={formData.courseDiscountPercent}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="%"
            />
            {courseDiscountPercentError && <div className="text-red-500">{courseDiscountPercentError}</div>}
          </div>

          {/* Publish Status */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Publish</label>
            <select
              name="publish"
              value={formData.publish}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">Pilih Status</option>
              <option value={true}>Published</option>
              <option value={false}>Unpublished</option>
            </select>
          </div>

          {/* Certificate Status */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Sertifikat</label>
            <select
              name="certificateStatus"
              value={formData.certificateStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">Pilih Status</option>
              {[{ value: true, label: "Yes" }, { value: false, label: "No" }].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Intended For */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Intended For</label>
            <input
              type="text"
              name="intendedFor"
              value={formData.intendedFor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Siapa yang diperuntukkan?"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Deskripsi Kelas</label>
            <textarea
              name="aboutCourse"
              value={formData.aboutCourse}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Deskripsikan kelas ini"
              required
            />
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
              disabled={loading}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
                loading ? "cursor-not-allowed bg-gray-500" : "hover:bg-blue-700"
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
