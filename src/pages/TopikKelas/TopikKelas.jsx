import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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

  // Course data array
  const courses = [
    {
      name: "JavaScript Intermediate",
      modules: 10,
      level: "Intermediate Level",
      duration: "120 Menit",
      progress: "50%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      harga: "100.000.00",
    },
    {
      name: "React for Beginners",
      modules: 8,
      level: "Beginner Level",
      duration: "90 Menit",
      progress: "100%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      harga: "100.000.00",
    },
    {
      name: "Data Science Essentials",
      modules: 12,
      level: "Advanced Level",
      duration: "150 Menit",
      progress: "70%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      harga: "200.000.00",
    },
    {
      name: "Windows",
      modules: 15,
      level: "Intermediate Level",
      duration: "200 Menit",
      progress: "0%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      harga: "0",
    },
    {
      name: "Linux",
      modules: 15,
      level: "Intermediate Level",
      duration: "200 Menit",
      progress: "0%",
      image:
        "https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg",
      harga: "0",
    },
  ];

  const filteredCourses = () => {
    // Apply filter logic based on selected filter and checked checkboxes
    const activeFilters = Object.keys(filterChecked).filter((key) => filterChecked[key]);

    return courses.filter((course) => {
      // Check if course matches selected filter
      if (selectedFilter === "kelas_berbayar" && course.harga === "0") return false;
      if (selectedFilter === "Kelas_Gratis" && course.harga !== "0") return false;

      // Check if course matches any active checkbox filters
      if (activeFilters.length > 0) {
        return activeFilters.some(
          (filter) => course.level === filter || course.name.includes(filter) // Adjust match criteria as needed
        );
      }
      return true; // Show all courses if no filters are active
    });
  };
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-10 bg-blue-50">
        <section className="w-full left-0 right-0 text-center bg-white py-12 mt-4">
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

        <div className="py-8 px-10">
          <div className="flex justify-between items-center">
            <h3
              className="self-center text-[32px] font-bold"
              style={{ fontFamily: "Red Rose, sans-serif", color: "#000000" }}
            >
              TOPIK KELAS
            </h3>
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-4">
                <button
                  className={`filter-btn bg-blue-600 text-black px-6 py-2 w-40 rounded-full font-bold text-xs ${
                    selectedFilter === "All"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                  onClick={() => handleFilterClick("All")}
                >
                  All
                </button>
                <button
                  className={`filter-btn bg-blue-600 text-black px-6 py-2 w-40 rounded-full font-bold text-xs ${
                    selectedFilter === "kelas_berbayar"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                  onClick={() => handleFilterClick("kelas_berbayar")}
                >
                  Kelas Berbayar
                </button>
                <button
                  className={`filter-btn bg-blue-600 text-black px-6 py-2 w-40 rounded-full font-bold text-xs ${
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
        </div>

        <div className="flex flex-col md:flex-row pr-10">
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
              <button
                onClick={clearFilters}
                className="block mx-auto text-center px-10 py-2 rounded-md text-red-600 mt-10 whitespace-nowrap"
              >
                Hapus Filter
              </button>
            </div>
          </div>

          <div className="md:w-3/4 md:ml-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses().map((course, index) => (
                <div className="bg-white p-4 rounded-md shadow-md" key={index}>
                  <img
                    src={course.image}
                    alt={course.name}
                    className="h-32 w-full object-cover rounded-md mb-4"
                  />
                  <h4 className="font-bold text-lg">{course.name}</h4>
                  <p className="text-sm">Modules: {course.modules}</p>
                  <p className="text-sm">Level: {course.level}</p>
                  <p className="text-sm">Duration: {course.duration}</p>
                  <p className="text-sm">Progress: {course.progress}</p>
                  <p className="text-lg font-bold">Price: {course.harga}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TopikKelas;
