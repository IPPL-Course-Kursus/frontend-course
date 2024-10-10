import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function DataKontenDetail({ show, onClose, existingData }) {
  const [formData, setFormData] = useState({
    Judulmateri: "",
    videoURL: "",
    durasi: "",
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
       Judulmateri: existingData.Judulmateri || "Tidak Ada Data",
        videoURL: existingData.video || "Tidak Ada Data", // Mengubah sesuai dengan data yang diberikan
        durasi: existingData.durasi || "Tidak Ada Data",
      });
    }
  }, [existingData]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="bg-white w-full max-w-lg max-h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Data Konten</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Judul Materi</label>
          <p className="p-2 border rounded-xl">{formData.Judulmateri}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Video URL</label>
          <p className="p-2 border rounded-xl">{formData.videoURL}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Durasi</label>
          <p className="p-2 border rounded-xl">{formData.durasi}</p>
        </div>

        <div className="flex justify-center">
          <button className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

DataKontenDetail.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
};

export default DataKontenDetail;
