import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Buy } from "./pages/Buy";
import { initAnalytics } from "./lib/analytics";
import "./styles/buy.css";
import "./styles/polish.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Buy />
  </StrictMode>,
);
