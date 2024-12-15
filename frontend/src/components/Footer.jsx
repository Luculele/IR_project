// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-3 flex flex-col justify-center items-center mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Querymon App. Developed by Stipe Peran
        and Matteo Borioli. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
