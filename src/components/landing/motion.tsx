import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Count-up number (triggers on visibility) ---------- */
export function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(to * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.disconnect();
          break;
        }
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const formatted =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString();

  return <span ref={ref} className={className}>{prefix}{formatted}{suffix}</span>;
}

/* ---------- Ambient backdrop: very slow drifting blurred blobs ---------- */
export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 -left-24 size-[520px] rounded-full blur-3xl animate-ambient"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.17 275 / 0.35), transparent 60%)" }}
      />
      <div
        className="absolute top-20 -right-24 size-[460px] rounded-full blur-3xl animate-ambient"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.22 295 / 0.3), transparent 60%)",
          animationDelay: "-8s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 size-[420px] rounded-full blur-3xl animate-ambient"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.18 200 / 0.22), transparent 60%)",
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}

/* ---------- Tick hook: re-render every `ms` ---------- */
export function useTick(ms = 2400) {
  const [, setN] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setN((n) => n + 1), ms);
    return () => window.clearInterval(id);
  }, [ms]);
}
