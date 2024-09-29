import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Book, Clock, Gem, Shield } from "lucide-react";
import ProgressBar from "../MyCourse/ProgressBar";
import PropTypes from "prop-types";

const CardRecommended = ({ title = "Kelas rekomendasi" }) => {
  const dataKategoriRekomendasi = [
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
      instruktur: "Lana",
      price: "Rp. 200.000",
      img: "https://niagaspace.sgp1.digitaloceanspaces.com/blog/wp-content/uploads/2023/04/03075503/salah-satu-langkah-dalam-cara-menjadi-web-developer-adalah-mempelajari-bahasa-untuk-coding-1024x792.webp",
    },
  ];

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

          {/* Card Course Section */}
          <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:mt-4">
            {dataKategoriRekomendasi.map((val) => (
              <div key={val.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
                <img src={val.img} alt={val.name} className="w-full h-28 object-cover" />
                <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                  
                  <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                    {val.name}
                  </h1>
                  <p className="text-sm text-gray-600">{val.overview}</p>
                  <div className="flex justify-between items-center my-2">
                    <p className="text-black text-sm font-semibold">Instruktor {val.instruktur}</p>
                    <p className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" /> 4.8
                    </p>
                  </div>
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
                  <div className="flex left-0 mt-2 my-2">
                    <Link
                      to="/detail-kelas"
                      className="py-1 px-4 bg-primary  text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                    >
                      Beli {val.price}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

CardRecommended.propTypes = {
  title: PropTypes.string,
};

export default CardRecommended;
