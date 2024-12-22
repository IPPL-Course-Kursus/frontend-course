const CardSkeleton = () => {
    return (
      <div className="flex justify-center mx-auto px-4 lg:p-4">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden pb-3 animate-pulse w-full max-w-sm">
          {/* Placeholder untuk gambar */}
          <div className="w-56 md:w-52 lg:w-56 xl:w-80 h-40 bg-gray-300"></div>
  
          {/* Placeholder untuk teks dan detail */}
          <div className="p-4">
            {/* Placeholder untuk judul */}
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
  
            {/* Placeholder untuk deskripsi instruktur */}
            <div className="h-3 bg-gray-300 rounded mb-4"></div>
  
            {/* Placeholder untuk ikon dan detail */}
            <div className="flex justify-between flex-wrap mb-2">
              <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
            </div>
  
            {/* Placeholder untuk tombol */}
            <div className="flex space-x-2">
              <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CardSkeleton;
