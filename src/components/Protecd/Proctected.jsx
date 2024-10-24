import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../redux/actions/authActions";

const ProtecdToken = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe(navigate, "/", null));
  }, [dispatch, navigate]);

  return children;
};

export default ProtecdToken;
