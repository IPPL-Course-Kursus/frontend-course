import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourses } from "../../redux/actions/courseActions";
import { selectMyCourse } from "../../redux/reducers/courseReducers";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const mycourse = useSelector(selectMyCourse);
  const { loading, error } = useSelector((state) => state.course || {});
  
  const [isMobileDropdownVisible, setMobileDropdownVisible] = useState(false);
  const [filterChecked, setFilterChecked] = useState({});
  const [courseStatusFilter, setCourseStatusFilter] = useState('all'); // State untuk status kursus

  useEffect(() => {
    dispatch(getUserCourses());
  }, [dispatch]);

  const toggleMobileDropdown = () => {
    setMobileDropdownVisible(!isMobileDropdownVisible);
  };

  const handleCheckboxChange = (filter) => {
    setFilterChecked((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  const handleStatusFilterChange = (status) => {
    setCourseStatusFilter(status);
  };

  const filteredCourses = () => {
    const activeFilters = Object.keys(filterChecked).filter((key) => filterChecked[key]);

    return mycourse.filter((course) => {
      const matchesFilter = activeFilters.length === 0 || activeFilters.includes(course.category); // Sesuaikan dengan kriteria filter Anda
      const matchesStatus = courseStatusFilter === 'all' || 
        (courseStatusFilter === 'notStarted' && course.contentFinish === 0) ||
        (courseStatusFilter === 'inProgress' && course.contentFinish > 0 && course.contentFinish < course.course.totalDuration) ||
        (courseStatusFilter === 'completed' && course.contentFinish === course.course.totalDuration);

      return matchesFilter && matchesStatus;
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F3F7FB]">
        <main className="container mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold text-gray-900 mt-12">Kelas Saya</h2>
            <button
              onClick={toggleMobileDropdown}
              className="md:hidden bg-blue-500 text-white px-2 py-2 rounded"
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
          </div>


{/* Tombol Filter Status */}
<div className="mb-4 flex flex-wrap justify-center">
  <button
    onClick={() => handleStatusFilterChange('all')}
    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${
      courseStatusFilter === 'all' 
        ? "bg-blue-500 text-white" 
        : "bg-white text-gray-800 hover:bg-gray-400"
    }`}
  >
    Semua
  </button>
  
  <button
    onClick={() => handleStatusFilterChange('notStarted')}
    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${
      courseStatusFilter === 'notStarted' 
        ? "bg-blue-500 text-white" 
        : "bg-white text-gray-800 hover:bg-gray-400"
    }`}
  >
    Belum Dipelajari
  </button>

  <button
    onClick={() => handleStatusFilterChange('inProgress')}
    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${
      courseStatusFilter === 'inProgress' 
        ? "bg-blue-500 text-white" 
        : "bg-white text-gray-800 hover:bg-gray-400"
    }`}
  >
    Sedang Dipelajari
  </button>
  
  <button
    onClick={() => handleStatusFilterChange('completed')}
    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${
      courseStatusFilter === 'completed' 
        ? "bg-blue-500 text-white" 
        : "bg-white text-gray-800 hover:bg-gray-400"
    }`}
  >
    Selesai
  </button>
</div>


          <div className="flex flex-col md:flex-row">
            {/* Filter Box */}
            <div className="md:w-1/4">
              {/* Filter selalu terlihat di desktop dan tablet, tersembunyi di HP */}
              <div className="hidden md:block bg-white shadow-md rounded-md p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Filter</h3>
                {/* Filter Konten */}
                <div>
                  {["UI/UX Design", "Web Development", "Android Development", "Data Science", "Business Intelligence"].map((label, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="checkbox"
                        id={`filter-${label}`}
                        className="mr-2 checkbox-custom"
                        onChange={() => handleCheckboxChange(label)}
                      />
                      <label htmlFor={`filter-${label}`} className="text-sm md:text-base">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Level Kesulitan</h3>
                {/* Filter Konten */}
                <div>
                  {["Beginner Level", "Intermediate Level", "Advanced Level"].map((label, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="checkbox"
                        id={`filter-${label}`}
                        className="mr-2 checkbox-custom"
                        onChange={() => handleCheckboxChange(label)}
                      />
                      <label htmlFor={`filter-${label}`} className="text-sm md:text-base">
                        {label}
                      </label>
                    </div>
                  ))}
                  <button
                                // onClick={clearFilters}
                                className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                            >
                                Clear Filters
                            </button>
                </div>
              </div>

              {/* Filter untuk Mobile (dropdown toggle) */}
              <div className={`md:hidden ${isMobileDropdownVisible ? "block" : "hidden"} bg-white shadow-md rounded-md p-4 mb-4`}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Filter</h3>
                {/* Filter Konten untuk Mobile */}
                <div>
                  {["UI/UX Design", "Web Development", "Android Development", "Data Science", "Business Intelligence"].map((label, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="checkbox"
                        id={`filter-mobile-${label}`}
                        className="mr-2 checkbox-custom"
                        onChange={() => handleCheckboxChange(label)}
                      />
                      <label htmlFor={`filter-mobile-${label}`} className="text-sm md:text-base">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Level Kesulitan</h3>
                {/* Filter Konten */}
                <div>
                  {["Beginner Level", "Intermediate Level", "Advanced Level"].map((label, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="checkbox"
                        id={`filter-${label}`}
                        className="mr-2 checkbox-custom"
                        onChange={() => handleCheckboxChange(label)}
                      />
                      <label htmlFor={`filter-${label}`} className="text-sm md:text-base">
                        {label}
                      </label> 
                    </div>
                  ))}

<button className="px-10 py-2 rounded-md text-red-600 mt-10 whitespace-nowrap">
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>

           {/* Main Courses Display */}
            <div className="md:w-3/4 pl-0 md:pl-4">
              {loading && <p>Loading courses...</p>}
              {error && <p>Error: {error}</p>}
              
              {filteredCourses().length > 0 ? (
                filteredCourses().map((courseItem, index) => {
                  console.log(courseItem, index); // Menampilkan di console

                  return (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-md p-4 mb-6 flex flex-col md:flex-row"
                    >
                      <img
                        src={courseItem.course.image || "https://via.placeholder.com/150"}
                        alt="Course"
                        className="w-full md:w-48 h-30 mr-8 rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-bold text-blue-800">
                            {courseItem.course.courseName}
                          </h3>
                          <Link to={`/mulai-kelas/${courseItem.id}`}>
                          <button className="bg-blue-500 hover:bg-slate-400 text-white mt-3 px-2 py-1 md:px-3 md:py-2 text-wrap rounded-md">
                            Lihat Detail Kelas
                          </button>
                          </Link>
                        </div>

                        <div className="flex items-center mb-2">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#32CD32"
                        strokeWidth="2"
                      >
                        <path d="M3 5C6 3 10 3 12 5V19C10 17 6 17 3 19V5Z" />
                        <path d="M21 5C18 3 14 3 12 5V19C14 17 18 17 21 19V5Z" />
                        <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                      </svg>
  <span>
    {typeof courseItem.course._count.chapters === "number" 
      ? courseItem.course._count.chapters 
      : 0} Chapters
  </span>
</div>

                        

                        <div className="flex items-center mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#32CD32"
                            strokeWidth="2"
                          >
                            <path d="M12 2L4 6V12C4 17.5 7.5 21 12 22C16.5 21 20 17.5 20 12V6L12 2Z" />
                            <polygon
                              points="12,9 12.75,11 14.5,11 13,12.25 13.5,14 12,13 10.5,14 11,12.25 9.5,11 11.25,11"
                              fill="#32CD32"
                            />
                          </svg>
                          <span>{courseItem.course.courseLevel.levelName}</span>
                        </div>

                        <div className="flex items-center mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#32CD32"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{courseItem.course.totalDuration} menit</span>
                        </div>

                        {/* Progress Bar di bawah durasi */}
<div className="w-full bg-gray-300 rounded-full h-6 mb-2">
  <div
    className="bg-indigo-500 rounded-full h-full flex items-center justify-center"
    style={{
      width: `${(courseItem.contentFinish / courseItem.course.totalDuration) * 100}%`,
    }}
  >
    <span className="text-white text-xs font-bold pl-9">
      {Math.round((courseItem.contentFinish / courseItem.course.totalDuration) * 100)}%
    </span>
  </div>
</div>

                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-2xl font-bold text-gray-700 text-center mt-4">No courses found for you</p>

              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage;