import Slider from "react-slick";
import PropTypes from "prop-types";
import { useRef } from "react";

const Content = () => {
  const sliderRef = useRef(null);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const cardData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      founder: "Muhamad Saman",
      quote: "Imaginasi lebih penting daripada pengetahuan.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      founder: "Nur Ali Rajab",
      quote: "Waktu Anda terbatas, jangan sia-siakan untuk hidup orang lain.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      founder: "Helmi",
      quote: "Segalanya tampak mustahil sampai dilakukan.",
    },
  ];

  return (
    <>
      <div className="flex justify-center bg-gradient-to-r p-2">
        <div className="flex flex-col items-center max-w-[1060px] container gap-5 pt-10 pb-10">
          <h2 className="text-primary text-4xl font-extrabold mb-6 text-center">
            Testimoni Inspiratif
          </h2>
          <div className="relative w-full shadow-2xl rounded-lg  overflow-hidden">
            <Slider ref={sliderRef} {...carouselSettings}>
              {cardData.length > 0 ? (
                cardData.map((card) => (
                  <div key={card.id} className="flex justify-center px-4">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 transform hover:scale-110 h-72 flex flex-col justify-between p-6">
                      <div className="flex justify-center mt-4">
                        <img
                          src={card.image}
                          alt={card.founder}
                          className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md"
                        />
                      </div>
                      <div className="p-4 text-center flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800">{card.founder}</h3>
                        <p className="text-gray-700 italic mb-4">{card.quote}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">Tidak ada kutipan tersedia.</p>
                </div>
              )}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

Content.propTypes = {
  onClick: PropTypes.func,
};

export default Content;
