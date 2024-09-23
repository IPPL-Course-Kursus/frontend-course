import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      // getMe
      (navigate, null, "/login")
    );
  }, [dispatch, navigate]);

  return children;
};

export default Protected;
