import { useEffect, useState } from "react";

const CardCourse = () => {
  const [cardsToShow, setCardsToShow] = useState(4); // Default 4 cards for desktop

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setCardsToShow(1); // Show 1 card on mobile
      } else if (window.innerWidth <= 1024) {
        setCardsToShow(2); // Show 2 cards on tablet
      } else {
        setCardsToShow(4); // Show 4 cards on desktop
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check for screen size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {Array.from({ length: cardsToShow }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 shadow-xl rounded-xl overflow-hidden pb-3 h-full flex flex-col animate-pulse"
        >
          <div className="w-full h-40 bg-gray-300 rounded-t-xl"></div>
          <div className="p-4 flex flex-col gap-3">
            <div className="h-6 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/6"></div>
            <div className="mt-3 flex justify-between gap-2">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCourse;
