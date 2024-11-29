import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDataCourse } from "../../../redux/actions/instruktorActions";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log("Input changed:", name, value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "categoryId" ||
        name === "courseLevelId" ||
        name === "coursePrice" ||
        name === "courseDiscountPercent" ||
        name === "typeCourseId"
          ? value === "" // Jika kosong, set sebagai 0 atau tetap kosong
            ? 0
            : parseInt(value, 10) // Jika ada angka, lakukan parsing
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
      image: imageFile,
    };

    try {
      const courseId = existingData.id;
      console.log("this is response", courseId);

      const response = await dispatch(updateDataCourse(courseId, updatedData));
      console.log("this is response", response);
      // if (response.success) {
      //   onClose();
      // } else {
      //   console.error("Failed to update course:", response.message);
      // }
    } catch (error) {
      console.error(error);
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
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
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
              value={formData.typeCourseId}
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
              value={formData.courseLevelId}
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
              type="text" // Tetap sebagai teks agar tidak muncul panah
              name="coursePrice"
              value={formData.coursePrice}
              onChange={(e) => {
                const value = e.target.value;

                // Validasi hanya angka dan string kosong
                if (/^\d*$/.test(value)) {
                  handleInputChange(e); // Perbarui state dengan nilai yang valid
                }
              }}
              className="w-full p-2 border rounded-xl"
              placeholder="Rp"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount Kelas</label>
            <input
              type="text"
              name="courseDiscountPercent"
              value={formData.courseDiscountPercent}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Validasi hanya angka
                  handleInputChange(e); // Perbarui state
                }
              }}
              className="w-full p-2 border rounded-xl"
              placeholder="%"
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Status Sertifikat</label>
            <select
              name="certificateStatus"
              value={formData.certificateStatus}
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
              value={formData.intendedFor}
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
              value={formData.aboutCourse}
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
  existingData: PropTypes.object,
};

export default DataKelasUbah;
