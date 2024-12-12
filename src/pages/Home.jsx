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
      <div className="relative w-full h-full animate-fade-in-up">
        {/* Background Image with Parallax Effect and Blur */}
        <img
          src="/learn.jpg"
          alt="learning"
          className="absolute inset-0 w-full h-full object-cover -z-10 transform transition-all duration-1000 ease-in-out parallax-blur"
        />

        {/* Gradient Overlay with Elegant Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent opacity-80 animate-gradient-background" />

        {/* Content Wrapper with Delay Animation */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-40 text-center lg:text-left space-y-6 lg:space-y-0 opacity-0 animate-fade-in-up delay-200">
          {/* Left Side: Text Content with Elegant Slide-up and Rotation */}
          <div className="flex flex-col max-w-lg space-y-6 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight opacity-0 transform translate-y-10 rotate-[-5deg] transition duration-700 ease-out animate-slide-up delay-300">
              Belajar Tanpa Batas, <br />
              Jadilah Talenta Digital Handal!
            </h1>
            <p className="text-sm sm:text-base opacity-0 transform translate-y-10 transition duration-700 ease-out animate-slide-up delay-400">
              Tingkatkan keterampilanmu dengan pelatihan digital yang fleksibel dan dapat diakses
              kapan saja.
            </p>

            {/* Button Section with Pulse Animation */}
            <div className="mt-6 opacity-0 transform translate-y-10 transition duration-700 ease-out animate-slide-up delay-500">
              <NavLink to={isLoggedIn ? "/topik-kelas" : "/login"}>
                <button className="bg-white text-primary font-semibold text-base px-6 py-2 rounded-lg shadow-xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:translate-y-1 animate-pulse">
                  {isLoggedIn ? "Mulai Belajar" : "IKUTI KELAS"}
                </button>
              </NavLink>
            </div>
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
              className="w-full h-auto rounded-md"
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
