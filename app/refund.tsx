import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Refund } from "./pages/Refund";
import { initAnalytics } from "./lib/analytics";
import "./styles/refund.css";
import "./styles/polish.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Refund />
  </StrictMode>,
);
