import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDataCourse } from "../../../redux/actions/instruktorActions";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";

const DataKelasUbah = ({ show, onClose, existingData }) => {
  const dispatch = useDispatch();
  const [requestData, setRequestData] = useState({
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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { category } = useSelector((state) => state.category);
  const { typeCourses } = useSelector((state) => state.typeCourse);
  const { levelCourses } = useSelector((state) => state.levelCourse);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllTypeCourses());
    dispatch(getAllLevelCourses());

    // If existingData is available, set the initial requestData
    if (existingData) {
      setRequestData({
        categoryId: existingData.categoryId,
        courseName: existingData.courseName,
        typeCourseId: existingData.typeCourseId,
        courseLevelId: existingData.courseLevelId,
        coursePrice: existingData.coursePrice,
        courseDiscountPercent: existingData.courseDiscountPercent || "",
        publish: existingData.publish,
        certificateStatus: existingData.certificateStatus,
        intendedFor: existingData.intendedFor,
        aboutCourse: existingData.aboutCourse,
      });
      setImagePreview(existingData.imageUrl); // Assuming existingData has an imageUrl field
    }
  }, [dispatch, existingData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRequestData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "categoryId" ||
        name === "courseLevelId" ||
        name === "coursePrice" ||
        name === "courseDiscountPercent" ||
        name === "typeCourseId"
          ? parseInt(value, 10)
          : value,
    }));
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
      setImagePreview(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating course with data:", requestData); // Perbarui log agar menunjukkan requestData

    try {
      // Buat payload menggunakan data dari requestData
      const payload = {
        categoryId: requestData.categoryId,
        courseName: requestData.courseName,
        typeCourseId: requestData.typeCourseId,
        courseLevelId: requestData.courseLevelId,
        coursePrice: requestData.coursePrice,
        courseDiscountPercent: requestData.courseDiscountPercent || 0, // Jika tidak ada, set default ke 0
        publish: requestData.publish,
        certificateStatus: requestData.certificateStatus,
        intendedFor: requestData.intendedFor,
        aboutCourse: requestData.aboutCourse,
        imageFile: imageFile, // Sertakan imageFile jika ada
      };

      console.log("Payload to update:", payload); // Log payload sebelum dikirim

      await dispatch(updateDataCourse(existingData.id, payload));
      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Failed to update data:", error);
      // Tambahkan error handling jika diperlukan
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
              name="imageFile"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-xl"
            />
            <small className="text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</small>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kategori</label>
            <select
              name="categoryId"
              value={requestData.categoryId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
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

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Kelas</label>
            <inputC
              type="text"
              name="courseName"
              value={requestData.courseName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <select
              name="typeCourseId"
              value={requestData.typeCourseId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
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
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level Kelas</label>
            <select
              name="courseLevelId"
              value={requestData.courseLevelId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
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
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Harga Kelas</label>
            <input
              type="number"
              name="coursePrice"
              value={requestData.coursePrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Rp"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount Kelas</label>
            <input
              type="number"
              name="courseDiscountPercent"
              value={requestData.courseDiscountPercent}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Publish</label>
            <select
              name="publish"
              value={requestData.publish}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">Pilih Status</option>
              <option value={true}>Published</option>
              <option value={false}>Unpublished</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Sertifikat</label>
            <select
              name="certificateStatus"
              value={requestData.certificateStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="">Pilih Status</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Intended For</label>
            <input
              type="text"
              name="intendedFor"
              value={requestData.intendedFor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Siapa yang diperuntukkan?"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Deskripsi Kelas</label>
            <textarea
              name="aboutCourse"
              value={requestData.aboutCourse}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Deskripsi tentang kelas"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Ubah Kelas
          </button>
        </form>
      </div>
    </div>
  );
};

DataKelasUbah.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.object.isRequired,
};

export default DataKelasUbah;
