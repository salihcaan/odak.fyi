import { createRoot } from "react-dom/client";
import { Index } from "./pages/Index";
import "./styles.css";
import "./styles/index.css";
import "./styles/polish.css";

// No StrictMode here — the index page loads /legacy/index-runtime.js after
// mount, and that script attaches window-level scroll/animation listeners
// that aren't safe to double-fire in dev's strict double-mount.
createRoot(document.getElementById("root")!).render(<Index />);
