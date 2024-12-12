import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../redux/actions/authActions";
import Cookies from "js-cookie";

const ProtectedToken = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getMe(navigate, "/", token));
    }
  }, [dispatch, navigate]);

  return children;
};

export default ProtectedToken;
