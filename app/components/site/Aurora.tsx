export function Aurora() {
  return (
    <div 
      className="pointer-events-none absolute top-0 left-0 w-full h-[110vh] overflow-hidden z-[-1]"
      style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.22]"></div>
      <div className="absolute inset-0 bg-grid-fine opacity-[0.14]"></div>
      
      {/* Central soft white orb */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[55vw] w-[55vw] max-h-[900px] max-w-[900px] rounded-full blur-[64px] md:blur-[140px] bg-white opacity-[0.022]"></div>
      
      {/* Warm accent orb (Bridgemind style) */}
      <div 
        className="absolute top-[52%] left-[58%] -translate-x-1/2 -translate-y-1/2 h-[40vw] w-[40vw] max-h-[640px] max-w-[640px] rounded-full blur-[64px] md:blur-[120px] opacity-[0.035]" 
        style={{ background: 'radial-gradient(circle, #DA5427 0%, transparent 70%)' }}
      ></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_0%,rgba(0,0,0,0.55)_100%)]"></div>
      
      {/* Floating particles */}
      <div className="absolute left-[12%] top-[28%] h-1 w-1 rounded-full bg-white/20 animate-pulse"></div>
      <div className="absolute right-[14%] top-[36%] h-1 w-1 rounded-full bg-white/15 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute left-[18%] bottom-[24%] h-[3px] w-[3px] rounded-full bg-[#DA5427]/40"></div>
      <div className="absolute right-[20%] bottom-[30%] h-1 w-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`
        }}
      ></div>
    </div>
  );
}
