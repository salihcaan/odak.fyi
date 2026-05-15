import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Refund } from "./pages/Refund";
import "./styles/refund.css";
import "./styles/polish.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Refund />
  </StrictMode>,
);
