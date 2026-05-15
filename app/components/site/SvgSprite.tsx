// Inline SVG sprite the index body's macbook stage references via
// `<use href="#mb-apple">`, `<use href="#ide-iterm">`, etc. Hidden from
// the page (width/height 0, position absolute) but accessible to <use>.
export function SvgSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <symbol id="ide-iterm" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="7" fill="#1a1a1a" />
          <path
            d="M8 11 L13 16 L8 21"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 22 L24 22"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="ide-chrome" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#fff" />
          <path
            d="M16 3 A13 13 0 0 1 27.26 9.5 L19.5 14 A6 6 0 0 0 11 13 Z"
            fill="#EA4335"
          />
          <path
            d="M27.26 9.5 A13 13 0 0 1 24.26 26.5 L19.5 18 A6 6 0 0 0 19.5 14 Z"
            fill="#FBBC04"
          />
          <path
            d="M24.26 26.5 A13 13 0 0 1 4.74 22.5 L12.5 18 A6 6 0 0 0 19.5 18 Z"
            fill="#34A853"
          />
          <circle cx="16" cy="16" r="6" fill="#4285F4" />
          <circle
            cx="16"
            cy="16"
            r="6"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            opacity=".85"
          />
        </symbol>

        <symbol id="mb-apple" viewBox="0 0 14 17">
          <path
            fill="currentColor"
            d="M11.182 8.91c-.018-2.022 1.65-2.992 1.725-3.038-.94-1.376-2.404-1.564-2.925-1.586-1.247-.126-2.434.733-3.067.733-.633 0-1.61-.715-2.65-.696-1.363.02-2.62.793-3.32 2.013-1.416 2.456-.363 6.094 1.018 8.087.674.974 1.477 2.073 2.53 2.034 1.014-.04 1.397-.658 2.624-.658 1.226 0 1.572.658 2.65.638 1.094-.02 1.787-.997 2.456-1.974.774-1.13 1.093-2.224 1.112-2.28-.024-.012-2.135-.82-2.153-3.273zM9.176 2.985C9.737 2.31 10.114 1.371 10.011.434c-.806.033-1.78.537-2.36 1.21-.52.598-.974 1.553-.851 2.473.898.07 1.815-.456 2.376-1.132z"
          />
        </symbol>
        <symbol id="mb-battery" viewBox="0 0 25 12">
          <rect
            x=".5"
            y=".5"
            width="21"
            height="11"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".6"
          />
          <rect
            x="2.5"
            y="2.5"
            width="14"
            height="7"
            rx="1"
            fill="currentColor"
          />
          <path
            d="M23 4v4"
            stroke="currentColor"
            strokeOpacity=".6"
            strokeLinecap="round"
            strokeWidth="1.5"
            fill="none"
          />
        </symbol>
        <symbol id="mb-wifi" viewBox="0 0 16 12">
          <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
            <path d="M1.5 5.2A8 8 0 0 1 14.5 5.2" />
            <path d="M3.8 7.4A5 5 0 0 1 12.2 7.4" />
            <path d="M6 9.6A2 2 0 0 1 10 9.6" />
          </g>
          <circle cx="8" cy="11" r=".6" fill="currentColor" />
        </symbol>
        <symbol id="mb-cc" viewBox="0 0 14 14">
          <g fill="currentColor">
            <rect x="1" y="1" width="5.5" height="5.5" rx="1.4" opacity=".95" />
            <rect x="7.5" y="1" width="5.5" height="5.5" rx="1.4" opacity=".55" />
            <rect x="1" y="7.5" width="5.5" height="5.5" rx="1.4" opacity=".55" />
            <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1.4" opacity=".95" />
          </g>
        </symbol>
        <symbol id="mb-spotlight" viewBox="0 0 14 14">
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="6" cy="6" r="4.4" />
            <line x1="9.3" y1="9.3" x2="12.8" y2="12.8" strokeLinecap="round" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
