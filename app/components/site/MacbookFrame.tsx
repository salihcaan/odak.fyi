import frameSvg from "./macbook-frame.svg?raw";
import notchSvg from "./macbook-notch.svg?raw";

// MacBook Pro 16" Silver — inline SVG bezel + notch overlay. The two SVGs
// share a viewBox so the notch sits exactly over the screen's top edge.
// Both are wrapped in display:contents elements so they remain children
// of .macbook for CSS purposes (the existing .macbook .frame /
// .macbook .notch-overlay rules use descendant combinators).
export function MacbookFrame() {
  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: frameSvg }} />
    </>
  );
}

export function MacbookNotchOverlay() {
  return (
    <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: notchSvg }} />
  );
}
