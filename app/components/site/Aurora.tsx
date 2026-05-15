// Empty div the page-specific .aurora rule paints with a blurred radial
// gradient. Aria-hidden because it carries no semantic content.
export function Aurora() {
  return <div className="aurora" aria-hidden="true" />;
}
