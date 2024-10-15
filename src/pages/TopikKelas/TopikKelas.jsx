import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Shield, Book, Clock } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const TopikKelas = () => {
  const [isMobileDropdownVisible, setMobileDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // State for checkbox filters
  const [filterChecked, setFilterChecked] = useState({
    "Paling Baru": false,
    "Paling Populer": false,
    Promo: false,
    "UI/UX Design": false,
    "Web Development": false,
    "Android Development": false,
    "Data Science": false,
    "Business Intelligence": false,
    "Beginner Level": false,
    "Intermediate Level": false,
    "Advanced Level": false,
  });

  const handleCheckboxChange = (label) => {
    setFilterChecked((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const clearFilters = () => {
    setFilterChecked({
      "Paling Baru": false,
      "Paling Populer": false,
      Promo: false,
      "UI/UX Design": false,
      "Web Development": false,
      "Android Development": false,
      "Data Science": false,
      "Business Intelligence": false,
      "Beginner Level": false,
      "Intermediate Level": false,
      "Advanced Level": false,
    });
    setSelectedFilter("All"); // Reset selected filter
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownVisible(!isMobileDropdownVisible);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter); // Set the selected filter
  };

  // Updated course data array with additional fields
  const courses = [
    {
      id: 1,
      name: "JavaScript Intermediate",
      overview: "Learn intermediate JavaScript concepts",
      instruktur: "John Doe",
      price: "Rp 100.000,00",
      modules: 10,
      level: "Intermediate Level",
      duration: "120 Menit",
      progress: "50%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "React for Beginners",
      overview: "Get started with React.js",
      instruktur: "Jane Smith",
      price: "Rp 100.000,00",
      modules: 8,
      level: "Beginner Level",
      duration: "90 Menit",
      progress: "100%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Data Science Essentials",
      overview: "Fundamentals of Data Science",
      instruktur: "Emily Johnson",
      price: "Rp 200.000,00",
      modules: 12,
      level: "Advanced Level",
      duration: "150 Menit",
      progress: "70%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Windows Basics",
      overview: "Introduction to Windows OS",
      instruktur: "Michael Brown",
      price: "Gratis",
      modules: 15,
      level: "Intermediate Level",
      duration: "200 Menit",
      progress: "0%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Linux Fundamentals",
      overview: "Learn the basics of Linux",
      instruktur: "Sarah Wilson",
      price: "Gratis",
      modules: 15,
      level: "Intermediate Level",
      duration: "200 Menit",
      progress: "0%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      rating: 4.6,
    },
  ];

  const filteredCourses = () => {
    // Apply filter logic based on selected filter and checked checkboxes
    const activeFilters = Object.keys(filterChecked).filter((key) => filterChecked[key]);

    return courses.filter((course) => {
      // Check if course matches selected filter
      if (selectedFilter === "kelas_berbayar" && course.price === "Gratis") return false;
      if (selectedFilter === "Kelas_Gratis" && course.price !== "Gratis") return false;

      // Check if course matches any active checkbox filters
      if (activeFilters.length > 0) {
        return activeFilters.some(
          (filter) =>
            course.level === filter ||
            course.name.includes(filter) ||
            course.overview.includes(filter)
        );
      }
      return true; // Show all courses if no filters are active
    });
  };

  return (
    <>
    <Navbar/>
    <main className="w-full bg-blue-50 pb-4">
      {/* Header Section */}
      <section className="w-full text-center bg-white py-12 mt-4">
          <div className="max-w-screen-lg mx-auto">
            <h1
              className="text-[25px] font-semibold"
              style={{ fontFamily: "Poppins, sans-serif", color: "#000000" }}
            >
              Katalog Kelas
            </h1>
            <h1
              className="text-[25px] font-semibold"
              style={{ fontFamily: "Poppins, sans-serif", color: "#000000" }}
            >
              Kelas di Etam Code berbasis Industri
            </h1>
            <p className="text-gray-600 font-montserrat max-w-2xl mx-auto">
              Etam Code menyediakan berbagai macam kelas yang sudah berbasis industri untuk
              meningkatkan keterampilan digital kamu.
            </p>
          </div>
        </section>

      <div className="container mx-auto px-4">
        {/* Filter and Topik Kelas Section */}
        <div className="py-8 px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h3
              className="self-center text-[32px] font-bold"
              style={{ fontFamily: "'Red Rose', sans-serif", color: "#000000" }}
            >
              TOPIK KELAS
            </h3>
            <div className="flex flex-wrap justify-center mt-4 md:mt-0 space-x-2">
              <button
                className={`filter-btn px-6 py-2 w-full md:w-auto rounded-full font-bold text-xs ${
                  selectedFilter === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
                onClick={() => handleFilterClick("All")}
              >
                All
              </button>
              <button
                className={`filter-btn px-6 py-2 w-full md:w-auto rounded-full font-bold text-xs ${
                  selectedFilter === "kelas_berbayar"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
                onClick={() => handleFilterClick("kelas_berbayar")}
              >
                Kelas Berbayar
              </button>
              <button
                className={`filter-btn px-6 py-2 w-full md:w-auto rounded-full font-bold text-xs ${
                  selectedFilter === "Kelas_Gratis"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
                onClick={() => handleFilterClick("Kelas_Gratis")}
              >
                Kelas Gratis
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row md:space-x-6 pr-4 md:pr-10">
          <div className="hidden md:block md:w-1/4">
            <div className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Filter</h3>
              {["Paling Baru", "Paling Populer", "Promo"].map((label, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <input
                    type="checkbox"
                    id={`filter-${label}`}
                    checked={filterChecked[label]}
                    onChange={() => handleCheckboxChange(label)}
                    className="mr-2 checkbox-custom"
                  />
                  <label htmlFor={`filter-${label}`} className="text-sm md:text-base">
                    {label}
                  </label>
                </div>
              ))}

              <h3 className="text-xl font-bold text-gray-800 mb-4">Kategori</h3>
              {[
                "UI/UX Design",
                "Web Development",
                "Android Development",
                "Data Science",
                "Business Intelligence",
              ].map((category, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <input
                    type="checkbox"
                    id={`filter-${category}`}
                    checked={filterChecked[category]}
                    onChange={() => handleCheckboxChange(category)}
                    className="mr-2 checkbox-custom"
                  />
                  <label htmlFor={`filter-${category}`} className="text-sm md:text-base">
                    {category}
                  </label>
                </div>
              ))}

              <h3 className="text-xl font-bold text-gray-800 mb-4">Level Kesulitan</h3>
              {["Beginner Level", "Intermediate Level", "Advanced Level"].map((level, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <input
                    type="checkbox"
                    id={`filter-${level}`}
                    checked={filterChecked[level]}
                    onChange={() => handleCheckboxChange(level)}
                    className="mr-2 checkbox-custom"
                  />
                  <label htmlFor={`filter-${level}`} className="text-sm md:text-base">
                    {level}
                  </label>
                </div>
              ))}
              <button onClick={clearFilters} className="bg-red-600 text-white px-4 py-2 rounded mt-4">
                Clear Filters
              </button>
            </div>
          </div>

          {/* mobile filter menu button */}
          <div className="md:hidden mb-4 flex justify-between items-center">
            <button
              onClick={toggleMobileDropdown}
              className="md:hidden bg-blue-600 text-white px-2 py-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Filter Menu</h2>
          </div>

          {/* mobile filter menu */}
          {isMobileDropdownVisible && (
            <div className="md:hidden mb-4">
              <div className="bg-white shadow-md rounded-md p-4 overflow-hidden">
                <h3 className="text-lg font-bold mb-4">Filters</h3>
                {["Paling Baru", "Paling Populer", "Promo"].map((label, index) => (
                  <div className="flex items-center mb-2" key={index}>
                    <input
                      type="checkbox"
                      id={`mobile-filter-${label}`}
                      checked={filterChecked[label]}
                      onChange={() => handleCheckboxChange(label)}
                      className="mr-2 checkbox-custom"
                    />
                    <label htmlFor={`mobile-filter-${label}`} className="text-sm">
                      {label}
                    </label>
                  </div>
                ))}
                <h3 className="text-lg font-bold mt-4 mb-2">Kategori</h3>
                {[
                  "UI/UX Design",
                  "Web Development",
                  "Android Development",
                  "Data Science",
                  "Business Intelligence",
                ].map((category, index) => (
                  <div className="flex items-center mb-2" key={index}>
                    <input
                      type="checkbox"
                      id={`mobile-filter-${category}`}
                      checked={filterChecked[category]}
                      onChange={() => handleCheckboxChange(category)}
                      className="mr-2 checkbox-custom"
                    />
                    <label htmlFor={`mobile-filter-${category}`} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
                <h3 className="text-lg font-bold mt-4 mb-2">Level Kesulitan</h3>
                {["Beginner Level", "Intermediate Level", "Advanced Level"].map((level, index) => (
                  <div className="flex items-center mb-2" key={index}>
                    <input
                      type="checkbox"
                      id={`mobile-filter-${level}`}
                      checked={filterChecked[level]}
                      onChange={() => handleCheckboxChange(level)}
                      className="mr-2 checkbox-custom"
                    />
                    <label htmlFor={`mobile-filter-${level}`} className="text-sm">
                      {level}
                    </label>
                  </div>
                ))}
                <button
                  onClick={clearFilters}
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Course Cards Section */}
          <div className="md:w-3/4">
            <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses().map((course) => (
                <div key={course.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-28 object-cover"
                  />
                  <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                    <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                      {course.name}
                    </h1>
                    <p className="text-sm text-gray-600">{course.overview}</p>
                    <div className="flex justify-between items-center my-2">
                      <p className="text-black text-sm font-semibold">
                        Instruktor {course.instruktur}
                      </p>
                      <p className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" /> {course.rating}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-between flex-wrap">
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Shield size={18} className="mr-1" /> {course.level}
                      </p>
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Book size={18} className="mr-1" /> {course.modules} Modul
                      </p>
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Clock size={18} className="mr-1" /> {course.duration}
                      </p>
                    </div>
                    <div className="flex left-0 mt-2 my-2">
                      <Link
                        to="/detail-kelas"
                        className="py-1 px-4 bg-blue-600 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                      >
                        {course.price === "Gratis" ? "Mulai Kelas" : `Beli ${course.price}`}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default TopikKelas;