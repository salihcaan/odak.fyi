import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Privacy } from "./pages/Privacy";
import { initAnalytics } from "./lib/analytics";
import "./styles/privacy.css";
import "./styles/polish.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Privacy />
  </StrictMode>,
);
