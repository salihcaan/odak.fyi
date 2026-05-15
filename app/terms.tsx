import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Terms } from "./pages/Terms";
import "./styles/terms.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Terms />
  </StrictMode>,
);
