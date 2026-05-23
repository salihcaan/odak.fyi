import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Changelog } from "./pages/Changelog";
import { initAnalytics } from "./lib/analytics";
import "./styles/changelog.css";
import "./styles/polish.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Changelog />
  </StrictMode>,
);
