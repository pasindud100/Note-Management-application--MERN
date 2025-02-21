import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Modal from "react-modal"; // Import Modal

// Set the app element for accessibility
Modal.setAppElement("#root"); // Adjust this selector based on your app's structure

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
