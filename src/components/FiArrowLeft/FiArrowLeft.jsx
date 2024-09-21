/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const FiArrowLeft = ({ color = "black", className }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 12H5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 19L5 12L12 5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
};

FiArrowLeft.propTypes = {
  color: PropTypes.string,
};
