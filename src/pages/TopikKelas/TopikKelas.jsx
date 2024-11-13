import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Book, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse, getFilteredCourses } from "../../redux/actions/courseActions";
import { IoIosSearch } from "react-icons/io";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getCategory, getLevel, getType } from "../../redux/actions/categoryActions";

const TopikKelas = () => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course.courses);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filterChecked, setFilterChecked] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    category = [],
    courseLevel = [],
    data: courseTypes = [], // Pastikan ini diambil dari state yang benar
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCourse());
    dispatch(getCategory());
    dispatch(getLevel());
    dispatch(getType());
  }, [dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      const uniqueCategories = [...new Set(courses.map((course) => course.category))];
      setCategories(uniqueCategories);
      const initialFilterState = uniqueCategories.reduce((acc, category) => {
        acc[category.categoryName] = false;
        return acc;
      }, {});
      setFilterChecked(initialFilterState);
    }
  }, [courses]);

  useEffect(() => {
    const activeFilters = Object.keys(filterChecked).filter((key) => filterChecked[key]);

    if (activeFilters.length > 0) {
      const hashString = activeFilters
        .map((filter) => filter.toLowerCase().replace(/ /g, "_"))
        .join(",");
      window.location.hash = hashString;
    } else {
      window.location.hash = "";
    }
  }, [filterChecked]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setFilterChecked((prev) => ({
        ...prev,
        [categoryFromUrl]: true, // Set the checked state for the selected category
      }));
      setSelectedFilter(categoryFromUrl); // Update selected filter
    }
  }, [location.search]);

  const handleCheckboxChange = (label) => {
    const updatedChecked = {
      ...filterChecked,
      [label]: !filterChecked[label],
    };

    setFilterChecked(updatedChecked);
    setScrollPosition(window.scrollY);

    const filters = {
      isNewest: updatedChecked["Paling Baru"] || false,
      isPopular: updatedChecked["Paling Populer"] || false,
      promoStatus: updatedChecked["Promo"] || false,
      // Jika Anda ingin menambah kategori
      categories: Object.keys(updatedChecked).filter(
        (key) =>
          updatedChecked[key] &&
          key !== "Paling Baru" &&
          key !== "Paling Populer" &&
          key !== "Promo"
      ),
      levels: Object.keys(updatedChecked).filter(
        (key) => courseLevel.some((level) => level.levelName === key && updatedChecked[key]) // Filter berdasarkan level
      ),
    };

    if (
      updatedChecked["Promo"] ||
      updatedChecked["Paling Baru"] ||
      updatedChecked["Paling Populer"]
    )
      if (filters.isNewest || filters.isPopular || filters.promoStatus) {
        dispatch(getFilteredCourses(filters)); // Dispatch the filter action
      } else {
        dispatch(getAllCourse()); // If no filters, get all courses
      }
  };
  useEffect(() => {
    if (scrollPosition !== 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [filterChecked, scrollPosition]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);

    // Reset the filterChecked when "All" is clicked
    if (filter === "All") {
      clearFilters(); // Reset all filters when "All" is selected
    }
  };

  const filteredCourses = () => {
    const activeFilters = Object.keys(filterChecked).filter((key) => filterChecked[key]);

    let filteredCourses = courses.filter((course) => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedFilter === "Premium" && course.coursePrice === 0) return false;
      if (selectedFilter === "Free" && course.coursePrice !== 0) return false;

      return matchesSearch;
    });

    if (activeFilters.length > 0) {
      const categoryFilters = activeFilters.filter((filter) =>
        category.some((cat) => cat.categoryName === filter)
      );
      const levelFilters = activeFilters.filter((filter) =>
        courseLevel.some((level) => level.levelName === filter)
      );

      filteredCourses = filteredCourses.filter((course) => {
        const matchesCategory =
          categoryFilters.length === 0 ||
          categoryFilters.some((filter) => course.category.categoryName === filter);

        const matchesLevel =
          levelFilters.length === 0 ||
          levelFilters.some((filter) => course.courseLevel.levelName === filter);

        return matchesCategory && matchesLevel; // Memastikan kedua kondisi terpenuhi
      });
    }

    return filteredCourses;
  };

  const clearFilters = () => {
    const clearedFilterState = {
      "Paling Baru": false,
      "Paling Populer": false,
      Promo: false,
      ...categories.reduce((acc, category) => {
        acc[category.categoryName] = false;
        return acc;
      }, {}),
    };

    const currentScrollPosition = window.scrollY;
    setScrollPosition(currentScrollPosition);

    setFilterChecked(clearedFilterState);
    setSelectedFilter("All");
    window.location.hash = "";

    dispatch(getAllCourse());
  };

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredCourseType = filteredCourses();
  const totalPages = Math.ceil(filteredCourseType.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourseType.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar />
      {/* Button kembali ke Home*/}
      <div className="flex justify-center bg-blue-50 pb-10">
        <main className="w-full bg-blue-50 pb-4 container">
          <section className="w-full text-center bg-white py-16 mt-8 rounded-xl shadow-lg">
            <div className="px-6 lg:px-0">
              <h1
                className="text-3xl font-bold mb-4"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#1E3A8A", // Elegant deep blue color
                }}
              >
                Katalog Kelas
              </h1>
              <p className="text-gray-500 font-montserrat text-lg max-w-xl mx-auto leading-relaxed">
                Etam Code menyediakan berbagai macam kelas yang sudah berbasis industri untuk
                meningkatkan keterampilan digital kamu.
              </p>
            </div>

            <div className="flex justify-center mt-12">
              <div className="relative w-full max-w-md lg:w-[30rem] transition-all duration-200 ease-in-out">
                <input
                  type="text"
                  placeholder="Cari Kelas..."
                  className="w-full py-3 pl-5 pr-14 text-gray-800 bg-white rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-200 ease-in-out hover:shadow-md"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value.toLowerCase());
                    setCurrentPage(1);
                  }}
                />
                <button className="absolute top-1/2 right-4 -translate-y-1/2 text-blue-800 hover:text-blue-600 transition-transform duration-200 ease-in-out transform hover:scale-110">
                  <IoIosSearch className="w-6 h-6" />
                </button>
              </div>
            </div>
          </section>

          <div className="py-8 px-4 md:px-10">
            <div className="flex flex-col md:flex-row items-center w-full">
              {/* Heading TOPIK KELAS rata kiri */}
              <h3
                className="text-3xl font-bold mb-6 md:mb-0 md:mr-auto"
                style={{
                  fontFamily: "'Red Rose', sans-serif",
                  color: "#000000",
                }}
              >
                TOPIK KELAS
              </h3>

              {/* Container tombol di tengah */}
              <div className="flex flex-wrap justify-center w-full md:w-auto mx-auto gap-4">
                {/* Tombol All */}
                <button
                  className={`filter-btn px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold text-sm transition-all duration-300 ease-in-out shadow-md ${
                    selectedFilter === "All"
                      ? "bg-blue-800 text-white shadow-xl transform scale-105"
                      : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterClick("All")}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  All
                </button>

                {/* Map tombol untuk setiap tipe kelas */}
                {courseTypes &&
                  courseTypes.map((type, i) => (
                    <button
                      key={i}
                      className={`filter-btn px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold text-sm transition-all duration-300 ease-in-out shadow-md ${
                        selectedFilter === type.typeName
                          ? "bg-blue-800 text-white shadow-xl transform scale-105"
                          : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => handleFilterClick(type.typeName)}
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {type.typeName}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6 pr-4 md:pr-10 ml-10">
            <div className="md:block md:w-1/4">
              <button
                onClick={toggleFilters}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4 md:hidden"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              <div
                className={`bg-white shadow-md rounded-md p-4 ${
                  showFilters ? "" : "hidden md:block"
                }`}
              >
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

                <h3 className="text-xl font-bold text-gray-800 mb-4 mt-4">Kategori</h3>
                {category &&
                  category.map((kategori, i) => (
                    <div className="flex items-center mb-2" key={i}>
                      <input
                        type="checkbox"
                        id={`filter-${kategori.categoryName}`}
                        checked={filterChecked[kategori.categoryName] || false}
                        onChange={() => handleCheckboxChange(kategori.categoryName)}
                        className="mr-2 checkbox-custom"
                      />
                      <label
                        htmlFor={`filter-${kategori.categoryName}`}
                        className="text-sm md:text-base"
                      >
                        {kategori.categoryName}
                      </label>
                    </div>
                  ))}

                <h3 className="text-xl font-bold text-gray-800 mb-4 mt-4">Level Kesulitan</h3>
                {courseLevel &&
                  courseLevel.map((level, i) => (
                    <div className="flex items-center mb-2" key={i}>
                      <input
                        type="checkbox"
                        id={`filter-${level.levelName}`}
                        checked={filterChecked[level.levelName] || false}
                        onChange={() => handleCheckboxChange(level.levelName)}
                        className="mr-2 checkbox-custom"
                      />
                      <label htmlFor={`filter-${level.levelName}`} className="text-sm md:text-base">
                        {level.levelName}
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

            <div className="md:w-3/4">
              <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentItems.length > 0 ? (
                  currentItems.map((course) => (
                    <div key={course.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.courseName}
                        className="w-full h-28 object-cover"
                      />
                      <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                        {/* <h1 className="text-color-primary font-bold text-sm lg:text-base">
                      {course.category.categoryName}
                    </h1> */}
                        <p className="font-bold text-sm lg:text-base truncate">
                          {course.courseName}
                        </p>
                        <div className="flex justify-between items-center my-2">
                          <p className="text-gray-600 text-sm font-semibold flex-shrink-0">
                            Instructor: {course.user.fullName}
                          </p>
                        </div>
                        <div className="mt-3 flex justify-between flex-wrap">
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Shield size={18} className="mr-1" /> {course.courseLevel.levelName}
                          </p>
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Book size={18} className="mr-1" /> {course._count.chapters} Modul
                          </p>
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Clock size={18} className="mr-1" /> {course.totalDuration} Menit
                          </p>
                        </div>
                        <div className="flex left-0 mt-2 my-2">
                          <Link
                            to={`/course-detail/${course.id}`}
                            className="py-1 px-4 bg-blue-600 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                          >
                            {course.coursePrice === 0
                              ? "Free"
                              : `Beli Rp. ${
                                  course.promoStatus
                                    ? course.courseDiscountPrice
                                    : course.coursePrice
                                }`}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-2xl text-center text-gray-700 font-bold py-4">
                    No courses found for you
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredCourseType.length > itemsPerPage && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                  <button
                    className={`flex items-center py-2 px-4 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#0a61aa] text-white"
                    } transition-all duration-300 hover:scale-105`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <IoArrowBackCircle className="mr-2 text-xl" />
                    Previous
                  </button>

                  {/* Responsive Page Text */}
                  <span className="text-lg font-semibold">
                    <span className="hidden sm:inline">
                      Page {currentPage} of {totalPages}
                    </span>
                    <span className="inline sm:hidden">
                      {currentPage} / {totalPages}
                    </span>
                  </span>

                  <button
                    className={`flex items-center py-2 px-4 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#0a61aa] text-white"
                    } transition-all duration-300 hover:scale-105`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <IoArrowForwardCircle className="ml-2 text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default TopikKelas;
