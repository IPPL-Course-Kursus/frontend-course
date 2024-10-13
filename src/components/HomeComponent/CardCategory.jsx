import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
      <IoIosArrowDroprightCircle size={30} className="text-color-primary" onClick={onClick} />
    </div>
  );

  // Custom Prev Arrow
  const PrevArrow = ({ onClick }) => (
    <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 cursor-pointer z-10">
      <IoIosArrowDropleftCircle size={30} className="text-color-primary" onClick={onClick} />
    </div>
  );

  // Slider settings
  const sliderSettings = {
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

  return (
    <div className="flex justify-center mt-20">
      <div className="flex w-full justify-center items-center max-w-[1060px] flex-col pt-[26px] pb-[14px] gap-5 container">
      <div className="flex justify-between w-full px-6">
            <h2 className="text-2xl font-bold text-gray-800"></h2>
            <Link to="/class" className="text-sm font-semibold text-blue-600 hover:underline">
              Lihat Semua
            </Link>
          </div>

        <div className="relative w-full px-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Slider ref={sliderRef} {...sliderSettings}>
              {category.map((kategori, i) => (
                <div key={i} className="justify-center items-center flex flex-col pl-1.5 pr-2.5">
                  <img
                    src={kategori.image}
                    className="aspect-[1.6] object-cover object-center w-[140px] rounded-xl shadow-md hover:cursor-pointer"
                  />
                  <div className="text-black text-center text-xs font-semibold leading-9 whitespace-nowrap">
                    {kategori.categoryName}
                  </div>
                </div>
              ))}
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
