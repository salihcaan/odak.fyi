import { useState } from "react";
import { X } from "lucide-react";

export function LaunchBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Product Hunt launch announcement"
      className="fixed top-0 inset-x-0 z-[70] backdrop-blur-xl bg-[#0c0e14]/95 border-b border-[#252a36]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DA5427]/60 to-transparent"
      />
      
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center gap-4 px-10 py-2 sm:px-12">
        <a
          href="#"
          className="group flex flex-1 items-center justify-center gap-2 rounded-md text-center text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:gap-3 focus-visible:ring-[#DA5427]/50 focus-visible:ring-offset-[#0c0e14]"
        >
          <span className="hidden flex-wrap items-center justify-center gap-x-2 gap-y-0.5 sm:flex text-[#8B92A8]">
            <span className="font-semibold text-[#E8ECF4]">
              Odak is live on Product Hunt
            </span>
            <span>
              — take <span className="font-semibold text-[#22D3EE]">50% off today</span>
            </span>
          </span>
          <span className="font-medium sm:hidden text-[#E8ECF4]">
            Odak is live — <span className="font-semibold text-[#22D3EE]">50% off</span>
          </span>
          {/* Mock Product Hunt badge using an image similar to Bridgemind */}
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1129426&theme=light"
            alt="Odak - Product Hunt"
            className="h-5 w-auto shrink-0 transition-transform duration-200 group-hover:scale-[1.02] sm:h-6 md:h-7"
            loading="eager"
          />
        </a>
        <button
          type="button"
          aria-label="Dismiss launch banner"
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md transition-colors hover:text-white focus:outline-none focus-visible:ring-2 text-[#545B72] sm:right-3"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
