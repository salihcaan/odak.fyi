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
          src="/assets/logo/odak-dark.png"
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
