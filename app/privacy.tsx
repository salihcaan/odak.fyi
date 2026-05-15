import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Privacy } from "./pages/Privacy";
import "./styles/privacy.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Privacy />
  </StrictMode>,
);
