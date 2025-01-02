import React from "react";
import { IoClose } from "react-icons/io5";

const ErrorModal = ({ show, onClose, title, message, courses }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Modal Content */}
        <h2 className="text-xl font-semibold mb-4 text-red-600">{title}</h2>
        <p className="mb-4">{message}</p>
        {courses && courses.length > 0 && (
          <>
            <ul className="list-disc list-inside text-gray-700">
              {courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </>
        )}
        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
