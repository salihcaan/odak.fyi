import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ActionsMarket } from "./pages/ActionsMarket";
import { initAnalytics } from "./lib/analytics";
import "./styles/actions.css";
import "./styles/polish.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ActionsMarket />
  </StrictMode>,
);
