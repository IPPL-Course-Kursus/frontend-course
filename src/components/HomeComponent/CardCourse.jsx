import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { Book, Clock, Gem, Shield } from "lucide-react";
import ProgressBar from "../MyCourse/ProgressBar";
import PropTypes from "prop-types";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../redux/actions/courseActions";
import { getCategory } from "../../redux/actions/categoryActions";

const CardCourse = ({ title = "Kelas Populer" }) => {
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.course);
  const { category } = useSelector((state) => state.category);

  const handleFilterClick = (categoryId) => {
    setSelectCategoryId(categoryId);
  };

  useEffect(() => {
    dispatch(getAllCourse()); // Fetch all courses when component mounts
    dispatch(getCategory());
    setSelectCategoryId("");
  }, [dispatch]);

  useEffect(() => {
    if (category.length > 0) {
      setSelectCategoryId(""); // Automatically select the first category
    }
  }, [category]);

  const filteredCourses = selectCategoryId
    ? courses.filter((course) => course.id === selectCategoryId)
    : courses;

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="absolute lg:-right-8 hidden lg:block top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <IoIosArrowDroprightCircle size={30} className="text-color-primary" />
      </div>
    );
  };

  // Custom Prev Arrow
  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="absolute  lg:-left-8 -left-4 hidden lg:block top-1/2 transform -translate-y-1/2 cursor-pointer z-10 rounded-full bg-white "
        onClick={onClick}
      >
        <IoIosArrowDropleftCircle size={30} className="text-color-primary" />
      </div>
    );
  };

  const categorySliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const courseSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center max-w-[1060px] container gap-5 pt-[26px] pb-[53px]">
          {/* Header Section */}
          <div className="flex justify-between w-full px-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <Link to="/class" className="text-sm font-semibold text-blue-600 hover:underline">
              Lihat Semua
            </Link>
          </div>

          {/* Category Carousel Section */}
          <div className="relative w-full">
            <Slider ref={sliderRef} {...categorySliderSettings}>
              <button
                onClick={() => handleFilterClick("")} // Set categoryId to an empty string for "All"
                className={` flex justify-center items-center border-2 rounded-lg text-sm font-semibold p-3 transition-colors duration-300  whitespace-nowrap ${
                  selectCategoryId === "" // Check if the categoryId is empty for "All"
                    ? "mr-4 bg-color-primary text-white bg-primary"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:bg-primary hover:text-white cursor-pointer`}
              >
                All
              </button>
              {/* mapping */}
              {category.map((kategori) => (
                <div key={kategori.id} className="ml-0">
                  <div
                    className={`flex justify-center items-center border-2 rounded-lg text-sm font-semibold p-3 transition-colors duration-300 mx-2 whitespace-nowrap ${
                      selectCategoryId === kategori.id
                        ? "bg-color-primary text-white bg-primary"
                        : "bg-white text-gray-700 border-gray-300"
                    } hover:bg-primary hover:text-white cursor-pointer`}
                    onClick={() => handleFilterClick(kategori.id)}
                  >
                    <span className="block max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {kategori.categoryName}
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* <div className="relative w-full">
            <Slider ref={sliderRef} {...categorySliderSettings}>
              {category.map(
                (
                  kategori // Menggunakan data kategori dari Redux
                ) => (
                  <div key={kategori.id}>
                    <div
                      className={`flex justify-center items-center border-2 rounded-lg text-sm font-semibold p-3 transition-colors duration-300 mx-2 whitespace-nowrap ${
                        selectCategoryId === kategori.id
                          ? "bg-color-primary text-white"
                          : "bg-white text-gray-700 border-gray-300"
                      } hover:bg-primary hover:text-white cursor-pointer`}
                      onClick={() => setSelectCategoryId(kategori.id)}
                    >
                      {kategori.categoryName}
                    </div>
                  </div>
                )
              )}
            </Slider>
          </div>
        </div>
      </div> */}
      {/* Card Course Section */}
      <div className="max-w-screen-lg mx-auto px-6 lg:p-0">
        {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
          selectCategoryId === "" ? (
            // Carousel view for all courses
            <Slider {...courseSliderSettings}>
              {filteredCourses.map((val) => (
                <div key={val.id} className="p-2">
                  <div className="w-full bg-white shadow-xl rounded-xl overflow-hidden pb-3">
                    <div className="flex flex-col">
                      <img src={val.image} alt={val.name} className="w-full h-32 object-cover" />
                      <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                        <div className="flex justify-between items-center">
                          <h1 className="text-color-primary font-bold text-sm lg:text-base">
                            {val.courseName}
                          </h1>
                          <p className="flex items-center font-semibold">
                            <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" /> 4.8
                          </p>
                        </div>
                        <p className="text-black text-sm font-semibold">
                          Instruktor {val.user.fullName}
                        </p>
                        <div className="mt-3 flex justify-between flex-wrap">
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Shield size={18} className="mr-1" /> {val.courseLevel.levelName}
                          </p>
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Book size={18} className="mr-1" /> {val._count.chapters}
                          </p>
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Clock size={18} className="mr-1" /> {val.totalDuration} menit
                          </p>
                        </div>
                        <div className="my-2">
                          <ProgressBar />
                        </div>
                        <div className="my-2">
                          <Link
                            to={`/course-detail/${val.id}`}
                            className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                          >
                            Mulai Kelas
                          </Link>
                        </div>
                        {val.courseDiscountPrice || val.coursePrice ? (
                          <div className="my-2">
                            <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                              {val.courseDiscountPrice || val.coursePrice}
                            </button>
                          </div>
                        ) : (
                          <div className="my-2">
                            <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                              <span className="mr-2">
                                <Gem size={16} />
                              </span>
                              Premium
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            // Grid view for selected category
            <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:mt-4">
              {filteredCourses.map((val) => (
                <div key={val.id} className="p-2">
                  <div className="w-full bg-white shadow-xl rounded-xl overflow-hidden pb-3">
                    <div className="flex flex-col">
                      <img src={val.image} alt={val.name} className="w-full h-32 object-cover" />
                      <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                        <div className="flex justify-between items-center">
                          <h1 className="text-color-primary font-bold text-sm lg:text-base">
                            {val.courseName}
                          </h1>
                          <p className="flex items-center font-semibold">
                            <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" /> 4.8
                          </p>
                        </div>
                        <p className="text-black text-sm font-semibold">
                          Instruktor {val.user.fullName}
                        </p>
                        <div className="mt-3 flex justify-between flex-wrap">
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Shield size={18} className="mr-1" /> {val.courseLevel.levelName}
                          </p>
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Book size={18} className="mr-1" /> {val._count.chapters}
                          </p>
                          <p className="flex items-center text-xs font-semibold text-color-primary">
                            <Clock size={18} className="mr-1" /> {val.totalDuration} menit
                          </p>
                        </div>
                        <div className="my-2">
                          <ProgressBar />
                        </div>
                        <div className="my-2">
                          <Link
                            to={`/course-detail/${val.id}`}
                            className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                          >
                            Mulai Kelas
                          </Link>
                        </div>
                        {val.courseDiscountPrice || val.coursePrice ? (
                          <div className="my-2">
                            <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                              {val.courseDiscountPrice || val.coursePrice}
                            </button>
                          </div>
                        ) : (
                          <div className="my-2">
                            <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                              <span className="mr-2">
                                <Gem size={16} />
                              </span>
                              Premium
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                // <div
                //   key={val.id}
                //   className="w-full mt-3 my-2 bg-white shadow-xl rounded-xl overflow-hidden pb-3"
                // >
                //   <div className="flex flex-col">
                //     <img src={val.image} alt={val.name} className="w-full h-32 object-cover" />
                //     <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                //       <div className="flex justify-between items-center">
                //         <h1 className="text-color-primary font-bold text-sm lg:text-base">
                //           {val.courseName}
                //         </h1>
                //       </div>
                //       <p className="text-black text-sm font-semibold">
                //         Instruktor {val.user.fullName}
                //       </p>
                //       <div className="mt-3 flex justify-between flex-wrap">
                //         <p className="flex items-center text-xs font-semibold text-color-primary">
                //           <Shield size={18} className="mr-1" /> {val.courseLevel.levelName}
                //         </p>
                //         <p className="flex items-center text-xs font-semibold text-color-primary">
                //           <Book size={18} className="mr-1" /> {val._count.chapters}
                //         </p>
                //         <p className="flex items-center text-xs font-semibold text-color-primary">
                //           <Clock size={18} className="mr-1" /> {val.totalDuration} menit
                //         </p>
                //       </div>
                //       {/* <div className="my-2">
                //         <ProgressBar />
                //       </div> */}
                //       <div className="my-2">
                //         <Link
                //           to={`/course-detail/${val.id}`}
                //           className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                //         >
                //           Mulai Kelas
                //         </Link>
                //       </div>
                //       {val.courseDiscountPrice || val.coursePrice ? (
                //         <div className="my-2">
                //           <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                //             {val.courseDiscountPrice || val.coursePrice}
                //           </button>
                //         </div>
                //       ) : (
                //         <div className="my-2">
                //           <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                //             <span className="mr-2">
                //               <Gem size={16} />
                //             </span>
                //             Premium
                //           </button>
                //         </div>
                //       )}
                //     </div>
                //   </div>
                // </div>
              ))}
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

CardCourse.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardCourse;