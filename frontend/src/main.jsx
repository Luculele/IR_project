import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SearchBar from "./components/Searchbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchBar />
  </StrictMode>
);
