const CardPayment = () => {
  return (
    <div>
      <div className="w-full mt-6 my-2 bg-white shadow-xl rounded-xl overflow-hidden pb-3 hover:scale-95 duration-300">
        <div className="flex flex-col">
          <div>
            <div className="w-full bg-white rounded-lg overflow-hidden pb-3">
              <div className="flex flex-col">
                <div>
                  <img
                    // src={course.thumbnail}
                    src="https://images.unsplash.com/photo-1702145754106-05d909f08c9d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                    alt="ayam"
                    className="overflow-hidden w-full h-28 object-cover"
                  />
                </div>
                <div className="mx-2 md:mx-4 flex flex-col mt-1 md:mt-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-color-primary font-bold text-sm lg:text-base -tracking-wide">
                      {/* {categoryName} */}UI/UX Design
                    </h1>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-black font-semibold text-sm lg:text-base -tracking-widest md:-tracking-wider">
                      {/* {course.title} */}Belajar Web Design dengan Figma
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-black font-semibold text-sm lg:text-base -tracking-widest md:-tracking-wider">
                      {/* {course.authoe} */}by. asep
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10 flex justify-between md:justify-around">
        {/* <p className="flex items-center text-color-primary text-lg font-semibold -tracking-widest md:-tracking-wider"> */}
        <div className="pt-3 items-center text-color-primary  font-semibold -tracking-wider md:-tracking-wider">
          <div className="text-lg">Harga</div>
          <p className="text-md">RP. 499,999</p>
        </div>

        <div className="pt-3  items-center text-color-primary font-semibold -tracking-wider md:-tracking-wider">
          <div className="text-lg">Harga</div>
          <p className="text-md">RP. 49,999</p>
        </div>
        <div className="pt-3 items-center text-blue-500 font-semibold -tracking-wider md:-tracking-wider">
          <div className="text-lg">Total Bayar</div>
          <p className="text-md">RP. 400,000</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="py-4 px-10 bg-red-600  text-white font-semibold rounded-full text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center">
          <span className="mr-2">{/* <Gem size={16} /> */}</span> Bayar dan Ikuti Kelas Selamanya
        </button>
      </div>
    </div>
  );
};

export default CardPayment;
