import PropTypes from "prop-types";

const LoadSpinner = ({ size = 20, color = "white", className = "", speed = "animate-spin" }) => (
  <svg
    className={`${speed} ${className}`}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      style={{ stroke: color }}
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
      style={{ fill: color }}
    ></path>
  </svg>
);

LoadSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  speed: PropTypes.string,
};

export default LoadSpinner;
