import { Link, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
// import CardCategory from "../components/HomeComponent/cardCategory";
import CardCourse from "../components/HomeComponent/CardCourse";
import CardFree from "../components/HomeComponent/CardFree";
import imgSection from "../assets/bernadya.jpg";
import profilePic from "../assets/profil.png";
import { IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "../components/Footer";
import CardCategory from "../components/HomeComponent/CardCategory";
import { getAllCourse } from "../redux/actions/courseActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course); // Ambil data course dari Redux

  useEffect(() => {
    dispatch(getAllCourse()); // Mengambil data course saat komponen di-mount
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div className="w-full h-full  relative">
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
            <NavLink as={Link} to={"/topik-kelas"} className="mt-4 z-10">
              <button className="text-primary bg-white text-base font-semibold px-2 py-1 rounded-lg w-40 h-9 hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:hover:border-white lg:hover:border">
                IKUTI KELAS
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <CardCategory />
      <CardCourse title="Kelas Populer" course={courses} />

      <div className="w-full h-auto bg-primary flex justify-center items-center py-12 mt-20">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl px-6 lg:px-12">
          <div className="lg:w-1/2">
            <img src={imgSection} alt="Freelancer Section" className="w-full h-auto" />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0 lg:pl-12">
            <h2 className="text-white text-3xl font-semibold mb-4">
              Siap Membangun Karir Freelancer Profesional? <br /> Freelance Plus Solusinya
            </h2>
            <p className="text-white text-base mb-6">
              Kuasai strategi menjadi freelancer profesional untuk meningkatkan pendapatan secara
              langsung bersama para ahli berpengalaman.
            </p>
            <NavLink as={Link} to={"/freelance"} className="z-10">
              <button className="bg-white text-primary text-base font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-primary-dark transition duration-300">
                Daftar Sekarang
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <CardFree />
      <div className="w-full h-auto bg-gray-100 py-16 mt-10">
        <div className="max-w-3xl mx-auto bg-white px-6 lg:px-12 relative">
          <div className="flex flex-col  items-center lg:flex-row lg:items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <blockquote className="text-gray-700 py-10 px-4 text-justify text-md font-semibold">
                {`"Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged."`}
              </blockquote>
            </div>
            <div className="flex flex-col  items-center lg:justify-end lg:w-1/2 ">
              <img
                src={profilePic}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full mb-4 lg:mb-0 lg:mr-6"
              />
              <div>
                <h3 className="text-xl font-semibold">Muhamad Saman</h3>
                <p className="text-gray-500 ml-10">Mahasiswa</p>
              </div>
            </div>
            <div className="relative mt-10 lg:absolute -right-0 lg:-right-6 w-12 h-12 bg-neutral rounded-full">
              <IoIosArrowForward className="w-10 h-10 text-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;