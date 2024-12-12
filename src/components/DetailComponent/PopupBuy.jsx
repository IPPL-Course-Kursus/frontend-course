// import { IoMdClose } from "react-icons/io";
import { cn } from "../../libs/utils";
// import Swal from "sweetalert2";
import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";

import Card from "../MyCourseComponent/Card";
// import { getDetailCourse } from "../../redux/actions/detailActions";
// import { enrollFreeCourse, enrollPremiumCourse } from "../../redux/actions/courseActions";

const PopupBuy = ({
  isPopupBuy,
  handlePopup,
  // courseId
}) => {
  //   const dispatch = useDispatch();
  //   const [errors, setErrors] = useState({
  //     isError: false,
  //     message: null,
  //   });
  const { detail } = useSelector((state) => state.course);

  //   useEffect(() => {
  //     // get data dari redux
  //     dispatch(getDetailCourse(courseId, setErrors, errors));
  //   }, [courseId]);

//   const handleBuy = async () => {
//     // pembelian untuk yang berbayar
//     if (detail.price === 0 && detail.type_course === "free") {
//       const decision = await Swal.fire({
//         title: "Pembelian Course",
//         text: "Course ini merupakan course gratis, Jika anda menekan YES maka anda akan meng-enroll course ini",
//         showCancelButton: true,
//         confirmButtonText: "Beli",
//         cancelButtonText: "Batal",
//         customClass: {
//           // Tambahkan kelas CSS khusus
//           confirmButton: "custom-save-button",
//         },
//       });
//       if (decision.isConfirmed) {
//         // dispatch(enrollFreeCourse(courseId));
//       }
//     } else {
//       const decision = await Swal.fire({
//         title: "Pembelian Course",
//         text: "Course ini merupakan course berbayar, apakah anda yakin ingin membelinya ?",
//         showCancelButton: true,
//         confirmButtonText: "Beli",
//         cancelButtonText: "Batal",
//         customClass: {
//           // Tambahkan kelas CSS khusus
//           confirmButton: "custom-save-button",
//         },
//       });

//       if (decision.isConfirmed) {
//         // dispatch(enrollPremiumCourse(courseId));
//       }
//     }
//     handlePopup();
//   };

  return (
    <>
      <div
        className={cn(
          "bg-black/60 z-50 fixed top-0 left-0 right-0 bottom-0 opacity-100 duration-300 transition-all",
          !isPopupBuy && "hidden opacity-0"
        )}
      >
        <div className="flex items-center justify-center h-screen w-screen">
          <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white rounded-lg flex justify-center items-center flex-col p-3 md:p-8 lg:p-12 relative">
            <div
              className="absolute top-2 right-2 cursor-pointer hover:bg-primary hover:text-white rounded-full duration-300"
              onClick={() => {
                handlePopup();
              }}
            >
              {/* <IoMdClose size={24} /> */}
            </div>
            <h1 className="font-semibold text-xl text-black">Selangkah lagi untuk</h1>
            <h1 className="font-semibold text-xl text-color-primary">Mengakses Kelas</h1>
            <div className="overflow-hidden rounded-md border border-color-primary w-8/12">
              <Card course={detail} />
            </div>
            <div className="w-10/12 md:w-8/12 lg:w-7/12 hover:scale-105 duration-300 mt-2">
              <button
                // onClick={handleBuy}
                className="bg-primary h-10 w-full text-white font-semibold rounded-full flex items-center justify-center"
              >
                Enroll Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
PopupBuy.propTypes = {
  isPopupBuy: PropTypes.bool,
  handlePopup: PropTypes.func,
  courseId: PropTypes.string,
};
export default PopupBuy;
