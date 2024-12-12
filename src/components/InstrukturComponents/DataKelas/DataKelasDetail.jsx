import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";

const DataKelasDetail = ({ show, onClose, existingData }) => {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(existingData.image || null); // Reset ke gambar lama jika tidak ada file baru
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
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Lihat Detail Kelas</h2>

        <div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload File</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="kelas preview"
                className="w-full p-2 border rounded-xl mb-2"
              />
            )}
            {!imagePreview && <p className="text-gray-500">Tidak ada gambar</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kategori</label>
            <input
              type="text"
              value={category.find((cat) => cat.id === formData.categoryId)?.categoryName || ""}
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Kelas</label>
            <input
              type="text"
              value={formData.courseName}
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <input
              type="text"
              value={
                typeCourses.find((typeCourse) => typeCourse.id === formData.typeCourseId)
                  ?.typeName || ""
              }
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level Kelas</label>
            <input
              type="text"
              value={
                levelCourses.find((levelCourse) => levelCourse.id === formData.courseLevelId)
                  ?.levelName || ""
              }
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Harga Kelas</label>
            <input
              type="text"
              value={formData.coursePrice}
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount Kelas</label>
            <input
              type="text"
              value={formData.courseDiscountPercent}
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Publish</label>
            <input
              type="text"
              value={formData.publish ? "Published" : "Unpublished"}
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Sertifikat</label>
            <input
              type="text"
              value={formData.certificateStatus ? "Yes" : "No"}
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Intended For</label>
            <input
              type="text"
              value={formData.intendedFor}
              className="w-full p-2 border rounded-xl"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Deskripsi Kelas</label>
            <textarea
              value={formData.aboutCourse}
              className="w-full p-2 border rounded-xl"
              disabled
              rows="4"
            />
          </div>

          <button
            type="submit"
            onClick={onClose}
            className="w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

DataKelasDetail.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  existingData: PropTypes.object,
};

export default DataKelasDetail;
