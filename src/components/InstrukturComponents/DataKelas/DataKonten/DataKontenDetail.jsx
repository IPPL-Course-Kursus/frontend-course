import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataKonten } from "../../../../redux/actions/instruktorActions";

function DataKontenDetail({ show, onClose, contentId }) {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.content); // Pastikan state ini sesuai dengan state Redux yang mengelola konten

  const [formData, setFormData] = useState({
    sort: "",

    contentTitle: "",
    contentUrl: "",
    duration: "",
  });

  useEffect(() => {
    if (show && contentId) {
      dispatch(getDataKonten(contentId)); // Memanggil data API berdasarkan contentId
      console.log(contentId);
    }
  }, [show, contentId, dispatch]);

  useEffect(() => {
    if (content) {
      setFormData({
        sort: content.sort || "Tidak Ada Data",
        contentTitle: content.contentTitle || "Tidak Ada Data",
        contentUrl: content.contentUrl || "Tidak Ada Data",
        duration: content.duration || "Tidak Ada Data",
      });
    }
  }, [content]);

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
          <p className="p-2 border rounded-xl">{formData.contentTitle}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Judul Materi</label>
          <p className="p-2 border rounded-xl">{formData.contentTitle}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Video URL</label>
          <p className="p-2 border rounded-xl">{formData.contentUrl}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Durasi</label>
          <p className="p-2 border rounded-xl">{formData.duration}</p>
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
  contentId: PropTypes.number,
};

export default DataKontenDetail;
