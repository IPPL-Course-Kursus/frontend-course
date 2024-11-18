import { Link, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardCourse from "../components/HomeComponent/CardCourse";
import CardFree from "../components/HomeComponent/CardFree";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "../components/Footer";
import CardCategory from "../components/HomeComponent/CardCategory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFreeCourse, getPopularCourse } from "../redux/actions/courseActions";
import { getCategory } from "../redux/actions/categoryActions";
import Content from "../components/HomeComponent/Content";
import Cookies from "js-cookie"; // Menggunakan js-cookie untuk mengambil token

const Home = () => {
  const dispatch = useDispatch();
  const { popular } = useSelector((state) => state.course);
  const { free } = useSelector((state) => state.course);
  const { category } = useSelector((state) => state.category);

  // State untuk memeriksa apakah user sudah login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Mendapatkan token dari cookies
    const token = Cookies.get("token"); // Mengambil token dari cookies
    if (token) {
      setIsLoggedIn(true); // Jika token ada, set isLoggedIn menjadi true
    }

    // Mengambil data course dan category
    dispatch(getPopularCourse());
    dispatch(getFreeCourse());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="w-full h-full relative">
        <img
          src="/people_dasboard.png"
          alt="picture"
          className="w-full h-full object-cover absolute -z-50"
        />
        <div className="absolute w-full h-full bg-gradient-to-r from-primary via-primary to-transparent opacity-75" />

        <div className="flex flex-col lg:flex-row lg:items-start lg:pt-24 lg:justify-between pt-16 pl-10 h-80 lg:px-40 relative z-10">
          <div className="flex flex-col">
            <div>
              <h1 className="font-semibold text-white sm:text-xl lg:text-3xl">
                Belajar Tanpa Batas & <br />
                Jadilah Talenta Digital Handal <br /> Praktisi Terbaik!
              </h1>
              <p className="hidden lg:block lg:absolute lg:text-4xl lg:top-[155px] lg:left-[280px] animate-pulse"></p>
            </div>
            {/* Tombol yang berubah jika sudah login */}
            <NavLink as={Link} to={isLoggedIn ? "/topik-kelas" : "/login"} className="mt-4 z-10">
              <button className="text-primary bg-white text-base font-semibold px-2 py-1 rounded-lg w-40 h-9 hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:hover:border-white lg:hover:border">
                {isLoggedIn ? "Mulai Belajar" : "IKUTI KELAS"}
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <CardCategory category={category} />
      <CardCourse title="Kelas Populer" popular={popular} />

      <div className="w-full h-auto bg-primary flex justify-center items-center py-12 mt-20">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl px-6 lg:px-12">
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1506878206813-92402b8ded23?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Freelancer Section"
              className="w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 mt-6 lg:mt-0 lg:pl-12 text-center lg:text-left">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Siap Membangun Karir Freelancer Profesional? <br /> Freelance Plus Solusinya
            </h2>
            <p className="text-white text-base mb-6 text-justify lg:text-left">
              Kuasai strategi menjadi freelancer profesional untuk meningkatkan pendapatan secara
              langsung bersama para ahli berpengalaman.
            </p>
            {/* Tombol "Mulai Belajar" berubah jika sudah login */}
            <NavLink as={Link} to={isLoggedIn ? "/topik-kelas" : "/login"} className="z-10">
              <button className="bg-white text-primary text-base font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-primary-dark transition duration-300">
                {isLoggedIn ? "Mulai Belajar" : "Daftar Sekarang"}
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      <CardFree title="Kursus Gratis" free={free} />
      <Content />
      <Footer />
    </>
  );
};

export default Home;
