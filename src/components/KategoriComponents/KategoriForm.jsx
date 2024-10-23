// // File: ../../components/KategoriComponents/KategoriForm.jsx

// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";

// const KategoriForm = ({ show, onClose, existingData, isEditMode }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     photo: "",
//     pengajar: "",
//     published: false,
//   });
//   const [filePreview, setFilePreview] = useState(null);

//   useEffect(() => {
//     if (existingData) {
//       setFormData({
//         name: existingData.name,
//         photo: existingData.photo,
//         pengajar: existingData.pengajar,
//         published: existingData.published,
//       });
//       setFilePreview(existingData.photo);
//     }
//   }, [existingData]);

//   if (!show) return null;

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFilePreview(reader.result);
//         setFormData((prev) => ({
//           ...prev,
//           photo: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditMode) {
//       console.log("Update Kategori:", formData);
//     } else {
//       console.log("Tambah Kategori:", formData);
//     }
//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-50"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-2 right-2 text-xl font-bold"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//         <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">
//           {isEditMode ? "Ubah Kategori" : "Tambah Kategori"}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Nama Kategori</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan nama kategori"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Upload Gambar</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="w-full p-2 border rounded-xl"
//             />
//           </div>

//           {/* Preview gambar */}
//           {filePreview && (
//             <div className="mb-4">
//               <img
//                 src={filePreview}
//                 alt="Preview"
//                 className="w-full h-24 object-contain rounded-md"
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Pengajar</label>
//             <select
//               name="pengajar"
//               value={formData.pengajar}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//             >
//               <option value="">Pilih Pengajar</option>
//               <option value="John Doe">John Doe</option>
//               <option value="Jane Smith">Jane Smith</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 name="published"
//                 checked={formData.published}
//                 onChange={handleInputChange}
//                 className="form-checkbox"
//               />
//               <span className="ml-2">Published</span>
//             </label>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl"
//             >
//               {isEditMode ? "Update" : "Tambah"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// KategoriForm.propTypes = {
//   show: PropTypes.bool,
//   onClose: PropTypes.func,
//   existingData: PropTypes.object,
//   isEditMode: PropTypes.bool,
// };

// export default KategoriForm;

// File: ../../components/KategoriComponents/KategoriForm.jsx

// 

// File: ../../components/KategoriComponents/KategoriForm.jsx

import PropTypes from "prop-types";
// import { useState, useEffect } from "react";

const KategoriForm = ({
  show,
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
  isEditMode,
  imagePreview,
  handleImageUpload,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl shadow-lg relative w-80">
        <h2 className="text-xl font-bold text-center mb-4">
          {isEditMode ? "Ubah Kategori" : "Tambah Kategori"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nama Kategori
            </label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Foto Kategori
            </label>

            {/* Display Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
            />
          </div>

          {/* Published Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Published
            </label>
          </div>

          {/* Buttons */}
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
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
            >
              {isEditMode ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

KategoriForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  imagePreview: PropTypes.string,
  handleImageUpload: PropTypes.func.isRequired,
};

export default KategoriForm;