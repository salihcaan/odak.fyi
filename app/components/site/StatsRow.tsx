import { motion } from "motion/react";

export function StatsRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 text-[11.5px] sm:text-xs font-mono tracking-wide"
    >
      <div className="flex items-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on X"
          className="group flex items-center transition-colors duration-200 hover:text-white"
          href="https://x.com/odak_fyi"
        >
          <span className="text-white/45 mr-2 transition-colors duration-200 group-hover:text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
          </span>
          <span className="text-white font-semibold tabular-nums">Follow @odak_fyi</span>
        </a>
      </div>
    </motion.div>
  );
}
