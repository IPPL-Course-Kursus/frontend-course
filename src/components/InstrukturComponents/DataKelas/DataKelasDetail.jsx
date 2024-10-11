import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const DataKelasDetail = ({ show, onClose, existingData }) => {
  const [formData, setFormData] = useState({
    kategori: "",
    judulKelas: "",
    tipeKelas: "",
    level: "",
    harga: "",
    pengajar: "",
    ditujukanUntuk: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        kategori: existingData.kategori || "Tidak ada data",
        judulKelas: existingData.namaKelas || "Tidak ada data",
        tipeKelas: existingData.tipeKelas || "Tidak ada data",
        level: existingData.level || "Tidak ada data",
        harga: existingData.harga || "Tidak ada data",
        pengajar: existingData.pengajar || "Tidak ada data",
        ditujukanUntuk: existingData.ditujukanUntuk || "Tidak ada data",
        deskripsi: existingData.deskripsi || "Tidak ada data",
      });
    }
  }, [existingData]);

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
        <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Detail Kelas</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Kategori</label>
          <p className="p-2 border rounded-xl">{formData.kategori}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Judul Kelas</label>
          <p className="p-2 border rounded-xl">{formData.judulKelas}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Tipe Kelas</label>
          <p className="p-2 border rounded-xl">{formData.tipeKelas}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Level Kelas</label>
          <p className="p-2 border rounded-xl">{formData.level}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Harga Kelas</label>
          <p className="p-2 border rounded-xl">Rp {formData.harga}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Pengajar</label>
          <p className="p-2 border rounded-xl">{formData.pengajar}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Ditujukan Untuk</label>
          <p className="p-2 border rounded-xl">{formData.ditujukanUntuk}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Deskripsi</label>
          <p className="p-2 border rounded-xl">{formData.deskripsi}</p>
        </div>

        <div className="flex justify-center">
          <button className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

DataKelasDetail.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  existingData: PropTypes.object,
};

export default DataKelasDetail;
