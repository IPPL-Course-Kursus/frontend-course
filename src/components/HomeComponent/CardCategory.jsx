
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategory } from "../../redux/actions/categoryActions";
import { useEffect } from "react";
// import Slider from "react-slick";

const CardCategory = () => {
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    // Kirim ke reducer untuk mengambil data yang ada di redux
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-center  mt-20 ">
        <div className="flex w-full justify-center items-center max-w-[1060px] flex-col pt-[26px] pb-[14px] gap-5 container">
          <div className="flex justify-between container px-6">
            <h2 className="text-xl font-bold">Kategori Belajar</h2>
            <Link to="/class" className=" font-extrabold text-xs max-w-fit text-darkblue">
              Lihat Semua
            </Link>
          </div>
          <div className="flex flex-col max-w-[1200px] px-6">
            <div className="flex justify-start flex-wrap grow gap-2.5">
              {/* {category.map((kategori, i) => (
                <div
                  key={i}
                  className="justify-center items-center flex grow flex-col pl-1.5 pr-2.5 hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
                >
                  <img
                    src={kategori.image}
                    // title={kategori.title}
                    className="aspect-[1.6] object-cover object-center w-[140px] rounded-xl shadow-md hover:cursor-pointer"
                  />
                  <div className="text-black text-center text-xs font-semibold leading-9 whitespace-nowrap">
                    {kategori.title}
                  </div>
                </div>
              ))} */}
              {loading ? (
                <p>Loading...</p> // Tampilkan pesan loading saat data sedang diambil
              ) : error ? (
                <p>Error: {error}</p> // Tampilkan pesan error jika terjadi masalah
              ) : (
                category.map((kategori, i) => (
                  <div
                    key={i}
                    className="justify-center items-center flex grow flex-col pl-1.5 pr-2.5 hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
                  >
                    <img
                      src={kategori.image}
                      // title={kategori.title}
                      className="aspect-[1.6] object-cover object-center w-[140px] rounded-xl shadow-md hover:cursor-pointer"
                    />
                    <div className="text-black text-center text-xs font-semibold leading-9 whitespace-nowrap">
                      {kategori.categoryName}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCategory;

// import PropTypes from "prop-types";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { getCategory } from "../../redux/actions/categoryActions";
// // import Slider from "react-slick";

// const CardCategory = () => {
//   const dispatch = useDispatch();

//   // Mengambil kategori dari Redux store
//   const { category, loading, error } = useSelector((state) => state.category);

//   useEffect(() => {
//     // Kirim ke reducer untuk mengambil data yang ada di redux
//     dispatch(getCategory());
//   }, [dispatch]);

//   return (
//     <>
//       <div className="flex justify-center mt-20">
//         <div className="flex w-full justify-center items-center max-w-[1060px] flex-col pt-[26px] pb-[14px] gap-5 container">
//           <div className="flex justify-between container px-6">
//             <h2 className="text-xl font-bold">Kategori Belajar</h2>
//             <Link to="/class" className="font-extrabold text-xs max-w-fit text-darkblue">
//               Lihat Semua
//             </Link>
//           </div>
//           <div className="flex flex-col max-w-[1200px] px-6">
//             <div className="flex justify-start flex-wrap grow gap-2.5">
//               {loading ? (
//                 <p>Loading...</p> // Tampilkan pesan loading saat data sedang diambil
//               ) : error ? (
//                 <p>Error: {error}</p> // Tampilkan pesan error jika terjadi masalah
//               ) : (
//                 category.map((kategori, i) => (
//                   <div
//                     key={i}
//                     className="justify-center items-center flex grow flex-col pl-1.5 pr-2.5 hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
//                   >
//                     <img
//                       src={kategori.image}
//                       // title={kategori.title}
//                       className="aspect-[1.6] object-cover object-center w-[140px] rounded-xl shadow-md hover:cursor-pointer"
//                     />
//                     <div className="text-black text-center text-xs font-semibold leading-9 whitespace-nowrap">
//                       {kategori.title}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CardCategory;
