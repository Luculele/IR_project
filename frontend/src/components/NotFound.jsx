import React from "react";
import sadImage from "../img/sadTogepi.png";

const NotFound = () => {
  return (
    <div className="h-[60vh] w-[60vw] mx-auto mt-28">
      <div className="flex flex-col items-center justify-center mx-auto my-auto bg-[rgba(236,236,236,0.95)] rounded-3xl shadow-2xl py-24">
        <img
          src={sadImage}
          alt="Sad Pokémon"
          className="w-64 h-64 mb-8 object-contain"
        />
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Sorry, we couldn't find any Pokémon!
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
