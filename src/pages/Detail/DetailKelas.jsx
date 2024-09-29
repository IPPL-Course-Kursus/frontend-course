import { Link } from "react-router-dom";
import CardRecommended from "../../components/DetailComponent/CardRecommended";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
// import { useState } from "react";
// import PopupBuy from "../../components/DetailComponent/PopUpBuy";

export const DetailKelas = () => {
  // const [isPopupBuy, setIsPopupBuy] = useState(false);

  // const handlePopup = () => {
  //   setIsPopupBuy(false);
  // };
  return (
    <>
      {/* <PopupBuy
        isPopupBuy={isPopupBuy}
        handlePopup={handlePopup}
        // courseId={courseId}
      /> */}
      <Navbar />
      <div className="w-full h-full p-4">
        {/* Bagian Judul dan Deskripsi */}
        <div className=" flex flex-col sm:flex-row sm:items-start sm:justify-between w-full bg-[#f3f7fb]">
          {/* Judul dan Deskripsi */}
          <div className="w-full sm:w-1/2 p-4">
            {/* Judul JavaScript Dasar */}
            <h1 className="text-[#151515] text-[24px] sm:text-[32px] font-semibold leading-normal">
              JavaScript Dasar
            </h1>
            {/* Deskripsi */}
            <p className="text-[#151515] text-[12px] sm:text-[15px] leading-tight mt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book Lorem
              Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
              been the industry&#39;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book
            </p>

            {/* Tombol Ikuti Kelas */}
            <Link
             to="/mulai-kelas"
            >
              <button
                // onClick={() => setIsPopupBuy(true)}
                className="mt-6 px-4 py-2 bg-[#0a61aa] text-white text-xs font-bold rounded-md"
              >
                Ikuti Kelas Ini
              </button>
            </Link>
          </div>

          {/* Gambar */}
          <div className="w-full sm:w-[524px] p-4">
            <img
              className="w-full h-auto"
              src="https://datascientest.com/wp-content/uploads/2023/09/javascript.png"
              alt="Gambar Placeholder"
            />
          </div>
        </div>

        {/* Bagian Tentang Kelas dan Detail Kelas */}
        <div className="flex flex-col sm:flex-row w-full mt-8">
          {/* Tentang Kelas */}
          <div className="w-full sm:w-2/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
            <h2 className="text-xl font-semibold text-[#151515]">Tentang Kelas</h2>
            <p className="mt-4 text-[#151515] text-[15px] leading-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book Lorem
              Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
              been the industry&#39;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </div>

          {/* Detail Kelas */}
          <div className="w-full sm:w-1/3 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1] sm:ml-4">
            <h2 className="text-xl font-semibold text-primary">Detail Kelas</h2>
            <div className="mt-4 space-y-4">
              {/* Materi */}
              <div className="flex items-center bg-grey p-4 rounded-md">
                <img
                  className="w-[50px] h-[50px] mr-4"
                  alt="Group"
                  src="images/DetailKelas/detkelas1.png"
                />
                <div>
                  <p className="font-medium text-[#151515] text-base leading-5">13 Materi</p>
                </div>
              </div>

              {/* Sertifikat */}
              <div className="flex items-center bg-grey p-4 rounded-md">
                <img
                  className="w-[50px] h-[50px] mr-4"
                  alt="Group"
                  src="images/DetailKelas/detkelas2.png"
                />
                <div>
                  <p className="font-medium text-[#151515] text-base leading-5">Sertifikat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Chapter */}
        <div className="mt-8 p-4 bg-secondary rounded-md border border-solid border-[#d1d1d1]">
          <h2 className="text-xl font-semibold text-[#151515]">Chapter</h2>
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-grey rounded-md">1. Pengenalan JavaScript</div>
            <div className="p-4 bg-grey rounded-md">2. Variabel dan Tipe Data JavaScript</div>
            <div className="p-4 bg-grey rounded-md">3. Operator JavaScript</div>
            <div className="p-4 bg-grey rounded-md">4. Fungsi JavaScript</div>
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
