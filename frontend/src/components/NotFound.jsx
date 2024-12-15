import React from "react";
import { useNavigate } from "react-router-dom";
import sadImage from "../img/sadTogepi.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-max h-max mx-auto my-auto bg-[rgba(236,236,236,0.95)] rounded-3xl p-12 shadow-2xl">
      <img
        src={sadImage}
        alt="Sad Pokémon"
        className="w-64 h-64 mb-8 object-contain"
      />
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Sorry, we couldn't find any Pokémon!
      </h2>
    </div>
  );
};

export default NotFound;
