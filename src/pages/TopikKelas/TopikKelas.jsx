// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Shield, Book, Clock } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getAllCourse,
//     getFilteredCourses,
// } from "../../redux/actions/courseActions";
// import { IoIosSearch } from "react-icons/io";
// import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";

// const TopikKelas = () => {
//     const dispatch = useDispatch();

//     const courses = useSelector((state) => state.course.courses);
//     const [categories, setCategories] = useState([]);
//     const [selectedFilter, setSelectedFilter] = useState("All");

//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 9;

//     const [filterChecked, setFilterChecked] = useState({});
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         dispatch(getAllCourse());
//     }, [dispatch]);

//     useEffect(() => {
//         if (courses.length > 0) {
//             const uniqueCategories = [
//                 ...new Set(courses.map((course) => course.category)),
//             ];
//             setCategories(uniqueCategories);
//             const initialFilterState = uniqueCategories.reduce(
//                 (acc, category) => {
//                     acc[category.categoryName] = false;
//                     return acc;
//                 },
//                 {}
//             );
//             setFilterChecked(initialFilterState);
//         }
//     }, [courses]);

//     useEffect(() => {
//         const activeFilters = Object.keys(filterChecked).filter(
//             (key) => filterChecked[key]
//         );

//         if (activeFilters.length > 0) {
//             const hashString = activeFilters
//                 .map((filter) => filter.toLowerCase().replace(/ /g, "_"))
//                 .join(",");
//             window.location.hash = hashString;
//         } else {
//             window.location.hash = "";
//         }
//     }, [filterChecked]);

//     const handleCheckboxChange = (label) => {
//         const updatedChecked = {
//             ...filterChecked,
//             [label]: !filterChecked[label],
//         };

//         setFilterChecked(updatedChecked);
//         setCurrentPage(1);

//         const filters = {
//             isNewest: updatedChecked["Paling Baru"] || false,
//             isPopular: updatedChecked["Paling Populer"] || false,
//             promoStatus: updatedChecked["Promo"] || false,
//             // Jika Anda ingin menambah kategori
//             categories: Object.keys(updatedChecked).filter(key => updatedChecked[key] && key !== "Paling Baru" && key !== "Paling Populer" && key !== "Promo"),
//         };

//         if (
//             updatedChecked["Promo"] ||
//             updatedChecked["Paling Baru"] ||
//             updatedChecked["Paling Populer"]
//         ) if (filters.isNewest || filters.isPopular || filters.promoStatus) {
//             dispatch(getFilteredCourses(filters)); // Dispatch the filter action
//         } else {
//             dispatch(getAllCourse()); // If no filters, get all courses
//         }
//     };

//     const handleFilterClick = (filter) => {
//         setSelectedFilter(filter);
//         setCurrentPage(1);

//         // Reset the filterChecked when "All" is clicked
//         if (filter === "All") {
//             clearFilters(); // Reset all filters when "All" is selected
//         }
//     };

//     const filteredCourses = () => {
//         const activeFilters = Object.keys(filterChecked).filter(
//             (key) => filterChecked[key]
//         );

//         let filteredCourses = courses.filter((course) => {
//             const matchesSearch =
//                 course.courseName
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase()) ||
//                 course.category.categoryName
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase());

//             if (selectedFilter === "kelas_berbayar" && course.coursePrice === 0)
//                 return false;
//             if (selectedFilter === "Kelas_Gratis" && course.coursePrice !== 0)
//                 return false;

//             return matchesSearch;
//         });

//         if (activeFilters.length > 0) {
//             filteredCourses = filteredCourses.filter((course) =>
//                 activeFilters.some(
//                     (filter) =>
//                         course.category.categoryName === filter ||
//                         course.courseLevel.levelName === filter
//                 )
//             );
//         }

//         return filteredCourses;
//     };

//     const clearFilters = () => {
//         const clearedFilterState = {
//             "Paling Baru": false,
//             "Paling Populer": false,
//             "Promo": false,
//             ...categories.reduce((acc, category) => {
//                 acc[category.categoryName] = false;
//                 return acc;
//             }, {}),
//         };

//         setFilterChecked(clearedFilterState); // Reset semua filter
//         setSelectedFilter("All"); // Reset filter yang dipilih
//         window.location.hash = ""; // Hapus hash URL

//         dispatch(getAllCourse()); // Dispatch untuk mendapatkan semua kursus
//     };

//     const filteredCourseType = filteredCourses();
//     const totalPages = Math.ceil(filteredCourseType.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredCourseType.slice(
//         indexOfFirstItem,
//         indexOfLastItem
//     );

//     return (
//         <>
//             <Navbar />
//             <main className="w-full bg-blue-50 pb-4">
//                 <section className="w-full text-center bg-white py-12 mt-4">
//                     <div className="max-w-screen-lg mx-auto">
//                         <h1
//                             className="text-[25px] font-semibold"
//                             style={{
//                                 fontFamily: "Poppins, sans-serif",
//                                 color: "#000000",
//                             }}
//                         >
//                             Katalog Kelas
//                         </h1>
//                         <p className="text-gray-600 font-montserrat max-w-2xl mx-auto">
//                             Etam Code menyediakan berbagai macam kelas yang
//                             sudah berbasis industri untuk meningkatkan
//                             keterampilan digital kamu.
//                         </p>
//                     </div>

//                     <div className="flex gap-2 flex-grow lg:relative justify-center">
//                         <div className="form-control relative hidden lg:block w-full mt-10 lg:w-[30rem]">
//                             <input
//                                 type="text"
//                                 placeholder="Find a Course"
//                                 className="input w-full text-sm rounded-2xl border-black pr-12"
//                                 value={searchQuery}
//                                 onChange={(e) => {
//                                     setSearchQuery(
//                                         e.target.value.toLowerCase()
//                                     );
//                                     setCurrentPage(1);
//                                 }}
//                             />
//                             <button className="absolute top-1/2 right-4 -translate-y-1/2">
//                                 <IoIosSearch className="w-5 h-5 lg:w-6 lg:h-6" />
//                             </button>
//                         </div>
//                     </div>
//                 </section>
//                 <div className="py-8 px-4 md:px-10">
//                     <div className="flex flex-col md:flex-row items-center w-full">
//                         {/* Heading TOPIK KELAS rata kiri */}
//                         <h3
//                             className="text-[32px] font-bold mb-4 md:mb-0"
//                             style={{
//                                 fontFamily: "'Red Rose', sans-serif",
//                                 color: "#000000",
//                             }}
//                         >
//                             TOPIK KELAS
//                         </h3>

//                         {/* Container tombol ditengah */}
//                         <div className="flex flex-wrap justify-center w-full md:w-auto mx-auto gap-3">
//                             {" "}
//                             {/* Buat tombol berada di tengah */}
//                             <button
//                                 className={`filter-btn px-6 py-2 w-full md:w-auto rounded-full font-bold text-xs ${
//                                     selectedFilter === "All"
//                                         ? "bg-blue-600 text-white"
//                                         : "bg-white text-black hover:bg-gray-200"
//                                 }`}
//                                 onClick={() => handleFilterClick("All")}
//                             >
//                                 All
//                             </button>
//                             <button
//                                 className={`filter-btn px-6 py-2 w-full md:w-auto rounded-full font-bold text-xs ${
//                                     selectedFilter === "kelas_berbayar"
//                                         ? "bg-blue-600 text-white"
//                                         : "bg-white text-black hover:bg-gray-200"
//                                 }`}
//                                 onClick={() =>
//                                     handleFilterClick("kelas_berbayar")
//                                 }
//                             >
//                                 Kelas Berbayar
//                             </button>
//                             <button
//                                 className={`filter-btn px-6 py-2 w-full md:w-auto rounded-full font-bold text-xs ${
//                                     selectedFilter === "Kelas_Gratis"
//                                         ? "bg-blue-600 text-white"
//                                         : "bg-white text-black hover:bg-gray-200"
//                                 }`}
//                                 onClick={() =>
//                                     handleFilterClick("Kelas_Gratis")
//                                 }
//                             >
//                                 Kelas Gratis
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row md:space-x-6 pr-4 md:pr-10">
//                     <div className="md:block md:w-1/4">
//                         <div className="bg-white shadow-md rounded-md p-4">
//                             <h3 className="text-xl font-bold text-gray-800 mb-4">
//                                 Filter
//                             </h3>
//                             {["Paling Baru", "Paling Populer", "Promo"].map(
//                                 (label, index) => (
//                                     <div
//                                         className="flex items-center mb-2"
//                                         key={index}
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             id={`filter-${label}`}
//                                             checked={filterChecked[label]}
//                                             onChange={() =>
//                                                 handleCheckboxChange(label)
//                                             }
//                                             className="mr-2 checkbox-custom"
//                                         />
//                                         <label
//                                             htmlFor={`filter-${label}`}
//                                             className="text-sm md:text-base"
//                                         >
//                                             {label}
//                                         </label>
//                                     </div>
//                                 )
//                             )}

//                             <h3 className="text-xl font-bold text-gray-800 mb-4">
//                                 Kategori
//                             </h3>
//                             {[
//                                 "Web Development",
//                                 "Programming Ippl",
//                                 "Mobile Development",
//                                 "Cloud Computing",
//                                 "Artificial Intelligence",
//                                 "Android Development",
//                                 "Machine Learning",
//                                 "Cybersecurity",
//                                 "Blockchain",
//                                 "Game Development",
//                                 "Digital Marketing",
//                                 "Graphic Design",
//                                 "Project Management",
//                                 "DevOps",
//                                 "Internet of Things",
//                                 "Data Science",
//                                 "Business Intelligence",
//                             ].map((category, index) => (
//                                 <div
//                                     className="flex items-center mb-2"
//                                     key={index}
//                                 >
//                                     <input
//                                         type="checkbox"
//                                         id={`filter-${category}`}
//                                         checked={filterChecked[category]}
//                                         onChange={() =>
//                                             handleCheckboxChange(category)
//                                         }
//                                         className="mr-2 checkbox-custom"
//                                     />
//                                     <label
//                                         htmlFor={`filter-${category}`}
//                                         className="text-sm md:text-base"
//                                     >
//                                         {category}
//                                     </label>
//                                 </div>
//                             ))}
//                             <h3 className="text-xl font-bold text-gray-800 mb-4">
//                                 Level Kesulitan
//                             </h3>
//                             {["Beginner", "Intermediate", "Advanced"].map(
//                                 (level, index) => (
//                                     <div
//                                         className="flex items-center mb-2"
//                                         key={index}
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             id={`filter-${level}`}
//                                             checked={filterChecked[level]}
//                                             onChange={() =>
//                                                 handleCheckboxChange(level)
//                                             }
//                                             className="mr-2 checkbox-custom"
//                                         />
//                                         <label
//                                             htmlFor={`filter-${level}`}
//                                             className="text-sm md:text-base"
//                                         >
//                                             {level}
//                                         </label>
//                                     </div>
//                                 )
//                             )}
//                             <button
//                                 onClick={clearFilters}
//                                 className="bg-red-600 text-white px-4 py-2 rounded mt-4"
//                             >
//                                 Clear Filters
//                             </button>
//                         </div>
//                     </div>

//                     <div className="md:w-3/4">
//                         <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                             {currentItems.map((course) => (
//                                 <div
//                                     key={course.id}
//                                     className="bg-white shadow-xl rounded-xl overflow-hidden"
//                                 >
//                                     <img
//                                         src={course.image}
//                                         alt={course.courseName}
//                                         className="w-full h-28 object-cover"
//                                     />
//                                     <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
//                                         <h1 className="text-color-primary font-bold text-sm lg:text-base">
//                                             {course.category.categoryName}
//                                         </h1>
//                                         <p className="text-sm text-gray-600">
//                                             {course.courseName}
//                                         </p>
//                                         <div className="flex justify-between items-center my-2">
//                                             <p className="text-black text-sm font-semibold">
//                                                 <p className="text-black text-sm font-semibold">
//                                                     Instructor:{" "}
//                                                     {course.user.fullName}
//                                                 </p>
//                                             </p>
//                                         </div>
//                                         <div className="mt-3 flex justify-between flex-wrap">
//                                             <p className="flex items-center text-xs font-semibold text-color-primary">
//                                                 <Shield
//                                                     size={18}
//                                                     className="mr-1"
//                                                 />{" "}
//                                                 {course.courseLevel.levelName}
//                                             </p>
//                                             <p className="flex items-center text-xs font-semibold text-color-primary">
//                                                 <Book
//                                                     size={18}
//                                                     className="mr-1"
//                                                 />{" "}
//                                                 {course._count.chapters} Modul
//                                             </p>
//                                             <p className="flex items-center text-xs font-semibold text-color-primary">
//                                                 <Clock
//                                                     size={18}
//                                                     className="mr-1"
//                                                 />{" "}
//                                                 {course.totalDuration} Menit
//                                             </p>
//                                         </div>
//                                         <div className="flex left-0 mt-2 my-2">
//                                             <Link
//                                                 to={`/course-detail/${course.id}`}
//                                                 className="py-1 px-4 bg-blue-600 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
//                                             >
// {course.coursePrice === 0
//                 ? "Free"
//                 : `Beli Rp. ${course.promoStatus ? course.courseDiscountPrice : course.coursePrice}`}
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/*Pagination */}
//                         <div className="flex justify-between items-center mt-8">
//                             <button
//                                 className={`flex items-center py-2 px-4 rounded-lg ${
//                                     currentPage === 1
//                                         ? "bg-gray-300 cursor-not-allowed"
//                                         : "bg-[#0a61aa] text-white"
//                                 } transition-all duration-300 hover:scale-105`}
//                                 onClick={() => setCurrentPage(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                             >
//                                 <IoArrowBackCircle className="mr-2 text-xl" />
//                                 Previous
//                             </button>

//                             <span className="text-lg font-semibold">
//                                 Page {currentPage} of {totalPages}
//                             </span>

//                             <button
//                                 className={`flex items-center py-2 px-4 rounded-lg ${
//                                     currentPage === totalPages
//                                         ? "bg-gray-300 cursor-not-allowed"
//                                         : "bg-[#0a61aa] text-white"
//                                 } transition-all duration-300 hover:scale-105`}
//                                 onClick={() => setCurrentPage(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                             >
//                                 Next
//                                 <IoArrowForwardCircle className="ml-2 text-xl" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </>
//     );
// };

// export default TopikKelas;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Book, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse, getFilteredCourses } from "../../redux/actions/courseActions";
import { IoIosSearch } from "react-icons/io";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getCategory } from "../../redux/actions/categoryActions";

const TopikKelas = () => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course.courses);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [filterChecked, setFilterChecked] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCourse());
    dispatch(getCategory());
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

  const handleCheckboxChange = (label) => {
    const updatedChecked = {
      ...filterChecked,
      [label]: !filterChecked[label],
    };

    setFilterChecked(updatedChecked);
    setCurrentPage(1);

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

      if (selectedFilter === "kelas_berbayar" && course.coursePrice === 0) return false;
      if (selectedFilter === "Kelas_Gratis" && course.coursePrice !== 0) return false;

      return matchesSearch;
    });

    if (activeFilters.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        activeFilters.some(
          (filter) =>
            course.category.categoryName === filter || course.courseLevel.levelName === filter
        )
      );
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

    setFilterChecked(clearedFilterState); // Reset semua filter
    setSelectedFilter("All"); // Reset filter yang dipilih
    window.location.hash = ""; // Hapus hash URL

    dispatch(getAllCourse()); // Dispatch untuk mendapatkan semua kursus
  };

  const filteredCourseType = filteredCourses();
  const totalPages = Math.ceil(filteredCourseType.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourseType.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar />
      <main className="w-full bg-blue-50 pb-4">
        <section className="w-full text-center bg-white py-12 mt-4">
          <div className="max-w-screen-lg mx-auto">
            <h1
              className="text-[25px] font-semibold"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: "#000000",
              }}
            >
              Katalog Kelas
            </h1>
            <p className="text-gray-600 font-montserrat max-w-2xl mx-auto">
              Etam Code menyediakan berbagai macam kelas yang sudah berbasis industri untuk
              meningkatkan keterampilan digital kamu.
            </p>
          </div>

          <div className="flex gap-2 flex-grow lg:relative justify-center">
            <div className="form-control relative hidden lg:block w-full mt-10 lg:w-[30rem]">
              <input
                type="text"
                placeholder="Find a Course"
                className="input w-full text-sm rounded-2xl border-black pr-12"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value.toLowerCase());
                  setCurrentPage(1);
                }}
              />
              <button className="absolute top-1/2 right-4 -translate-y-1/2">
                <IoIosSearch className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
          </div>
        </section>
        <div className="py-8 px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center w-full">
            {/* Heading TOPIK KELAS rata kiri */}
            <h3
              className="text-[32px] font-bold mb-4 md:mb-0"
              style={{
                fontFamily: "'Red Rose', sans-serif",
                color: "#000000",
              }}
            >
              TOPIK KELAS
            </h3>

            {/* Container tombol ditengah */}
            <div className="flex flex-wrap justify-center w-full md:w-auto mx-auto gap-3">
              {" "}
              {/* Buat tombol berada di tengah */}
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

        <div className="flex flex-col md:flex-row md:space-x-6 pr-4 md:pr-10">
          <div className="md:block md:w-1/4">
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

              <h3 className="">Kategori</h3>
              {category.map((kategori, i) => (
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

              <h3 className="text-xl font-bold text-gray-800 mb-4">Level Kesulitan</h3>
              {["Beginner", "Intermediate", "Advanced"].map((level, index) => (
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
                className="bg-red-600 text-white px-4 py-2 rounded mt-4"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="grid mt-2 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((course) => (
                <div key={course.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.courseName}
                    className="w-full h-28 object-cover"
                  />
                  <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                    <h1 className="text-color-primary font-bold text-sm lg:text-base">
                      {course.category.categoryName}
                    </h1>
                    <p className="text-sm text-gray-600">{course.courseName}</p>
                    <div className="flex justify-between items-center my-2">
                      <p className="text-black text-sm font-semibold">
                        <p className="text-black text-sm font-semibold">
                          Instructor: {course.user.fullName}
                        </p>
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
                              course.promoStatus ? course.courseDiscountPrice : course.coursePrice
                            }`}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/*Pagination */}
            <div className="flex justify-between items-center mt-8">
              <button
                className={`flex items-center py-2 px-4 rounded-lg ${
                  currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0a61aa] text-white"
                } transition-all duration-300 hover:scale-105`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <IoArrowBackCircle className="mr-2 text-xl" />
                Previous
              </button>

              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TopikKelas;
