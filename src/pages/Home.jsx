import {
  Link,
  NavLink,
  // NavLink
} from "react-router-dom";
import CardCategory from "../components/HomeComponent/cardCategory";
import CardCourse from "../components/HomeComponent/CardCourse";

const Home = () => {
  return (
    <>
      <div
        className="w-full h-full pt-[74px] relative"
        // ref={linkRef}
      >
        <img
          // src="https://images.unsplash.com/photo-1645947091786-4399f228f5f0?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          src="/people_dashboard.png"
          alt="picture"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="flex flex-col lg:flex lg:flex-row lg:items-start lg:pt-24 lg:justify-between pt-16 pl-10 bg-gradient-to-r from-color-primary h-80 lg:px-40 lg:bg-gradient-to-l">
          <div className="flex flex-col">
            <div>
              <h1 className="font-semibold text-white sm:text-xl lg:text-3xl ">
                Belajar Tanpa Batas & <br />
                Jadilah Talenta Digital Handal <br /> Praktisi Terbaik!
              </h1>
              <p className="hidden lg:block lg:absolute lg:text-4xl lg:top-[155px] lg:left-[280px] animate-pulse"></p>
            </div>
            <NavLink as={Link} to={"/course"} className="mt-4 z-10">
              <button className=" text-color-primary bg-white text-base font-semibold px-2 py-1 rounded-lg w-40 h-9 hover:scale-110 hover:bg-primary hover:text-white duration-300 lg:hover:border-white lg:hover:border">
                IKUTI KELAS
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      <CardCategory />
      <CardCourse />
    </>
  );
};

export default Home;
