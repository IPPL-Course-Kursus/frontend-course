import PropTypes from "prop-types";

const DataKelasInput = ({ show, onClose }) => {
  if (!show) return null; // Jika `show` false, jangan render apapun (sembunyikan pop-up)

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

        {/* input */}
        <form>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Upload File</label>
            <input type="file" className="w-full p-2 border rounded-xl" />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kategori</label>
            <select className="w-full p-2 border rounded-xl">
              <option>Pilih</option>
              <option>UI/UX Design</option>
              <option>Data Science</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Judul Kelas</label>
            <input
              type="text"
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan judul kelas"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Tipe Kelas</label>
            <select className="w-full p-2 border rounded-xl">
              <option>Pilih</option>
              <option>Free</option>
              <option>Premium</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Level Kelas</label>
            <select className="w-full p-2 border rounded-xl">
              <option>Pilih</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advance</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Harga Kelas</label>
            <input
              type="integer"
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan harga kelas"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Pengajar</label>
            <select className="w-full p-2 border rounded-xl">
              <option>Pilih</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Ditujukan Untuk</label>
            <textarea
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan peserta yang dituju"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Deskripsi</label>
            <textarea
              className="w-full p-2 border rounded-xl"
              placeholder="Masukkan deskripsi kelas"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl">
              Simpan
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
