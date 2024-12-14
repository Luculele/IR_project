import React, { useState } from "react";
import "../index.css";
import image from "../img/QuerymonLogo.png";

export default function Logo() {
  return (
    <div className="logo-container w-[700px]">
      <img src={image} alt="Querymon Logo"></img>
    </div>
  );
}
