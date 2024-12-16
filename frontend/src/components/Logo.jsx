import React from "react";
import "../index.css";
import image from "../img/QuerymonLogo.png";

export default function Logo() {
  return (
    <div className="logo-container pt-4 flex justify-center items-center max-h-[12vh]">
      <img src={image} alt="Querymon Logo" className="max-w-full  h-[210px]" />
    </div>
  );
}
