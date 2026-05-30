import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Blog } from "./pages/Blog";
import { initAnalytics } from "./lib/analytics";
import "./styles/changelog.css";
import "./styles/blog.css";
import "./styles/polish.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Blog />
  </StrictMode>,
);
