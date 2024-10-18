import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Book, Clock, Shield } from "lucide-react";
import PropTypes from "prop-types";

const CardRecommended = ({ title = "Kelas rekomendasi" }) => {
  // Ambil data recommendedCourses dari Redux state
  const recommendedCourses = useSelector((state) => state.course.detail?.recommendedCourses || []);

  console.log(recommendedCourses); // Debugging: pastikan recommendedCourses berisi data

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center max-w-[1060px] container gap-5 pt-[26px] pb-[53px]">
        {/* Header Section */}
        <div className="flex justify-between w-full px-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Link to="/topik-kelas" className="text-sm font-semibold text-blue-600 hover:underline">
            Lihat Semua
          </Link>
        </div>

        {/* Card Course Section */}
        <div className="grid mt-2 gap-2 grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:mt-4">
          {recommendedCourses.length > 0 ? (
            recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
                <img
                  src={course.image}
                  alt={course.courseName}
                  className="w-full h-28 object-cover"
                />
                <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                  <h1
                    className="text-color-primary font-bold text-sm lg:text-base -tracking-wide"
                    style={{
                      height: '44px', // Fixed height
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {course.courseName}
                  </h1>
                  <div className="flex justify-between items-center my-2">
                    <p className="text-black text-sm font-semibold"
                    style={{
                      height: '40px', // Fixed height
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>{course.aboutCourse}</p>
                  </div>
                  <div className="mt-3 flex justify-between flex-wrap">
                    <p className="flex items-center text-xs font-semibold text-color-primary">
                      <Shield size={18} className="mr-1" /> Intermediate Level
                    </p>
                    <p className="flex items-center text-xs font-semibold text-color-primary">
                      <Book size={18} className="mr-1" /> {course.totalDuration} Menit
                    </p>
                    <p className="flex items-center text-xs font-semibold text-color-primary">
                      <Clock size={18} className="mr-1" /> {course.totalContents} Modul
                    </p>
                  </div>
                  <div className="flex left-0 mt-2 my-2">
                    <Link
                      to={`/course-detail/${course.id}`}
                      className="py-1 px-4 bg-primary text-white font-semibold rounded-full text-xs transition-all duration-300 hover:scale-105"
                    >
                      {/* Cek promoStatus untuk menentukan harga yang ditampilkan */}
                      {course.promoStatus ? (
                        <>Beli Rp. {course.courseDiscountPrice}</>
                      ) : (
                        <>Beli Rp. {course.coursePrice}</>
                      )}
                    </Link>
                  </div>
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
