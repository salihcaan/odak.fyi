const IDES = [
  { src: "/assets/ide/cursor.webp", alt: "Cursor" },
  { src: "/assets/ide/vscode.webp", alt: "VS Code" },
  { src: "/assets/ide/intellij.webp", alt: "IntelliJ IDEA" },
  { src: "/assets/ide/antigravity.png", alt: "Antigravity" },
  { src: "/assets/ide/xcode.webp", alt: "Xcode" },
  { src: "/assets/ide/android-studio.png", alt: "Android Studio" },
];

export function IdeMarquee() {
  return (
    <div className="ide-marquee" aria-label="Works with Cursor, VS Code, IntelliJ, Antigravity, Xcode, Android Studio, and any other editor">
      <div className="ide-marquee-track">
        {[...IDES, ...IDES].map((ide, i) => (
          <div key={i} className="ide-marquee-item" aria-hidden={i >= IDES.length}>
            <img src={ide.src} alt={i < IDES.length ? ide.alt : ""} loading="lazy" />
            <span>{ide.alt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
