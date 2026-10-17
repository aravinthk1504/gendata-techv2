"use client";

// Static gradient background: no large animated blurs, rotating halos or
// continuously animated particles competing with the infinity hero.
export default function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030b18]" />
      <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-brand-primary/10 blur-[100px]" />
      <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-accent/10 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#030b18_95%)]" />
    </div>
  );
}
