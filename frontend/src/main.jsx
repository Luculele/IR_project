import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import Hello from "./components/Hello.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// createRoot(document.getElementById("Hello")).render(
//   <StrictMode>
//     <Hello />
//   </StrictMode>
// );
