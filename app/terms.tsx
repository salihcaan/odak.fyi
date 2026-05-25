import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Terms } from "./pages/Terms";
import { initAnalytics } from "./lib/analytics";
import "./styles/terms.css";
import "./styles/polish.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Terms />
  </StrictMode>,
);
