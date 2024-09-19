// // import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// // import Slider from "react-slick";

// const CardCategory = () => {
//   const dataKategori = [
//     {
//       img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "UI/UX Design",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "Product Manager",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "Web Development",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1612442443556-09b5b309e637?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "Andorid Development",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "IOS Development",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "Data Science",
//     },
//   ];
//   return (
//     <>
      // <div className="flex justify-center bg-[#EBF3FC] mt-20 ">
      //   <div className="flex w-full justify-center items-center max-w-[1060px] flex-col pt-[26px] pb-[14px] gap-5 container">
      //     <div className="flex justify-between container px-6">
      //       <h2 className="text-xl font-bold">Kategori Belajar</h2>
      //       <Link to="/class" className=" font-extrabold text-xs max-w-fit text-darkblue">
      //         Lihat Semua
      //       </Link>
//           </div>
//           <div className="flex flex-col max-w-[1200px] px-6">
//             <div className="flex justify-start flex-wrap grow gap-2.5">
//               {dataKategori.map((kategori, i) => (
//                 <div
//                   key={i}
//                   className="justify-center items-center flex grow flex-col pl-1.5 pr-2.5 hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
//                 >
//                   <img
//                     src={kategori.img}
//                     // title={kategori.title}
//                     className="aspect-[1.6] object-cover object-center w-[140px] rounded-xl shadow-md hover:cursor-pointer"
//                   />
//                   <div className="text-black text-center text-xs font-semibold leading-9 whitespace-nowrap">
//                     {kategori.title}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CardCategory;

import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardCategory = () => {
  const dataKategori = [
    {
      img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "UI/UX Design",
    },
    {
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Product Manager",
    },
    {
      img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Web Development",
    },
    {
      img: "https://images.unsplash.com/photo-1612442443556-09b5b309e637?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Android Development",
    },
    {
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "iOS Development",
    },
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Data Science",
    },
    {
      img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Web Development",
    },
    {
      img: "https://images.unsplash.com/photo-1612442443556-09b5b309e637?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Android Development",
    },
    {
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "iOS Development",
    },
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Data Science",
    },
    // Tambahkan lebih banyak data jika diperlukan
  ];

  // Pengaturan slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex justify-center bg-white py-10 mt-20">
        <div className="max-w-[1200px] w-full flex flex-col gap-6">
          <div className="flex justify-between px-6 items-center">
            <h2 className="text-2xl font-bold text-gray-700">Kategori Belajar</h2>
            <Link to="/class" className="text-sm font-extrabold text-darkblue hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="px-6">
            {dataKategori.length > 5 ? (
              // Tampilkan slider jika lebih dari 5 kategori
              <Slider {...settings}>
                {dataKategori.map((kategori, i) => (
                  <div key={i} className="px-2">
                    <div className="flex flex-col items-center p-3 bg-[#EBF3FC] shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={kategori.img}
                        alt={kategori.title}
                        className="w-full h-[160px] object-cover rounded-lg mb-3 transition-transform duration-300 transform hover:scale-105"
                      />
                      <h3 className="text-center text-sm font-semibold text-gray-700">
                        {kategori.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              // Jika 5 atau kurang, tampilkan grid biasa
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {dataKategori.map((kategori, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-3 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={kategori.img}
                      alt={kategori.title}
                      className="w-full h-[160px] object-cover rounded-lg mb-3 transition-transform duration-300 transform hover:scale-105"
                    />
                    <h3 className="text-center text-sm font-semibold text-gray-700">
                      {kategori.title}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCategory;
