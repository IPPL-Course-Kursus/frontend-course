import { ClipLoader } from "react-spinners";

const LoadSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="#000000" />
    </div>
  );
};

export default LoadSpinner;
