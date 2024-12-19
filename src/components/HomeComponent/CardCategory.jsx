import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCategory } from "../../redux/actions/categoryActions";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardCategory = () => {
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector((state) => state.category);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden sm:block">
      <IoIosArrowDroprightCircle size={30} className="text-color-primary" onClick={onClick} />
    </div>
  );

  // Custom Prev Arrow
  const PrevArrow = ({ onClick }) => (
    <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden sm:block">
      <IoIosArrowDropleftCircle size={30} className="text-color-primary" onClick={onClick} />
    </div>
  );

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 9,
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
          nextArrow: null,
          prevArrow: null,
        },
      },
    ],
  };

  // Skeleton component
  const SkeletonCategory = () => (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-200 rounded-lg shadow-lg border border-gray-300 animate-pulse mr-4">
      <div className="w-[140px] h-[100px] bg-gray-300 rounded-lg"></div>
      <div className="w-[100px] h-4 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1680px] px-6 lg:px-20 flex flex-col gap-8">
        <div className="flex justify-between items-center w-full mt-10">
          <h2 className="text-2xl font-bold text-gray-800">Kategori Belajar</h2>
          <NavLink
            to="/topik-kelas"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Lihat Semua
          </NavLink>
        </div>

        <div className="relative w-full">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Slider ref={sliderRef} {...sliderSettings}>
              {category.length > 0
                ? category.map((kategori, i) => (
                    <NavLink
                      key={i}
                      to={`/topik-kelas?category=${kategori.categoryName}`}
                      className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-200 mr-4"
                      style={{ outline: "none" }}
                    >
                      <img
                        src={kategori.image}
                        alt={kategori.categoryName}
                        className="aspect-video w-[140px] h-[100px] object-cover rounded-lg shadow-md"
                      />
                      <div className="text-center text-sm font-medium text-gray-700 truncate max-w-[140px] mt-2">
                        {kategori.categoryName}
                      </div>
                    </NavLink>
                  ))
                : Array.from({ length: 9 }).map((_, index) => <SkeletonCategory key={index} />)}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

CardCategory.propTypes = {
  onClick: PropTypes.func,
};

export default CardCategory;
