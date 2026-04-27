"use client";

import { useEffect, useRef, useState } from "react";
import { login } from "@/shared/lib/auth";

// ── Low-poly dragon points (surprise!) ──────────────────────────────────────
const DRAGON_POLYS = [
  // body
  { pts: [[120,180],[160,140],[200,180]], color: "rgba(99,179,237,0.18)" },
  { pts: [[160,140],[200,180],[220,130]], color: "rgba(99,179,237,0.12)" },
  { pts: [[200,180],[220,130],[260,170]], color: "rgba(147,197,253,0.15)" },
  { pts: [[220,130],[260,170],[270,110]], color: "rgba(99,179,237,0.20)" },
  { pts: [[260,170],[270,110],[310,150]], color: "rgba(147,197,253,0.13)" },
  { pts: [[270,110],[310,150],[320,90]], color: "rgba(186,230,253,0.16)" },
  { pts: [[310,150],[320,90],[360,130]], color: "rgba(99,179,237,0.18)" },
  { pts: [[120,180],[200,180],[170,230]], color: "rgba(59,130,246,0.12)" },
  { pts: [[200,180],[260,170],[230,230]], color: "rgba(99,179,237,0.10)" },
  { pts: [[260,170],[310,150],[290,220]], color: "rgba(147,197,253,0.14)" },
  // wings
  { pts: [[160,140],[180,80],[220,130]], color: "rgba(99,179,237,0.22)" },
  { pts: [[180,80],[240,60],[220,130]], color: "rgba(147,197,253,0.18)" },
  { pts: [[240,60],[280,40],[270,110]], color: "rgba(186,230,253,0.20)" },
  { pts: [[280,40],[320,90],[270,110]], color: "rgba(99,179,237,0.15)" },
  { pts: [[240,60],[300,20],[280,40]], color: "rgba(147,197,253,0.10)" },
  // tail
  { pts: [[310,150],[360,130],[370,180]], color: "rgba(99,179,237,0.14)" },
  { pts: [[360,130],[400,160],[370,180]], color: "rgba(147,197,253,0.11)" },
  { pts: [[370,180],[400,160],[410,210]], color: "rgba(99,179,237,0.09)" },
  // head
  { pts: [[120,180],[90,160],[110,210]], color: "rgba(59,130,246,0.18)" },
  { pts: [[90,160],[70,190],[110,210]], color: "rgba(99,179,237,0.22)" },
  { pts: [[70,190],[60,220],[90,230]], color: "rgba(147,197,253,0.16)" },
  { pts: [[90,160],[80,130],[120,150]], color: "rgba(59,130,246,0.20)" },
  { pts: [[80,130],[100,110],[120,150]], color: "rgba(99,179,237,0.18)" },
  // horns
  { pts: [[80,130],[70,100],[90,120]], color: "rgba(147,197,253,0.25)" },
  { pts: [[100,110],[95,80],[115,105]], color: "rgba(186,230,253,0.22)" },
];

export default function LoginPage({ onAuth }: { onAuth: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // ── Breathing gradient + mouse-reactive grid canvas ──────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      t += 0.004;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // breathing gradient background
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const cx1 = w * (0.2 + Math.sin(t * 0.7) * 0.15 + mx * 0.1);
      const cy1 = h * (0.3 + Math.cos(t * 0.5) * 0.1 + my * 0.1);
      const cx2 = w * (0.8 + Math.cos(t * 0.6) * 0.1 - mx * 0.1);
      const cy2 = h * (0.7 + Math.sin(t * 0.8) * 0.12 - my * 0.1);

      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, w * 0.55);
      g1.addColorStop(0, `hsla(210,90%,${18 + Math.sin(t) * 4}%,0.9)`);
      g1.addColorStop(1, "hsla(220,80%,8%,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, w * 0.5);
      g2.addColorStop(0, `hsla(195,80%,${15 + Math.cos(t * 1.1) * 3}%,0.7)`);
      g2.addColorStop(1, "hsla(200,70%,5%,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // mouse-reactive grid
      const cols = 28;
      const rows = 18;
      const cw = w / cols;
      const ch = h / rows;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const gx = c * cw;
          const gy = r * ch;
          const dx = gx / w - mx;
          const dy = gy / h - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist * 2.5);
          const ox = dx * pull * -22;
          const oy = dy * pull * -22;

          if (c < cols && r < rows) {
            const alpha = 0.04 + pull * 0.12;
            ctx.beginPath();
            ctx.rect(gx + ox * 0.3, gy + oy * 0.3, cw - 1, ch - 1);
            ctx.strokeStyle = `rgba(99,179,237,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          // intersection dots
          const dotAlpha = 0.08 + pull * 0.35;
          const dotSize = 0.8 + pull * 2;
          ctx.beginPath();
          ctx.arc(gx + ox, gy + oy, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147,197,253,${dotAlpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // ── Dragon SVG float animation ────────────────────────────────────────────
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let raf: number;
    let t = 0;

    const animate = () => {
      t += 0.008;
      const floatY = Math.sin(t) * 10;
      const floatX = Math.cos(t * 0.7) * 5;
      const rotate = Math.sin(t * 0.5) * 3;
      svg.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${rotate}deg)`;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Form entrance ─────────────────────────────────────────────────────────
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    form.style.opacity = "0";
    form.style.transform = "scale(0.92) translateY(16px)";
    setTimeout(() => {
      form.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      form.style.opacity = "1";
      form.style.transform = "scale(1) translateY(0)";
    }, 200);
  }, []);

  // ── Submit ────────────────────────────────────────────────────────────────
 // ── Submit ────────────────────────────────────────────────────────────────
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const success = await login(username, password);

    if (success) {
      formRef.current!.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      formRef.current!.style.opacity = "0";
      formRef.current!.style.transform = "scale(1.04)";
      setTimeout(onAuth, 500);
    } else {
      setError("Invalid credentials.");
      setLoading(false);
      if (formRef.current) {
        formRef.current.style.transition = "transform 0.08s ease";
        const shake = [6, -6, 4, -4, 2, -2, 0];
        let i = 0;
        const doShake = () => {
          if (i < shake.length) {
            formRef.current!.style.transform = `translateX(${shake[i]}px)`;
            i++;
            setTimeout(doShake, 60);
          }
        };
        doShake();
      }
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050810",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px rgba(15,23,42,0.95) inset !important;
          -webkit-text-fill-color: #e2e8f0 !important;
        }
        ::selection { background: rgba(99,179,237,0.3); }
      `}</style>

      {/* Animated canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Low-poly dragon */}
      <svg
        ref={svgRef}
        viewBox="0 0 480 280"
        width="480"
        height="280"
        style={{
          position: "absolute",
          right: "8%",
          top: "50%",
          marginTop: "-140px",
          zIndex: 1,
          filter: "drop-shadow(0 0 32px rgba(99,179,237,0.15))",
          pointerEvents: "none",
        }}
      >
        {DRAGON_POLYS.map((poly, i) => (
          <polygon
            key={i}
            points={poly.pts.map(([x, y]) => `${x},${y}`).join(" ")}
            fill={poly.color}
            stroke="rgba(147,197,253,0.25)"
            strokeWidth="0.8"
          />
        ))}
        {/* eye glow */}
        <circle cx="88" cy="148" r="3" fill="rgba(99,179,237,0.9)" />
        <circle cx="88" cy="148" r="6" fill="rgba(99,179,237,0.2)" />
      </svg>

      {/* Glass card */}
      <div
        ref={formRef}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "380px",
          margin: "0 24px",
          padding: "44px 40px",
          background: "rgba(8,15,30,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(99,179,237,0.12)",
          borderRadius: "20px",
          boxShadow: "0 8px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: "absolute",
          top: 0, left: "20%", right: "20%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,179,237,0.6), transparent)",
          borderRadius: "1px",
        }} />

        {/* Title */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            color: "#e2e8f0",
            margin: "0 0 6px",
            letterSpacing: "-0.3px",
          }}>
            Open LLM Studio
          </p>
          <p style={{
            fontSize: "13px",
            color: "rgba(148,163,184,0.7)",
            margin: 0,
            fontWeight: 300,
            letterSpacing: "0.2px",
          }}>
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Username */}
          <div style={{ position: "relative" }}>
            <label style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(148,163,184,0.6)",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}>Username</label>
            <input
              name="username"
              type="text"
              required
              maxLength={64}
              autoComplete="username"
              onFocus={() => setFocused("username")}
              onBlur={() => setFocused(null)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(15,23,42,0.8)",
                border: `1px solid ${focused === "username" ? "rgba(99,179,237,0.5)" : "rgba(51,65,85,0.6)"}`,
                borderRadius: "10px",
                color: "#e2e8f0",
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: focused === "username" ? "0 0 0 3px rgba(99,179,237,0.08)" : "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <label style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(148,163,184,0.6)",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}>Password</label>
            <input
              name="password"
              type="password"
              required
              maxLength={128}
              autoComplete="current-password"
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(15,23,42,0.8)",
                border: `1px solid ${focused === "password" ? "rgba(99,179,237,0.5)" : "rgba(51,65,85,0.6)"}`,
                borderRadius: "10px",
                color: "#e2e8f0",
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                boxShadow: focused === "password" ? "0 0 0 3px rgba(99,179,237,0.08)" : "none",
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <p style={{
              fontSize: "12px",
              color: "rgba(252,165,165,0.9)",
              margin: "0",
              padding: "10px 14px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "8px",
            }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              width: "100%",
              padding: "13px",
              background: loading
                ? "rgba(99,179,237,0.15)"
                : "linear-gradient(135deg, rgba(99,179,237,0.25), rgba(59,130,246,0.35))",
              border: "1px solid rgba(99,179,237,0.3)",
              borderRadius: "10px",
              color: loading ? "rgba(148,163,184,0.5)" : "#bfdbfe",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.3px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(99,179,237,0.35), rgba(59,130,246,0.5))";
                (e.target as HTMLButtonElement).style.borderColor = "rgba(99,179,237,0.5)";
                (e.target as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(99,179,237,0.15)";
              }
            }}
            onMouseLeave={e => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(99,179,237,0.25), rgba(59,130,246,0.35))";
                (e.target as HTMLButtonElement).style.borderColor = "rgba(99,179,237,0.3)";
                (e.target as HTMLButtonElement).style.boxShadow = "none";
              }
            }}
          >
            {loading ? "Verifying..." : "Sign in"}
          </button>
        </form>

        {/* Bottom decoration */}
        <div style={{
          position: "absolute",
          bottom: 0, left: "30%", right: "30%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
        }} />
      </div>
    </div>
  );
}