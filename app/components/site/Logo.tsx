export function Mark({
  size = 32,
  fetchpriority = "high",
  loading = "eager",
}: {
  size?: number;
  fetchpriority?: "high" | "auto" | "low";
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
          // React 18 doesn't know the camelCase `fetchPriority` prop yet
          // and warns; lowercase `fetchpriority` is passed straight through
          // as a regular HTML attribute and the browser honors it.
          {...{ fetchpriority }}
        />
      </picture>
    </div>
  );
}
