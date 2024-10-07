import { useState, useRef } from "react";
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

const CardCourse = ({ title = "Kelas Populer" }) => {
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const sliderRef = useRef(null);

  const dataKategoriPopularName = [
    { id: null, name: "All" },
    { id: 1, name: "UI/UX Design" },
    { id: 2, name: "Product Manager" },
    { id: 3, name: "Web Development" },
    { id: 4, name: "Android Development" },
    { id: 5, name: "iOS Development" },
    { id: 6, name: "Data Science" },
    { id: 7, name: "Machine Learning" },
    { id: 8, name: "Cybersecurity" },
  ];

  const dataKategoriPopular = [
    {
      id: 1,
      name: "UI/UX Design",
      overview: "Belajar Web Designer dengan Figma",
      instruktur: "Saman",
      price: "Rp. 200.000",
      img: "https://indi.tech/wp-content/uploads/2022/03/Screenshot-2022-03-24-223956.png",
    },
    {
      id: 2,
      name: "Product Manager",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Rajab",
      price: "Rp. 200.000",
      img: "https://media.licdn.com/dms/image/C5612AQEuWqyxzjrVYw/article-cover_image-shrink_720_1280/0/1588225642197?e=2147483647&v=beta&t=C_GHDsCbI-fy7-ishvy9FGJGHHqX-vfeZZm7Xe6DQgs",
    },
    {
      id: 3,
      name: "Web Development",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: " Lana",
      price: "Rp. 200.000",
      img: "https://niagaspace.sgp1.digitaloceanspaces.com/blog/wp-content/uploads/2023/04/03075503/salah-satu-langkah-dalam-cara-menjadi-web-developer-adalah-mempelajari-bahasa-untuk-coding-1024x792.webp",
    },
    {
      id: 4,
      name: "Android Development",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Aaalim",
      price: "Rp. 200.000",
      img: "https://developer.android.com/static/images/social/android-developers.png?hl=id",
    },
    {
      id: 4,
      name: "Android Development",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Alim",
      price: "Rp. 200.000",
      img: "https://developer.android.com/static/images/social/android-developers.png?hl=id",
    },
    {
      id: 4,
      name: "Android Development",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Alim",
      price: "Rp. 200.000",
      img: "https://developer.android.com/static/images/social/android-developers.png?hl=id",
    },
    {
      id: 4,
      name: "Android Development",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Aalim",
      price: "Rp. 200.000",
      img: "https://developer.android.com/static/images/social/android-developers.png?hl=id",
    },
    {
      id: 7,
      name: "iOS Development",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Ricky",
      price: "Rp. 200.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjg9e0Catb89J5lz6qcpVGmISSa-3ITiJKaA&s",
    },
    {
      id: 8,
      name: "Data Science",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Alex",
      price: "Rp. 200.000",
      img: "https://www.solulab.com/wp-content/uploads/2024/09/Data-Science-Development-Company.jpg",
    },
    {
      id: 9,
      name: "Machine Learning",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Helmi",
      price: "Free",
      img: "https://itbox.id/wp-content/uploads/2023/03/Machine-Learning.jpeg",
    },
    {
      id: 10,
      name: "Cybersecurity",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Arwin",
      price: "Rp. 200.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsh3n29Iw5iVmWbLRoDJPkilEDOlJks8JNMg&s",
    },
  ];

  // Filter courses by selected category
  const filteredCourses = selectCategoryId
    ? dataKategoriPopular.filter((course) => course.id === selectCategoryId)
    : dataKategoriPopular;

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
              {dataKategoriPopularName.map((kategori) => (
                <div key={kategori.id}>
                  <div
                    className={`flex justify-center items-center border-2 rounded-lg text-sm font-semibold p-3 transition-colors duration-300 mx-2 whitespace-nowrap ${
                      selectCategoryId === kategori.id
                        ? "bg-color-primary text-white bg-primary"
                        : "bg-white text-gray-700 border-gray-300"
                    } hover:bg-primary hover:text-white cursor-pointer`}
                    onClick={() => setSelectCategoryId(kategori.id)}
                  >
                    {kategori.name}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Card Course Section */}
      <div className="max-w-screen-lg mx-auto px-6 lg:p-0">
        {selectCategoryId === null ? (
          <Slider {...courseSliderSettings}>
            {filteredCourses.map((val) => (
              <div key={val.id} className="p-2">
                <div className="w-full bg-white shadow-xl rounded-xl overflow-hidden pb-3">
                  <div className="flex flex-col">
                    <img src={val.img} alt={val.name} className="w-full h-28 object-cover" />
                    <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                      <div className="flex justify-between items-center">
                        <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                          {val.name}
                        </h1>
                        <p className="flex items-center font-semibold">
                          <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" /> 4.8
                        </p>
                      </div>
                      <h3 className="text-black font-semibold text-sm lg:text-base">
                        {val.overview}
                      </h3>
                      <p className="text-black text-sm font-semibold">
                        Instruktor {val.instruktur}
                      </p>
                      <div className="mt-3 flex justify-between flex-wrap">
                        <p className="flex items-center text-xs font-semibold text-color-primary">
                          <Shield size={18} className="mr-1" /> Intermediate Level
                        </p>
                        <p className="flex items-center text-xs font-semibold text-color-primary">
                          <Book size={18} className="mr-1" /> 10 Modul
                        </p>
                        <p className="flex items-center text-xs font-semibold text-color-primary">
                          <Clock size={18} className="mr-1" /> 90 Menit
                        </p>
                      </div>
                      <div className="my-2">
                        <ProgressBar />
                      </div>
                      <div className="my-2">
                        <Link
                          to="/detail-kelas"
                          className="py-1 px-4 bg-black  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                        >
                          Mulai Kelas
                        </Link>
                      </div>
                      {/* ini button ketika premium dan belum beli */}
                      <div className="my-2">
                        <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                          <span className="mr-2">
                            <Gem size={16} />
                          </span>{" "}
                          Premium
                        </button>
                      </div>
                      {/* button ketika mau beli (ada harganya) */}
                      <div className="my-2">
                        <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                          {val.price}
                        </button>
                      </div>
                      {/* Ini untuk riwayat dan status bayarnya belum bayar */}
                      <div className="my-2">
                        <button className="py-1 px-4 bg-red-500  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                          <span className="mr-2">
                            <Gem size={16} />
                          </span>{" "}
                          Waiting for payment
                        </button>
                      </div>
                      {/* Ini untuk riwayat dan status bayarnya udah bayar */}
                      <div className="my-2">
                        <button className="py-1 px-4 bg-green-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                          <span className="mr-2">
                            <Gem size={16} />
                          </span>{" "}
                          Paid
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          ) : filteredCourses.length > 3 ? ( // Menggunakan slider jika lebih dari 3 course
            <Slider {...courseSliderSettings}>
              {filteredCourses.map((val) => (
              <div key={val.id} className="p-2">
              <div className="w-full bg-white shadow-xl rounded-xl overflow-hidden pb-3">
                <div className="flex flex-col">
                  <img src={val.img} alt={val.name} className="w-full h-28 object-cover" />
                  <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                    <div className="flex justify-between items-center">
                      <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                        {val.name}
                      </h1>
                      <p className="flex items-center font-semibold">
                        <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" /> 4.8
                      </p>
                    </div>
                    <h3 className="text-black font-semibold text-sm lg:text-base">
                      {val.overview}
                    </h3>
                    <p className="text-black text-sm font-semibold">
                      Instruktor {val.instruktur}
                    </p>
                    <div className="mt-3 flex justify-between flex-wrap">
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Shield size={18} className="mr-1" /> Intermediate Level
                      </p>
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Book size={18} className="mr-1" /> 10 Modul
                      </p>
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Clock size={18} className="mr-1" /> 90 Menit
                      </p>
                    </div>
                    <div className="my-2">
                      <ProgressBar />
                    </div>
                    <div className="my-2">
                      <Link
                        to="/detail-kelas"
                        className="py-1 px-4 bg-black  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                      >
                        Mulai Kelas
                      </Link>
                    </div>
                    {/* ini button ketika premium dan belum beli */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        <span className="mr-2">
                          <Gem size={16} />
                        </span>{" "}
                        Premium
                      </button>
                    </div>
                    {/* button ketika mau beli (ada harganya) */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        {val.price}
                      </button>
                    </div>
                    {/* Ini untuk riwayat dan status bayarnya belum bayar */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-red-500  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        <span className="mr-2">
                          <Gem size={16} />
                        </span>{" "}
                        Waiting for payment
                      </button>
                    </div>
                    {/* Ini untuk riwayat dan status bayarnya udah bayar */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-green-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        <span className="mr-2">
                          <Gem size={16} />
                        </span>{" "}
                        Paid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              ))}
            </Slider>
        ) : (
          <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:mt-4">
            {filteredCourses.map((val) => (
              <div
                key={val.id}
                className="w-full mt-3 my-2 bg-white shadow-xl rounded-xl overflow-hidden pb-3"
              >
                <div className="flex flex-col">
                  <img src={val.img} alt={val.name} className="w-full h-28 object-cover" />
                  <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                    <div className="flex justify-between items-center">
                      <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                        {val.name}
                      </h1>
                      <p className="flex items-center font-semibold">
                        <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" /> 4.8
                      </p>
                    </div>
                    <h3 className="text-black font-semibold text-sm lg:text-base">
                      {val.overview}
                    </h3>
                    <p className="text-black text-sm font-semibold">Instruktor {val.instruktur}</p>
                    <div className="mt-3 flex justify-between flex-wrap">
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Shield size={18} className="mr-1" /> Intermediate Level
                      </p>
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Book size={18} className="mr-1" /> 10 Modul
                      </p>
                      <p className="flex items-center text-xs font-semibold text-color-primary">
                        <Clock size={18} className="mr-1" /> 90 Menit
                      </p>
                    </div>
                    <div className="my-2">
                      <ProgressBar />
                    </div>
                    <div className="my-2">
                      <button className="py-1 px-4 bg-black  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105">
                        Mulai Kelas
                      </button>
                    </div>
                    {/* ini button ketika premium dan belum beli */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        <span className="mr-2">
                          <Gem size={16} />
                        </span>{" "}
                        Premium
                      </button>
                    </div>
                    {/* button ketika mau beli (ada harganya) */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        {val.price}
                      </button>
                    </div>
                    {/* Ini untuk riwayat dan status bayarnya belum bayar */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-red-500  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        <span className="mr-2">
                          <Gem size={16} />
                        </span>{" "}
                        Waiting for payment
                      </button>
                    </div>
                    {/* Ini untuk riwayat dan status bayarnya udah bayar */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-green-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        <span className="mr-2">
                          <Gem size={16} />
                        </span>{" "}
                        Paid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

CardCourse.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardCourse;
