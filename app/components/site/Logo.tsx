// Brand mark used in nav + footer. The two <picture> elements ship the
// dark and light asset variants; CSS (`.icon-dark` / `.icon-light` plus the
// [data-theme] selectors in each page's stylesheet) shows exactly one.
export function Mark({
  size = 22,
  fetchPriority = "high",
  loading = "eager",
}: {
  size?: number;
  fetchPriority?: "high" | "auto" | "low";
  loading?: "eager" | "lazy";
}) {
  const wh = size * 2;
  return (
    <div className="mark" style={{ width: size, height: size }}>
      <picture>
        <source type="image/avif" srcSet="/assets/logo/odak-dark.avif" />
        <source type="image/webp" srcSet="/assets/logo/odak-dark.webp" />
        <img
          className="icon-dark"
          src="/assets/logo/odak-dark.png"
          alt=""
          width={wh}
          height={wh}
          decoding="async"
          loading={loading}
          fetchPriority={fetchPriority}
        />
      </picture>
      <picture>
        <source type="image/avif" srcSet="/assets/logo/odak.avif" />
        <source type="image/webp" srcSet="/assets/logo/odak.webp" />
        <img
          className="icon-light"
          src="/assets/logo/odak.png"
          alt=""
          width={wh}
          height={wh}
          decoding="async"
          loading={loading}
          fetchPriority={fetchPriority}
        />
      </picture>
    </div>
  );
}
