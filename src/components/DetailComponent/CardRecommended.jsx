import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Book, Clock, Shield, Gem } from "lucide-react";
import PropTypes from "prop-types";

const CardRecommended = ({ title = "Kelas rekomendasi" }) => {
  // Ambil data recommendedCourses dari Redux state
  const recommendedCourses = useSelector((state) => state.course.detail?.recommendedCourses || []);

  console.log(recommendedCourses); // Debugging: pastikan recommendedCourses berisi data

  return (
    <div className="flex justify-center mx-auto px-4 lg:p-4">
      <div className="flex flex-col items-center container gap-5 pt-[26px] pb-[53px]">
        {/* Header Section */}
        <div className="flex justify-between w-full px-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Link to="/topik-kelas" className="text-sm font-semibold text-blue-600 hover:underline">
            Lihat Semua
          </Link>
        </div>

        {/* Card Course Section */}
        <div className="grid mt-2 gap-2 grid-cols-1 w-full md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:mt-4">
        {recommendedCourses.length > 0 ? (
  recommendedCourses.slice(0, 3).map((course) => (
    <div key={course.id} className="bg-white shadow-xl rounded-xl overflow-hidden pb-3">
      <img
        src={course.image}
        alt={course.courseName}
        className="w-full h-28 object-cover"
      />
      <div className="mx-2 md:mx-4 flex flex-col mt-1 ">
        <h1
          className="text-color-primary font-bold text-sm lg:text-base -tracking-wide"
          style={{
            height: '30px', 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {course.courseName}
        </h1>
        <div className="flex justify-between items-center ">
          <p className="text-black text-sm font-semibold"
          style={{
            height: '30px', // Fixed height
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            Instruktur {course.user.fullName}
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="flex items-center text-xs font-semibold text-color-primary">
            <Shield size={18} className="mr-1" /> {course.courseLevel.levelName}
          </p>
          <p className="flex items-center text-xs font-semibold text-color-primary">
            <Book size={18} className="mr-1" /> {course.totalContents} Modul
          </p>
          <p className="flex items-center text-xs font-semibold text-color-primary">
            <Clock size={18} className="mr-1" /> {course.totalDuration} Menit
          </p>
        </div>

        {/* Tampilkan progress bar dan tombol untuk kelas yang sudah dibeli */}
        {course.isPurchased ? (
          <div className="my-2 flex-grow">
            {/* ProgressBar */}
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: "50%" }} />
            </div>
            <div className="my-2">
              <Link
                to={`/course-detail/${course.id}`}
                className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
              >
                Mulai Kelas
              </Link>
            </div>
          </div>
        ) : (
          <div className="my-2">
            <div className="flex items-center">
              {course.coursePrice > 0 ? (
                <>
                  <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center mr-2">
                    {`Rp. ${course.promoStatus ? course.courseDiscountPrice : course.coursePrice}`}{" "}
                  </button>
                  <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center mr-2">
                    <Gem size={16} className="mr-2" /> Premium
                  </button>
                </>
              ) : (
                <button className="py-1 px-4 bg-blue-400 text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105 flex items-center justify-center mr-2">
                  <Gem size={16} className="mr-2" /> Free
                </button>
              )}
            </div>
            <div className="my-2">
              <Link
                to={`/course-detail/${course.id}`}
                className="py-1 px-4 bg-black text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
              >
                Lihat Kelas
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-600">Tidak ada kelas rekomendasi.</p>
)}

        </div>
      </div>
    </div>
  );
};

CardRecommended.propTypes = {
  title: PropTypes.string,
};

export default CardRecommended;
