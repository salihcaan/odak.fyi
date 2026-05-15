import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Changelog } from "./pages/Changelog";
import "./styles/changelog.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Changelog />
  </StrictMode>,
);
