import { FcGoogle } from "react-icons/fc";

const GoogleOAuth = () => {
  return (
    <>
      <button
        //   onClick={loginWithGoogles}
        className="btn bg-white shadow-md"
      >
        <div className="flex gap-1 items-center">
          <FcGoogle size={22} /> Login dengan akun Google
        </div>
      </button>
    </>
  );
};

export default GoogleOAuth;
