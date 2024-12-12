import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";
import { addDataKelas, fetchUserCourses } from "../../../redux/actions/instruktorActions";
import LoadSpinner from "../../Spinner/LoadSpinner";

const DataKelasInput = ({ show, onClose }) => {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { category } = useSelector((state) => state.category);
  const { typeCourses } = useSelector((state) => state.typeCourse);
  const { levelCourses } = useSelector((state) => state.levelCourse);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllTypeCourses());
    dispatch(getAllLevelCourses());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Pastikan tipe kelas 'free' menyembunyikan harga dan diskon
    if (name === "typeCourseId") {
      setSelectedType(value); // Setel tipe kelas yang dipilih
      if (value === "free") {
        // Setel harga dan diskon menjadi 0 atau kosong jika tipe kelas free
        setRequestData((prevFormData) => ({
          ...prevFormData,
          coursePrice: 0,
          courseDiscountPercent: 0,
        }));
      } else {
        // Jika tipe kelas bukan free, biarkan nilai sebelumnya
        setRequestData((prevFormData) => ({
          ...prevFormData,
          coursePrice: prevFormData.coursePrice || 0, // Atur harga jika sebelumnya kosong
          courseDiscountPercent: prevFormData.courseDiscountPercent || 0, // Atur diskon jika sebelumnya kosong
        }));
      }
    }

    // Menangani perubahan input lainnya
    setRequestData((prevFormData) => ({
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
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", requestData); // Debug log

    setError(null); // Reset error messages

    let hasError = false;

    // Validasi input requestData jika perlu
    if (!requestData.categoryId) {
      setError("Silahkan isi kategori");
      hasError = true;
    }
    if (!requestData.courseName) {
      setError("Silahkan isi judul kelas");
      hasError = true;
    }
    // Lanjutkan dengan validasi field lainnya jika perlu

    if (hasError) return; // Jika ada error, jangan lanjut

    setLoading(true); // Set loading true sebelum proses async dimulai
    try {
      const response = await dispatch(addDataKelas(requestData, imageFile));
      if (response && response.data) {
        console.log("Data kelas berhasil ditambahkan");
        await dispatch(fetchUserCourses()); // Pastikan data diperbarui di Redux
      }
      onClose(); // Tutup form setelah menambah data
    } catch (err) {
      setError(err.response?.data?.message || "Error adding class");
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
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kelas</h2>

        <form onSubmit={handleSubmit}>
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
            <div className="relative">
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
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Kelas</label>
            <input
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
                    if (/^\d*$/.test(value)) {
                      handleInputChange(e);
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
                  value={requestData.courseDiscountPercent}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleInputChange(e);
                    }
                  }}
                  className="w-full p-2 border rounded-xl"
                  placeholder="%"
                  required
                />
              </div>
            </>
          )}

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
            <label className="block mb-1 font-semibold">Tentang Kelas</label>
            <textarea
              name="aboutCourse"
              value={requestData.aboutCourse}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Deskripsikan kelas ini"
              required
            />
          </div>

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
        </form>
      </div>
    </div>
  );
};

DataKelasInput.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DataKelasInput;
