import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NoAccessToken = ({ childeren }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      // getMe
      (navigate, "/", null)
    );
  }, [dispatch, navigate]);
  return childeren;
};

export default NoAccessToken;
