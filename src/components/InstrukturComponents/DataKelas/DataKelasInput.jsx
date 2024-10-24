import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/actions/categoryActions";
import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";
import { addDataKelas } from "../../../redux/actions/instruktorActions";
// import toast from "react-hot-toast";

const DataKelasInput = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    courseName: "",
    typeName: "",
    levelName: "",
    coursePrice: "",
    courseDiscountPercent: "",
    totalDuration: "",
    fullName: "",
    publish: "",
    certificateStatus: "",
    intendedFor: "",
    aboutCourse: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { typeCourses } = useSelector((state) => state.typeCourse);
  const { levelCourses } = useSelector((state) => state.levelCourse);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllTypeCourses());
    dispatch(getAllLevelCourses());
  }, [dispatch]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("add data kelas:", formData);

    const formDataToSend = new FormData();

    formDataToSend.append("categoryId", formData.categoryName); // Ganti dengan ID kategori yang benar
    formDataToSend.append("courseName", formData.courseName);
    formDataToSend.append("typeCourseId", formData.typeName); // Ganti dengan ID tipe kursus yang benar
    formDataToSend.append("courseLevelId", formData.levelName); // Ganti dengan ID level kursus yang benar
    formDataToSend.append("coursePrice", Number(formData.coursePrice)); // Kirim sebagai angka
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("publish", formData.publish === "Published"); // Konversi ke boolean
    formDataToSend.append("intendedFor", formData.intendedFor);
    formDataToSend.append("aboutCourse", formData.aboutCourse);
    formDataToSend.append("courseDiscountPercent", Number(formData.courseDiscountPercent)); // Kirim sebagai angka
    formDataToSend.append("totalDuration", Number(formData.totalDuration)); // Kirim sebagai angka
    formDataToSend.append("certificateStatus", formData.certificateStatus === "true"); // Pastikan ini sesuai format

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      await dispatch(addDataKelas(formDataToSend));
      onClose();
    } catch (error) {
      console.error("Error adding data kelas:", error);
      // Tampilkan notifikasi kesalahan jika diperlukan
    }
  };

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
          {/* <div className="mb-4">
              <label className="block mb-1 font-semibold">Upload File</label>
              <input type="file" className="w-full p-2 border rounded-xl" />
            </div> */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload File</label>

            {imagePreview && (
              <img src={imagePreview} alt="kelas privew" className="w-full p-2 border rounded-xl" />
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
            <div className="relative">
              <select
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl max-w-full overflow-y-auto"
                style={{ maxHeight: "200px" }} // Atur tinggi maksimum
              >
                <option value="" disabled hidden>
                  Pilih
                </option>
                {category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
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
              value={formData.courseName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <select
              name="typeName"
              value={formData.typeName}
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
              name="levelName"
              value={formData.levelName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="" disabled hidden>
                Pilih
              </option>
              {levelCourses.map((levelCourses) => (
                <option key={levelCourses.id} value={levelCourses.id}>
                  {levelCourses.levelName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Harga Kelas</label>
            <input
              type="number"
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Rp"
            />
          </div>

          {/* <div className="mb-4">
            <label className="block mb-1 font-semibold">Course</label>
            <input
              type="number"
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Rp"
            />
          </div> */}

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount Kelas</label>
            <input
              type="number"
              name="courseDiscountPercent"
              value={formData.courseDiscountPercent}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              // placeholder="0-100"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Total Durasi Kelas</label>
            <input
              type="number"
              name="totalDuration"
              value={formData.totalDuration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              // placeholder="0-100"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Pengajar Kelas</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="input Nama Pengajar"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Published</label>
            <select
              name="publish"
              value={formData.publish}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="" disabled hidden>
                Pilih
              </option>
              <option value={true}>Published</option>
              <option value={false}>Archived</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Certificate</label>
            <select
              name="certificateStatus"
              value={formData.certificateStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="" disabled hidden>
                Pilih
              </option>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Ditujukan Untuk</label>
            <textarea
              name="intendedFor"
              value={formData.intendedFor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan peserta yang dituju"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Deskripsi</label>
            <textarea
              name="aboutCourse"
              value={formData.aboutCourse}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan deskripsi kelas"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl">
              Tambah
            </button>
          </div>
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
