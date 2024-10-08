// import { Link, useParams } from "react-router-dom";
// import CardRecommended from "../../components/DetailComponent/CardRecommended";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
// import { FaBook } from "react-icons/fa";
// import { GrCertificate } from "react-icons/gr";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// import { getDetailCourse } from "../../redux/actions/detailActions";

// export const DetailKelas = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // Mengambil data detail dari Redux state
//   const { detail } = useSelector((state) => state.course);

//   useEffect(() => {
//     if (id) {
//       dispatch(getDetailCourse(id));
//     }
//   }, [id, dispatch]);

//   return (
//     <>
//       <Navbar />
//       <div className="w-full h-full p-4">
//         <div className="flex flex-row-reverse justify-between mx-3 lg:flex lg:flex-col lg:gap-4">
//           <div className="flex flex-row items-center gap-2 lg:mt-2">
//             <BiMessageSquareDetail className="text-blue-700 w-10 h-10 lg:w-12 lg:h-12" />
//             <h1 className="text-2xl font-bold text-blue-800 lg:text-3xl">Detail Kelas</h1>
//           </div>
//           <Link
//             to={"/"}
//             className="flex items-center gap-2 mx-2 hover:text-color-primary lg:text-lg"
//           >
//             <IoMdArrowRoundBack />
//             <p>Kembali Ke Beranda</p>
//           </Link>
//         </div>
//         {/* Bagian Judul dan Deskripsi */}
//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full bg-[#f3f7fb]">
//           {/* Judul dan Deskripsi */}
//           <div className="w-full sm:w-1/2 p-4">
//             <h1 className="text-[#151515] text-[24px] sm:text-[32px] font-semibold leading-normal">
//               {detail.courseName || "Loading..."}
//             </h1>
//             <p className="text-[#151515] text-[12px] sm:text-[15px] leading-tight mt-4">
//               {detail?.aboutCourse || "Deskripsi belum tersedia"}
//             </p>

//             <Link to="/mulai-kelas">
//               <button className="mt-6 px-4 py-2 bg-[#0a61aa] text-white text-xs font-bold rounded-md">
//                 Ikuti Kelas Ini
//               </button>
//             </Link>
//           </div>

//           <div className="w-full sm:w-[524px] p-4">
//             <img className="w-full h-auto" src={detail?.image} alt="Gambar Placeholder" />
//           </div>
//         </div>

//         {/* Bagian Tentang Kelas dan Detail Kelas */}
//         <div className="flex flex-col sm:flex-row w-full mt-8">
//           <div className="w-full sm:w-2/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
//             <h2 className="text-xl font-semibold text-[#151515]">Tentang Kelas</h2>
//             <p className="mt-4 text-[#151515] text-[15px] leading-5">
//               {detail?.courseDescription || "Informasi tentang kelas ini belum tersedia."}
//             </p>
//           </div>

//           <div className="w-full sm:w-1/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1] sm:ml-4">
//             <h2 className="text-xl font-semibold text-primary">Detail Kelas</h2>
//             <div className="mt-4 space-y-4">
//               {/* Materi */}
//               <div className="flex items-center bg-grey p-4 rounded-md">
//                 <FaBook className="w-[50px] h-[50px] mr-4" />
//                 <div>
//                   <p className="font-medium text-[#151515] text-base leading-5">
//                     {detail?.lessons?.length || 0} Materi
//                   </p>
//                 </div>
//               </div>

//               {/* Sertifikat */}
//               <div className="flex items-center bg-grey p-4 rounded-md">
//                 <GrCertificate className="w-[50px] h-[50px] mr-4" />
//                 <div>
//                   <p className="font-medium text-[#151515] text-base leading-5">Sertifikat</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bagian Chapter */}
//         <div className="mt-8 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
//           <h2 className="text-xl font-semibold text-[#151515]">Chapter</h2>
//           <div className="mt-4 space-y-4">
//             {detail?.chapters?.length > 0 ? (
//               detail.chapters.map((chapter, index) => (
//                 <div key={index} className="p-4 bg-grey rounded-md">
//                   {index + 1}. {chapter}
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 bg-grey rounded-md">Data chapter belum tersedia</div>
//             )}
//           </div>
//         </div>

//         <div className="mt-12">
//           <CardRecommended />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default DetailKelas;

import { Link, useParams } from "react-router-dom";
import CardRecommended from "../../components/DetailComponent/CardRecommended";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { FaBook } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getDetailCourse } from "../../redux/actions/detailActions";

export const DetailKelas = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // Mengambil data detail dari Redux state
  // const { detail } = useSelector((state) => state.course); // Tambahkan errors jika diperlukan
  const detail = useSelector((state) => state.course.detail);

  useEffect(() => {
    if (id) {
      dispatch(getDetailCourse(id));
    }
  }, [id, dispatch]);

  // if (!detail) {
  //   return <div>Loading...</div>; // Tambahkan loading state
  // }

  return (
    <>
      <Navbar />
      <div className="w-full h-full p-4">
        <div className="flex flex-row-reverse justify-between mx-3 lg:flex lg:flex-col lg:gap-4">
          <Link to="/" className="flex items-center gap-2 mx-2 hover:text-color-primary lg:text-lg">
            <IoMdArrowRoundBack />
            <p>Kembali Ke Beranda</p>
          </Link>
        </div>

        {/* Bagian Judul dan Deskripsi */}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full bg-[#f3f7fb]">
          <div className="w-full sm:w-1/2 p-4">
            <h1 className="text-[#151515] text-[24px] sm:text-[32px] font-semibold leading-normal">
              {detail.courseName || "Loading..."}
            </h1>
            <p className="text-[#151515] text-[12px] sm:text-[15px] leading-tight mt-4">
              {detail.intendedFor || "Deskripsi belum tersedia"}
            </p>
            <Link to="/mulai-kelas">
              <button className="mt-6 px-4 py-2 bg-[#0a61aa] text-white text-xs font-bold rounded-md">
                Ikuti Kelas Ini
              </button>
            </Link>
          </div>
          <div className="w-full sm:w-[524px] p-4">
            <img className="w-full h-auto" src={detail.image} alt="Gambar Kelas" />
          </div>
        </div>

        {/* Bagian Tentang Kelas dan Detail Kelas */}
        <div className="flex flex-col sm:flex-row w-full mt-8">
          <div className="w-full sm:w-2/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
            <h2 className="text-xl font-semibold text-[#151515]">Tentang Kelas</h2>
            <p className="mt-4 text-[#151515] text-[15px] leading-5">
              {detail.aboutCourse || "Informasi tentang kelas ini belum tersedia."}
            </p>
          </div>
          <div className="w-full sm:w-1/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1] sm:ml-4">
            <h2 className="text-xl font-semibold text-primary">Detail Kelas</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center bg-grey p-4 rounded-md">
                <FaBook className="w-[50px] h-[50px] mr-4" />
                <div>
                  <p className="font-medium text-[#151515] text-base leading-5">
                    {detail.chapters?.length || 0} Materi
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-grey p-4 rounded-md">
                <GrCertificate className="w-[50px] h-[50px] mr-4" />
                {detail.certificateStatus}
                <div>
                  <p className="font-medium text-[#151515] text-base leading-5">Sertifikat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Chapter */}
        {/* <div className="mt-8 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
          <h2 className="text-xl font-semibold text-[#151515]">Chapter</h2>
          <div className="mt-4 space-y-4">
            {detail.chapters?.length > 0 ? (
              detail.chapters.map((chapter, index) => (
                <div key={index} className="p-4 bg-grey rounded-md">
                  {index + 1}. {chapter}
                </div>
              ))
            ) : (
              <div className="p-4 bg-grey rounded-md">Data chapter belum tersedia</div>
            )}
          </div>
        </div> */}
        <div className="mt-8 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
          <h2 className="text-xl font-semibold text-[#151515]">Chapter</h2>
          <div className="mt-4 ">
            {detail.chapters?.length > 0 ? (
              detail.chapters.map((chapter, index) => (
                <div key={chapter.id} className="p-4 bg-grey rounded-md">
                  {index + 1}. {chapter.chapterTitle} {/* Menampilkan properti chapterTitle */}
                </div>
              ))
            ) : (
              <div className="p-4 bg-grey rounded-md">Data chapter belum tersedia</div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <CardRecommended />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailKelas;
