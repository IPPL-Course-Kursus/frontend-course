import { useState, useRef, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Book, Clock, Gem, Shield } from "lucide-react";
import ProgressBar from "../MyCourse/ProgressBar";
import PropTypes from "prop-types";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getPopularCourse } from "../../redux/actions/courseActions";
import { getCategory } from "../../redux/actions/categoryActions";
import LoadSpinner from "../Spinner/LoadSpinner";

const CardCourse = ({ title = "Kelas Populer" }) => {
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const { popular } = useSelector((state) => state.course);
  const { category } = useSelector((state) => state.category);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleFilterClick = (categoryId) => {
    setSelectCategoryId(categoryId);
  };

  useEffect(() => {
    dispatch(getPopularCourse());
    dispatch(getCategory());
  }, [dispatch]);

  const filteredCoursePopular = selectCategoryId
    ? popular.filter((course) => course.categoryId === selectCategoryId)
    : popular;

  const NextArrow = useCallback(
    ({ onClick }) => (
      <div
        className="absolute lg:-right-8 hidden lg:block top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <IoIosArrowDroprightCircle size={30} className="text-color-primary" />
      </div>
    ),
    []
  );

  const PrevArrow = useCallback(
    ({ onClick }) => (
      <div
        className="absolute lg:-left-8 -left-4 hidden lg:block top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <IoIosArrowDropleftCircle size={30} className="text-color-primary" />
      </div>
    ),
    []
  );

  const categorySliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const courseSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="w-full max-w-[1680px] px-6 lg:px-20 flex flex-col gap-6 ">
          {/* Header Section */}
          <div className="flex justify-between w-full mt-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <NavLink
              to="/topik-kelas"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Lihat Semua
            </NavLink>
          </div>

          <div className="relative w-full">
            <Slider ref={sliderRef} {...categorySliderSettings}>
              <button
                onClick={() => handleFilterClick(null)} // Change to null for "All"
                className={`flex justify-center items-center border-2 rounded-lg text-sm font-semibold p-3 transition-colors duration-300 whitespace-nowrap ${
                  selectCategoryId === null
                    ? "mr-4 bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                } hover:bg-blue-500 hover:text-white cursor-pointer`}
              >
                All
              </button>
              {category.length > 0 &&
                category.map((kategori) => (
                  <div key={kategori.id} className="ml-0">
                    <div
                      className={`flex justify-center items-center border-2 rounded-lg text-sm font-semibold p-3 transition-colors duration-300 mx-2 whitespace-nowrap ${
                        selectCategoryId === kategori.id
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border-gray-300"
                      } hover:bg-blue-500 hover:text-white cursor-pointer`}
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

          {/* Course Cards Section */}
          <div className="mt-4">
            {Array.isArray(filteredCoursePopular) && filteredCoursePopular.length > 0 ? (
              selectCategoryId === null ? (
                <Slider {...courseSliderSettings}>
                  {filteredCoursePopular.map((val) => (
                    <div
                      key={val.id}
                      onClick={() => (window.location.href = `/course-detail/${val.id}`)}
                      className="p-2"
                    >
                      <div
                        className={`w-full bg-white shadow-xl rounded-xl overflow-hidden pb-3 h-full flex flex-col transition-all duration-300 hover:scale-105 ${
                          val.isPurchased ? "bg-green-50" : ""
                        }`}
                      >
                        <img
                          src={val.image}
                          alt={val.name}
                          className="w-full h-32 object-cover rounded-t-xl"
                        />
                        <div className="mx-2 md:mx-4 flex flex-col mt-2 md:mt-3 h-full">
                          <div className="flex justify-between items-center mb-2 flex-grow">
                            <h1
                              className={`font-bold text-sm lg:text-base truncate ${
                                val.isPurchased ? "text-gray-700" : "text-color-primary"
                              }`}
                            >
                              {val.courseName}
                            </h1>
                          </div>
                          <p className="text-gray-600 text-sm font-semibold flex-shrink-0">
                            Instruktor {val.user.fullName}
                          </p>
                          <div className="mt-3 flex justify-between flex-wrap text-xs font-semibold text-color-primary">
                            <p className="flex items-center">
                              <Shield size={18} className="mr-1" /> {val.courseLevel.levelName}
                            </p>
                            <p className="flex items-center">
                              <Book size={18} className="mr-1" /> {val._count.chapters} Chapter
                            </p>
                            <p className="flex items-center">
                              <Clock size={18} className="mr-1" /> {val.totalDuration} menit
                            </p>
                          </div>
                          {/* Course Progress or Action Buttons */}
                          {val.isPurchased ? (
                            <div className="my-2 flex-grow">
                              <ProgressBar />
                              <div className="my-2">
                                <button className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs">
                                  Mulai Kelas
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="my-2">
                              <div className="flex items-center">
                                {val.coursePrice > 0 ? (
                                  <>
                                    <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs flex items-center justify-center mr-2">
                                      {formatCurrency(val.coursePrice)}
                                    </button>
                                    <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs flex items-center justify-center mr-2">
                                      <Gem size={16} className="mr-2" /> Premium
                                    </button>
                                  </>
                                ) : (
                                  <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs flex items-center justify-center mr-2">
                                    <Gem size={16} className="mr-2" /> Free
                                  </button>
                                )}
                              </div>
                              <div className="my-2">
                                <button className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs">
                                  Lihat Kelas
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                // Tampilan grid untuk kategori yang dipilih
                <div className="flex mt-2 overflow-x-auto space-x-4">
                  {filteredCoursePopular.map((val) => (
                    <div key={val.id} className="p-2">
                      <div
                        className={`w-72 bg-white shadow-xl rounded-xl overflow-hidden pb-3 h-full flex flex-col ${
                          val.isPurchased ? "bg-green-50" : ""
                        }`}
                      >
                        <img
                          src={val.image}
                          alt={val.name}
                          className="w-full h-40 object-cover rounded-t-xl"
                        />
                        <div className="mx-2 md:mx-4 flex flex-col mt-2 md:mt-3 h-full">
                          <div className="flex justify-between items-center mb-2 flex-grow">
                            <h1
                              className={`font-bold text-sm lg:text-base truncate ${
                                val.isPurchased ? "text-gray-700" : "text-color-primary"
                              }`}
                            >
                              {val.courseName}
                            </h1>
                          </div>
                          <p className="text-gray-600 text-sm font-semibold flex-shrink-0">
                            Instruktor {val.user.fullName}
                          </p>
                          <div className="mt-3 flex justify-between flex-wrap text-xs font-semibold text-color-primary">
                            <p className="flex items-center">
                              <Shield size={18} className="mr-1" /> {val.courseLevel.levelName}
                            </p>
                            <p className="flex items-center">
                              <Book size={18} className="mr-1" /> {val._count.chapters} Chapter
                            </p>
                            <p className="flex items-center">
                              <Clock size={18} className="mr-1" /> {val.totalDuration} Menit
                            </p>
                          </div>
                          {/* Course Progress or Action Buttons */}
                          {val.isPurchased ? (
                            <div className="my-2 flex-grow">
                              <ProgressBar />
                              <div className="my-2">
                                <Link
                                  to={`/course-detail/${val.id}`}
                                  className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                                >
                                  Mulai Kelas
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="my-2">
                              <div className="flex items-center">
                                {val.coursePrice > 0 ? (
                                  <>
                                    <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center mr-2">
                                      {formatCurrency(val.coursePrice)}
                                    </button>
                                    <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center mr-2">
                                      <Gem size={16} className="mr-2" /> Premium
                                    </button>
                                  </>
                                ) : (
                                  <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center mr-2">
                                    <Gem size={16} className="mr-2" /> Free
                                  </button>
                                )}
                              </div>
                              <div className="my-2">
                                <button className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105">
                                  Lihat Kelas
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="flex justify-center items-center h-32">
                <LoadSpinner size={80} color="blue" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

CardCourse.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardCourse;
