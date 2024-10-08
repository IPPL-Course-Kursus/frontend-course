
import PropTypes from "prop-types"
// import RiwayatPembayaran from "./RiwayatPembayaran";
const RiwayatContentCard = ({courseTitle,
    courseImage,
    courseCategory,
    courseAuthor,
    courseRating,
    courseLevel,
    courseModule,
    courseTime,
    courseStatus,
}) => {


    return (
        <div>
      <div className="border rounded-xl overflow-hidden shadow-lg flex-col mb-5">
        {/* Image Section */}
        {courseImage && (
          <img
            src={courseImage}
            alt={courseTitle}
            className="w-full h-40 object-cover flex"
          />
        )}

        {/* Content Section */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              {/* Course Category */}
              <a
                href="#"
                className="text-blue-500 text-sm font-bold hover:underline"
              >
                {courseCategory}
              </a>
              {/* Course Title */}
              <h2 className="text-xl font-semibold">{courseTitle}</h2>
              {/* Author */}
              <p className="text-sm text-gray-600">by {courseAuthor}</p>
            </div>
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 font-bold text-xl">★</span>
              <span className="text-xl font-bold text-gray-700">
                {courseRating}
              </span>
            </div>
          </div>

          {/* Course Details */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 my-2">
            {/* Level */}
            <div className="flex items-center space-x-1">
              <span className="text-green-500">🟢</span>
              <span className="text-green-700">{courseLevel}</span>
            </div>
            {/* Modules */}
            <div className="flex items-center space-x-1">
              <span className="text-gray-700">📚</span>
              <span>{courseModule} Modul</span>
            </div>
            {/* Duration */}
            <div className="flex items-center space-x-1">
              <span className="text-gray-700">⏰</span>
              <span>{courseTime} Menit</span>
            </div>
          </div>

          {/* Payment Status */}
          <div className="mt-4">
            <button className={`text-white text-sm py-2 px-4 rounded-full ${courseStatus === "Paid" ? "bg-green-500" : "bg-red-500"}`}>
              {courseStatus}
            </button>
          </div>
        </div>
      </div>
    </div>
  
    );
}

RiwayatContentCard.propTypes ={
    courseTitle: PropTypes.string,
    courseImage: PropTypes.string,
    courseCategory: PropTypes.string,
    courseAuthor: PropTypes.string,
    courseRating: PropTypes.string,
    courseLevel: PropTypes.string,
    courseModule: PropTypes.string,
    courseTime: PropTypes.string,
    courseStatus: PropTypes.string,
}

export default RiwayatContentCard;