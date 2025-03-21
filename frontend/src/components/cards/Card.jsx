import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, imageSrc, buttonText, buttonLink }) => {
  const navigate = useNavigate();

  return (
    <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <img className="w-full h-48 object-cover" src={imageSrc} alt={""} />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="mt-auto">
          <button
            onClick={() => navigate(buttonLink)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md overflow-hidden hover:bg-blue-600"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
