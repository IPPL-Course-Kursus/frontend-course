// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCategory } from "../../../redux/actions/categoryActions";
// import { getAllTypeCourses } from "../../../redux/actions/typeCourseActions";
// import { getAllLevelCourses } from "../../../redux/actions/levelCourseActions";
// import { addDataKelas } from "../../../redux/actions/instruktorActions";
// // import toast from "react-hot-toast";

// const DataKelasInput = ({ show, onClose }) => {
//   const [formData, setFormData] = useState({
//     categoryName: "",
//     courseName: "",
//     typeName: "",
//     levelName: "",
//     coursePrice: "",
//     courseDiscountPercent: "",
//     totalDuration: "",
//     fullName: "",
//     publish: "",
//     certificateStatus: "",
//     intendedFor: "",
//     aboutCourse: "",
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   const dispatch = useDispatch();
//   const { category } = useSelector((state) => state.category);
//   const { typeCourses } = useSelector((state) => state.typeCourse);
//   const { levelCourses } = useSelector((state) => state.levelCourse);

//   useEffect(() => {
//     dispatch(getCategory());
//     dispatch(getAllTypeCourses());
//     dispatch(getAllLevelCourses());
//   }, [dispatch]);

//   if (!show) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);

//       const reader = new FileReader();

//       reader.onload = () => {
//         setImagePreview(reader.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("add data kelas:", formData);

//     const formDataToSend = new FormData();

//     // Pastikan ID yang benar
//     formDataToSend.append("categoryId", formData.categoryName);
//     formDataToSend.append("courseName", formData.courseName);
//     formDataToSend.append("typeCourseId", formData.typeName);
//     formDataToSend.append("courseLevelId", formData.levelName);
//     formDataToSend.append("coursePrice", Number(formData.coursePrice));
//     formDataToSend.append("fullName", formData.fullName);
//     formDataToSend.append("publish", formData.publish === "Published");
//     formDataToSend.append("intendedFor", formData.intendedFor);
//     formDataToSend.append("aboutCourse", formData.aboutCourse);
//     formDataToSend.append("courseDiscountPercent", Number(formData.courseDiscountPercent));
//     formDataToSend.append("totalDuration", Number(formData.totalDuration));
//     formDataToSend.append("certificateStatus", formData.certificateStatus === "true");

//     if (imageFile) {
//       formDataToSend.append("image", imageFile);
//     }

//     // Debugging: log the FormData
//     console.log("FormData to send:", Array.from(formDataToSend.entries()));

//     try {
//       await dispatch(addDataKelas(formDataToSend));
//       onClose();
//     } catch (error) {
//       console.error("Error adding data kelas:", error);
//       // Optionally show error message to user
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-50"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
//     >
//       <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
//         <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
//           &times;
//         </button>
//         <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kelas</h2>

//         <form onSubmit={handleSubmit}>
//           {/* <div className="mb-4">
//               <label className="block mb-1 font-semibold">Upload File</label>
//               <input type="file" className="w-full p-2 border rounded-xl" />
//             </div> */}
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Upload File</label>

//             {imagePreview && (
//               <img src={imagePreview} alt="kelas privew" className="w-full p-2 border rounded-xl" />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               name="image"
//               onChange={handleImageUpload}
//               className="w-full p-2 border rounded-xl"
//             />
//             <small className="text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</small>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Kategori</label>
//             <div className="relative">
//               <select
//                 name="categoryName"
//                 value={formData.categoryName}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-xl max-w-full overflow-y-auto"
//                 style={{ maxHeight: "200px" }} // Atur tinggi maksimum
//               >
//                 <option value="" disabled hidden>
//                   Pilih
//                 </option>
//                 {category.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.categoryName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Judul Kelas</label>
//             <input
//               type="text"
//               name="courseName"
//               value={formData.courseName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan judul kelas"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Tipe Kelas</label>
//             <select
//               name="typeName"
//               value={formData.typeName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             >
//               <option value="" disabled hidden>
//                 Pilih
//               </option>
//               {typeCourses.map((typeCourse) => (
//                 <option key={typeCourse.id} value={typeCourse.id}>
//                   {typeCourse.typeName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Level Kelas</label>
//             <select
//               name="levelName"
//               value={formData.levelName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             >
//               <option value="" disabled hidden>
//                 Pilih
//               </option>
//               {levelCourses.map((levelCourses) => (
//                 <option key={levelCourses.id} value={levelCourses.id}>
//                   {levelCourses.levelName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Harga Kelas</label>
//             <input
//               type="number"
//               name="coursePrice"
//               value={formData.coursePrice}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Rp"
//             />
//           </div>

//           {/* <div className="mb-4">
//             <label className="block mb-1 font-semibold">Course</label>
//             <input
//               type="number"
//               name="coursePrice"
//               value={formData.coursePrice}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Rp"
//             />
//           </div> */}

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Discount Kelas</label>
//             <input
//               type="number"
//               name="courseDiscountPercent"
//               value={formData.courseDiscountPercent}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               // placeholder="0-100"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Total Durasi Kelas</label>
//             <input
//               type="number"
//               name="totalDuration"
//               value={formData.totalDuration}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               // placeholder="0-100"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Pengajar Kelas</label>
//             <input
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="input Nama Pengajar"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Published</label>
//             <select
//               name="publish"
//               value={formData.publish}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             >
//               <option value="" disabled hidden>
//                 Pilih
//               </option>
//               <option value={true}>Published</option>
//               <option value={false}>Archived</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Certificate</label>
//             <select
//               name="certificateStatus"
//               value={formData.certificateStatus}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             >
//               <option value="" disabled hidden>
//                 Pilih
//               </option>
//               <option value={true}>true</option>
//               <option value={false}>false</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Ditujukan Untuk</label>
//             <textarea
//               name="intendedFor"
//               value={formData.intendedFor}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan peserta yang dituju"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Deskripsi</label>
//             <textarea
//               name="aboutCourse"
//               value={formData.aboutCourse}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan deskripsi kelas"
//             />
//           </div>

//           <div className="flex justify-center">
//             <button type="submit" className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl">
//               Tambah
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// DataKelasInput.propTypes = {
//   show: PropTypes.bool,
//   onClose: PropTypes.func,
// };

// export default DataKelasInput;

// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useDispatch } from "react-redux";

// import { addDataKelas } from "../../../redux/actions/instruktorActions";
// // import toast from "react-hot-toast";

// const DataKelasInput = ({ show, onClose }) => {
//   const [formData, setFormData] = useState({
//     categoryId: "",
//     courseLevelId: "",
//     typeCourseId: "",
//     courseName: "",
//     image: "",
//     aboutCourse: "",
//     intendedFor: "",
//     coursePrice: "",
//     courseDiscountPercent: "",
//     certificateStatus: "",
//     publish: "",
//     totalDuration: "",
//   });
//   const dispatch = useDispatch();
//   const [imagePreview, setImagePreview] = useState(null);

//   if (!show) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file }); // Simpan file gambar di state

//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validasi form data
//     const requiredFields = [
//       "categoryId",
//       "courseLevelId",
//       "typeCourseId",
//       "courseName",
//       "image",
//       "aboutCourse",
//       "intendedFor",
//       "coursePrice",
//       "publish",
//       "courseDiscountPercent",
//       "certificateStatus",
//       "totalDuration",
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         alert(`Field ${field} harus diisi.`);
//         return; // Keluar dari fungsi jika ada field yang kosong
//       }
//     }

//     // Proses pengiriman data
//     const dataToSend = {
//       categoryId: Number(formData.categoryId), // Pastikan ini adalah angka
//       courseName: formData.courseName,
//       typeCourseId: Number(formData.typeCourseId), // Pastikan ini adalah angka
//       courseLevelId: Number(formData.courseLevelId), // Pastikan ini adalah angka
//       coursePrice: parseFloat(formData.coursePrice), // Pastikan ini adalah angka
//       publish: formData.publish === "Published", // Mengubah ke boolean
//       intendedFor: formData.intendedFor,
//       aboutCourse: formData.aboutCourse,
//       courseDiscountPercent: parseFloat(formData.courseDiscountPercent), // Pastikan ini adalah angka
//       totalDuration: parseFloat(formData.totalDuration), // Pastikan ini adalah angka
//       certificateStatus: formData.certificateStatus === "true", // Mengubah ke boolean
//     };

//     // Buat objek FormData untuk mengirim gambar
//     const formDataToSend = new FormData();
//     formDataToSend.append("data", JSON.stringify(dataToSend)); // Menyertakan data sebagai JSON
//     if (formData.image) {
//       formDataToSend.append("image", formData.image); // Menyertakan file gambar
//     }

//     // Logging data untuk memeriksa isi sebelum pengiriman
//     console.log("Data to send:", JSON.stringify(dataToSend, null, 2));

//     try {
//       dispatch(addDataKelas(formDataToSend));
//       onClose();
//     } catch (error) {
//       console.error("Error adding data kelas:", error);
//       // Optionally show error message to user
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   console.log("add data kelas:", formData);

//   //   const dataToSend = {
//   //     categoryId: Number(formData.categoryId), // Pastikan ini adalah angka
//   //     courseName: formData.courseName,
//   //     typeCourseId: Number(formData.typeCourseId), // Pastikan ini adalah angka
//   //     courseLevelId: Number(formData.courseLevelId), // Pastikan ini adalah angka
//   //     coursePrice: parseFloat(formData.coursePrice), // Pastikan ini adalah angka
//   //     publish: formData.publish === "Published",
//   //     intendedFor: formData.intendedFor,
//   //     aboutCourse: formData.aboutCourse,
//   //     courseDiscountPercent: parseFloat(formData.courseDiscountPercent), // Pastikan ini adalah angka
//   //     totalDuration: parseFloat(formData.totalDuration), // Pastikan ini adalah angka
//   //     certificateStatus: formData.certificateStatus === "true",
//   //   };

//   //   // Buat objek FormData untuk mengirim gambar
//   //   const formDataToSend = new FormData();
//   //   formDataToSend.append("data", JSON.stringify(dataToSend)); // Menyertakan data sebagai JSON
//   //   if (formData.image) {
//   //     formDataToSend.append("image", formData.image); // Menyertakan file gambar
//   //   }

//   //   console.log("Data to send:", dataToSend);

//   //   try {
//   //     await dispatch(addDataKelas(formDataToSend));
//   //     onClose();
//   //   } catch (error) {
//   //     console.error("Error adding data kelas:", error);
//   //     // Optionally show error message to user
//   //   }
//   // };

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-50"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
//     >
//       <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
//         <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
//           &times;
//         </button>
//         <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kelas</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Upload File</label>

//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="kelas preview"
//                 className="w-full p-2 border rounded-xl"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               name="image"
//               onChange={handleImageUpload}
//               className="w-full p-2 border rounded-xl"
//             />
//             <small className="text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px).</small>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Kategori</label>
//             <div className="relative">
//               <input
//                 type="number"
//                 name="categoryId" // Update here
//                 value={formData.categoryId}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-xl"
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Judul Kelas</label>
//             <input
//               type="text"
//               name="courseName"
//               value={formData.courseName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan judul kelas"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Tipe Kelas</label>
//             <input
//               type="number"
//               name="typeCourseId" // Update here
//               value={formData.typeCourseId}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Level Kelas</label>
//             <input
//               type="number"
//               name="courseLevelId" // Update here
//               value={formData.courseLevelId}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Harga Kelas</label>
//             <input
//               type="number"
//               name="coursePrice"
//               value={formData.coursePrice}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Rp"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Discount Kelas</label>
//             <input
//               type="number"
//               name="courseDiscountPercent"
//               value={formData.courseDiscountPercent}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Total Durasi Kelas</label>
//             <input
//               type="number"
//               name="totalDuration"
//               value={formData.totalDuration}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Published</label>
//             <select
//               name="publish"
//               value={formData.publish}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             >
//               <option value="" disabled hidden>
//                 Pilih
//               </option>
//               <option value="Published">Published</option>
//               <option value="Archived">Archived</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Certificate</label>
//             <select
//               name="certificateStatus"
//               value={formData.certificateStatus}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             >
//               <option value="" disabled hidden>
//                 Pilih
//               </option>
//               <option value="true">true</option>
//               <option value="false">false</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Deskripsi Kelas</label>
//             <textarea
//               type="text"
//               name="aboutCourse"
//               value={formData.aboutCourse}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Deskripsi Kelas"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Ditujukan Untuk</label>
//             <textarea
//               type="text"
//               name="intendedFor"
//               value={formData.intendedFor}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Ditujukan Untuk"
//             />
//           </div>

//           <div className="flex justify-end">
//             <button type="submit" className="bg-[#0a61aa] text-white px-4 py-2 rounded-xl">
//               Tambah
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// DataKelasInput.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default DataKelasInput;\

import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { addDataKelas } from "../../../redux/actions/instruktorActions";

const DataKelasInput = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    categoryId: "",
    courseLevelId: "",
    typeCourseId: "",
    courseName: "",
    image: null,
    aboutCourse: "",
    intendedFor: "",
    coursePrice: "",
    courseDiscountPercent: "",
    certificateStatus: "",
    publish: "",
    totalDuration: "",
  });
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file); // Tambahkan log ini untuk cek file
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      categoryId,
      courseLevelId,
      typeCourseId,
      courseName,
      aboutCourse,
      intendedFor,
      coursePrice,
      courseDiscountPercent,
      totalDuration,
      publish,
      certificateStatus,
      image,
    } = formData;

    // Debugging: Log data yang akan dikirim
    console.log({
      categoryId,
      courseLevelId,
      typeCourseId,
      courseName,
      aboutCourse,
      intendedFor,
      coursePrice,
      totalDuration,
      publish,
      certificateStatus,
    });

    const requiredFields = [
      categoryId,
      courseLevelId,
      typeCourseId,
      courseName, 
      aboutCourse,
      intendedFor,
      coursePrice,
      publish,
      certificateStatus,
      totalDuration,
    ];

    if (requiredFields.some((field) => !field)) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const dataToSend = {
      categoryId: Number(categoryId) || 0,
      courseName,
      typeCourseId: Number(typeCourseId) || 0,
      courseLevelId: Number(courseLevelId) || 0,
      coursePrice: parseFloat(coursePrice) || 0,
      publish,
      intendedFor,
      aboutCourse,
      courseDiscountPercent: parseFloat(courseDiscountPercent) || 0,
      totalDuration: parseFloat(totalDuration) || 0,
      certificateStatus,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(dataToSend));

    if (image) {
      formDataToSend.append("image", image);
    }

    // Debugging: Log data yang dikirim ke backend
    console.log("Data yang dikirim:", dataToSend);

    dispatch(addDataKelas(formDataToSend))
      .then(() => {
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data?.message || "Error adding course");
        console.error("Error detail:", error);
      });
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
        {/* Display loading indicator */}
        {loading && <div className="mb-4 text-center text-blue-600">Loading...</div>}

        {/* Display error message */}
        {error && <div className="mb-4 text-center text-red-600">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload File</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="kelas preview"
                className="w-full p-2 border rounded-xl"
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
            <div className="relative">
              <input
                type="number"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl"
              />
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
            <input
              type="number"
              name="typeCourseId"
              value={formData.typeCourseId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level Kelas</label>
            <input
              type="number"
              name="courseLevelId"
              value={formData.courseLevelId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
            />
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

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Discount Kelas</label>
            <input
              type="number"
              name="courseDiscountPercent"
              value={formData.courseDiscountPercent}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
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
              <option value="Published"> Published</option>
              <option value="Archived"> Archived</option>
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
              <option value="true">Available</option>
              <option value="false">Not Available</option>
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
              placeholder="Siapa yang boleh mengikuti kelas ini?"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">About Course</label>
            <textarea
              name="aboutCourse"
              value={formData.aboutCourse}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              placeholder="Deskripsi tentang kelas ini"
            ></textarea>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Simpan
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
