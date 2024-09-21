import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { Book, Clock, Gem, Shield } from "lucide-react";
import ProgressBar from "../MyCourse/ProgressBar";
// import ProgressBar from "../MyCourseComponent/ProgressBar";

const CardCourse = () => {
  const [selectCategoryId, setSelectCategoryId] = useState(null);

  const dataKategoriPopularName = [
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
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: " Saman",
      img: "https://indi.tech/wp-content/uploads/2022/03/Screenshot-2022-03-24-223956.png",
    },
    {
      id: 2,
      name: "Product Manager",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: "Rajab",
      img: "https://media.licdn.com/dms/image/C5612AQEuWqyxzjrVYw/article-cover_image-shrink_720_1280/0/1588225642197?e=2147483647&v=beta&t=C_GHDsCbI-fy7-ishvy9FGJGHHqX-vfeZZm7Xe6DQgs",
    },
    {
      id: 3,
      name: "Web Development",
      overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
      instruktur: " Lana",
      img: "https://niagaspace.sgp1.digitaloceanspaces.com/blog/wp-content/uploads/2023/04/03075503/salah-satu-langkah-dalam-cara-menjadi-web-developer-adalah-mempelajari-bahasa-untuk-coding-1024x792.webp",
    },
  //   {
  //     id: 4,
  //     name: "Android Development",
  //     overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  //     instruktur: "Alim",
  //     img: "https://developer.android.com/static/images/social/android-developers.png?hl=id",
  //   },
  //   {
  //     id: 5,
  //     name: "iOS Development",
  //     overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  //     instruktur: "Rywota",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjg9e0Catb89J5lz6qcpVGmISSa-3ITiJKaA&s",
  //   },
  //   {
  //     id: 6,
  //     name: "Data Science",
  //     overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  //     instruktur: "Alex",
  //     img: "https://www.solulab.com/wp-content/uploads/2024/09/Data-Science-Development-Company.jpg",
  //   },
  //   {
  //     id: 7,
  //     name: "Machine Learning",
  //     overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  //     instruktur: "Helmi",
  //     img: "https://itbox.id/wp-content/uploads/2023/03/Machine-Learning.jpeg",
  //   },
  //   {
  //     id: 8,
  //     name: "Cybersecurity",
  //     overview: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  //     instruktur: "Arwin",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsh3n29Iw5iVmWbLRoDJPkilEDOlJks8JNMg&s",
  //   },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
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
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center max-w-[1060px] container gap-5 pt-[26px] pb-[53px]">
          {/* Header Section */}
          <div className="flex justify-between w-full px-6">
            <h2 className="text-2xl font-bold text-gray-800">Kelas Populer</h2>
            <Link to="/class" className="text-sm font-semibold text-blue-600 hover:underline">
              Lihat Semua
            </Link>
          </div>

          {/* Slider Section */}
          <div className="w-full">
            <Slider {...settings}>
              {/* Dynamic Categories */}
              {dataKategoriPopularName.map((kategori) => (
                <div key={kategori.id}>
                  <div
                    className={`flex justify-center items-center border-2 rounded-lg text-sm font-semibold p-3 transition-colors duration-300 mx-2 whitespace-nowrap ${
                      selectCategoryId === kategori.id
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                    } hover:bg-blue-500 hover:text-white cursor-pointer`}
                    onClick={() => setSelectCategoryId(kategori.id)}
                  >
                    {kategori.name}
                  </div>
                </div>
              ))}
            </Slider>
            {/* ALL Category */}
            <button
              //   onClick={() => setItems(Data)}
              className="w-full mt-2 lg:mt-4 text-xs font-medium border-none text-white bg-slate-600 cursor-pointer py-2 px-2 rounded-lg 
                           hover:scale-105 duration-300 hover:bg-blue-500 hover:text-white lg:font-semibold"
            >
              All
            </button>
          </div>
        </div>
      </div>
      {/* CARD */}
      <div className="max-w-screen-lg mx-auto px-6 lg:p-0">
        <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:mt-">
          {dataKategoriPopular.map((val) => (
            <div
              key={val.id}
              className="w-full mt-3 my-2 bg-white shadow-xl rounded-xl overflow-hidden pb-3">
              <div className="flex flex-col">
                <div>
                  <img
                    src={val.img}
                    alt="ayam"
                    className="overflow-hidden w-full h-28 object-cover"
                  />
                </div>
                <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                      {val.name}
                    </h1>
                    <p className="flex items-center font-semibold">
                      <span className="mr-1 lg:mr-2">
                        <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" />
                      </span>
                      4.8
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-black font-semibold text-sm lg:text-base -tracking-widest md:-tracking-wider">
                      {val.overview}
                    </h3>
                    <p className="text-black text-sm font-semibold">Instruktor {val.instruktur}</p>
                    <div className="mt-3 flex justify-between flex-wrap">
                      <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider">
                        <span className="text-green-500 mr-[2.5px]">
                          <Shield size={18} />
                        </span>{" "}
                        Intermediate Level
                      </p>
                      <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                        <span className="text-green-500 mr-[2.5px]">
                          <Book size={18} />
                        </span>{" "}
                        10 Modul
                      </p>
                      <p className="flex items-center text-color-primary text-xs font-semibold -tracking-widest md:-tracking-wider ">
                        <span className="text-green-500 mr-[2.5px]">
                          <Clock size={18} />
                        </span>{" "}
                        90 Menit
                      </p>
                    </div>
                    {/* ini button ketika sudah beli */}
                    <div className="my-2">
                      <ProgressBar />
                    </div>
                    {/* Ini button ketika gratis */}
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
                        Premiun
                      </button>
                    </div>
                    {/* button ketika mau beli (ada harganya) */}
                    <div className="my-2">
                      <button className="py-1 px-4 bg-blue-400  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 items-center flex justify-between">
                        Rp. 100.000
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
        </div>
      </div>
    </>
  );
};

export default CardCourse;
