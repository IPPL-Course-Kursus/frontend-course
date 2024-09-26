<div className="border rounded-xl overflow-hidden shadow-lg flex-col">
  {/* Image Section */}
  <img
    src="https://via.placeholder.com/350x150" // Ganti dengan URL gambar sebenarnya
    alt="Course Thumbnail"
    className="w-full h-40 object-cover flex"
  />

  {/* Content Section */}
  <div className="p-4">
    <div className="flex justify-between items-start">
      <div>
        {/* Course Category */}
        <a href="#" className="text-blue-500 text-sm font-bold hover:underline">
          UI/UX Design
        </a>
        {/* Course Title */}
        <h2 className="text-xl font-semibold">
          Belajar Web Designer dengan Figma
        </h2>
        {/* Author */}
        <p className="text-sm text-gray-600">by Angela Doe</p>
      </div>
      {/* Rating */}
      <div className="flex items-center space-x-1">
        <span className="text-yellow-500 font-bold text-xl">★</span>
        <span className="text-xl font-bold text-gray-700">4.7</span>
      </div>
    </div>

    {/* Course Details */}
    <div className="flex items-center space-x-4 text-sm text-gray-500 my-2">
      {/* Level */}
      <div className="flex items-center space-x-1">
        <span className="text-green-500">🟢</span>
        <span className="text-green-700">Intermediate Level</span>
      </div>
      {/* Modules */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-700">📚</span>
        <span>10 Modul</span>
      </div>
      {/* Duration */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-700">⏰</span>
        <span>120 Menit</span>
      </div>
    </div>

    {/* Payment Status */}
    <div className="mt-4">
      <button className="bg-red-600 text-white text-sm py-2 px-4 rounded-full">
        Waiting for Payment
      </button>
    </div>
  </div>
</div>;
