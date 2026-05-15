import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Changelog } from "./pages/Changelog";
import "./styles/changelog.css";
import "./styles/polish.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Changelog />
  </StrictMode>,
);
