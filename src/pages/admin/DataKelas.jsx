import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

const AdminDataKelas = () => {

    const [courseTypeSearch, setCourseTypeSearch] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    // filter
    const [filter, setFilter] = useState("");
            
    // state tipe kursus
    const [courseType] = useState([
        {
        id: "johndoe123",
        kategori: "UI/UX Design",
        namaKelas: "Belajar Web Designer dengan Figma",
        tipeKelas: "Free",
        level: "Intermediate",
        harga: 0,
        },
        {
        id: "supermanxx",
        kategori: "UI/UX Design",
        namaKelas: "Belajar Web Designer dengan Figma",
        tipeKelas: "Premium",
        level: "Beginner",
        harga: 190000,
        },
        {
        id: "lokiMaster",
        kategori: "Data Science",
        namaKelas: "Data Cleaning untuk pemula",
        tipeKelas: "Free",
        level: "Advance",
        harga: 0,
        },
        {
        id: "siapaAjaani",
        kategori: "Data Science",
        namaKelas: "Data Cleaning untuk pemula",
        tipeKelas: "Premium",
        level: "Intermediate",
        harga: 190000,
        },
    ]);

    // filter berdasarkan search input dan filter tipe kelas
    const filteredCourseType = courseType.filter(
    (courseType) =>
      courseType.id.toLowerCase().includes(courseTypeSearch.toLowerCase()) &&
      (filter === "" || courseType.tipeKelas === filter)
    );

    // fungsi untuk menangani perubahan filter tipe kelas
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <>
        <div className="p-6 bg-secondary min-h-screen font-poppins">

            {/* Header - Hi Admin */}
            <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
            <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
            </div>

            {/* Section untuk Data Kelas */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#0a61aa]">Data Kelas</h2>

                <div className="flex items-center space-x-2">
                    {/* tambah kelas */}
                    <div className="relative">
                        <button className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center">
                            <IoAddCircleOutline className="mr-2" />
                            Tambah
                        </button>
                    </div>

                    {/* filter */}
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="p-1 border border-[#0a61aa] rounded-full text-sm text-[#0a61aa]"
                        >
                            <option value="">Filter</option>
                            <option value="Free">Free</option>
                            <option value="Premium">Premium</option>
                        </select>
                        <FaFilter className="absolute right-4 top-2 text-[#0a61aa] text-sm" />
                    </div>

                   {/* pencarian */}
                    <div className="relative w-full md:w-auto flex items-center">
                        <FaSearch
                            className="text-[#173D94] text-lg cursor-pointer"
                            onClick={toggleSearch} // Event handler untuk toggle search visibility
                        />
                        <input
                            type="text"
                            value={courseTypeSearch}
                            onChange={(e) => setCourseTypeSearch(e.target.value)}
                            className={`transition-all duration-300 ease-in-out border border-[#173D94] rounded-full ml-2 p-1 ${
                                searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 pointer-events-none"
                            }`}
                            placeholder="Cari Id..."
                        />
                    </div>
                </div>
            </div>
                
            {/* Tabel */}
            <div className="overflow-x-auto bg-white p-4">
                <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Kategori</th>
                    <th className="px-4 py-2">Nama Kelas</th>
                    <th className="px-4 py-2">Tipe Kelas</th>
                    <th className="px-4 py-2">Level</th>
                    <th className="px-4 py-2">Harga</th>
                    <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourseType.map((courseType, index) => (
                    <tr key={index} className="border-t">
                        <td className="px-4 py-2">{courseType.id}</td>
                        <td className="px-4 py-2">{courseType.kategori}</td>
                        <td className="px-4 py-2">{courseType.namaKelas}</td>
                        <td
                        className={`px-4 py-2 font-bold ${
                            courseType.tipeKelas === "Free" ? "text-success" : "text-failed"
                        }`}
                        >
                        {courseType.tipeKelas}
                        </td>
                        <td className="px-4 py-2">{courseType.level}</td>
                        <td className="px-4 py-2">{courseType.harga}</td>
                        <td className="px-4 py-2 flex space-x-2">
                            <button className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105">Kelola</button>
                            <button className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105">Ubah</button>
                            <button className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105">Detail</button>
                            <button className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105">Promo</button>
                            
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default AdminDataKelas