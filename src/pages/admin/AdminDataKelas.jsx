import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import DataKelasInput from "../../components/admin/DataKelasInput";
import DataKelasUbah from "../../components/admin/DataKelasUbah";
import DataKelasDetail from "../../components/admin/DataKelasDetail";
import SideBar from "../../components/Sidebar/SidebarAdmin";

const AdminDataKelas = () => {
    const [courseTypeSearch, setCourseTypeSearch] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);
    const [showTambahPopup, setShowTambahPopup] = useState(false);
    const [showUbahPopup, setShowUbahPopup] = useState(false);
    const [showDetailPopup, setShowDetailPopup] = useState(false); // State untuk modal detail
    const [selectedCourse, setSelectedCourse] = useState(null);    
    
    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const handleAddClick = () => {
        setSelectedCourse(null);
        setShowTambahPopup(true);
    };

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setShowUbahPopup(true);
    };

    const handleDetailClick = (course) => {
        setSelectedCourse(course);
        setShowDetailPopup(true);
    };
    // Filter
    const [filter, setFilter] = useState("");
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

    const filteredCourseType = courseType.filter(
        (courseType) =>
            courseType.id.toLowerCase().includes(courseTypeSearch.toLowerCase()) &&
            (filter === "" || courseType.tipeKelas === filter)
    );

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <div className="flex">
                <SideBar />
            <div className="p-6 bg-secondary min-h-screen font-poppins">
                {/* Header */}
                <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
                    <h1 className="text-2xl font-bold text-[#0a61aa]">Hi, Admin!</h1>
                </div>

                {/* Section Data Kelas */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#0a61aa]">Data Kelas</h2>

                    <div className="flex items-center space-x-2">
                        {/* Tombol tambah kelas */}
                        <div className="relative">
                            <button
                                className="py-1 px-4 bg-[#0a61aa] text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105 flex items-center"
                                onClick={handleAddClick}
                            >
                                <IoAddCircleOutline className="mr-2" />
                                Tambah
                            </button>
                        </div>

                        {/* Dropdown filter */}
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

                        {/* Pencarian */}
                        <div className="relative w-full md:w-auto flex items-center">
                            <FaSearch
                                className="text-[#173D94] text-lg cursor-pointer"
                                onClick={toggleSearch}
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

                {/* Tabel Data Kelas */}
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
                                        {/* Tombol ubah */}
                                        <button className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105">Kelola</button>
                                        <button
                                            className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105"
                                            onClick={() => handleEditClick(courseType)}
                                        >
                                            Ubah
                                        </button>
                                        <button
                                            className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105"
                                            onClick={() => handleDetailClick(courseType)}
                                        >
                                            Detail
                                        </button>
                                        <button className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md text-xs transition-all duration-300 hover:scale-105">Promo</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pop-up untuk tambah kelas */}
                <DataKelasInput
                    show={showTambahPopup}
                    onClose={() => setShowTambahPopup(false)}
                />

                {/* Pop-up untuk ubah kelas */}
                <DataKelasUbah
                    show={showUbahPopup}
                    onClose={() => setShowUbahPopup(false)}
                    existingData={selectedCourse}
                />

                {/* Pop-up untuk detail kelas */}
                <DataKelasDetail show={showDetailPopup} onClose={() => setShowDetailPopup(false)} courseDetail={selectedCourse} />
            </div>
            </div>
        </>
    );
};


export default AdminDataKelas;
