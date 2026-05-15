import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Buy } from "./pages/Buy";
import "./styles/buy.css";
import "./styles/polish.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Buy />
  </StrictMode>,
);
