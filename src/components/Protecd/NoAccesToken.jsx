import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getMe } from "../../redux/actions/authActions";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token"); // Ambil token dari cookies

    if (!token) {
      // Jika tidak ada token, arahkan ke halaman login
      navigate("/notfound");
      return;
    }

    // Jika token ada, lakukan dispatch untuk mendapatkan data pengguna
    dispatch(getMe(navigate, null, "/login"));
  }, [dispatch, navigate]);

  // Jika sudah ada token, tampilkan children (halaman yang dilindungi)
  return children;
};

export default Protected;