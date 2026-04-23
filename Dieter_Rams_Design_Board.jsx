import { useState } from "react";

// ============================================================
// DESIGN SYSTEM TOKENS
// ============================================================
const C = {
  dark: "#1A1916",
  text: "#2A2825",
  textLight: "#6B6860",
  mid: "#B0ADA5",
  light: "#E8E6E0",
  offWhite: "#F5F4F0",
  white: "#FFFFFF",
  accent: "#C8442A",
  braun: "#9A9590",
  green: "#4A7C59",
};

// ============================================================
// REUSABLE COMPONENTS
// ============================================================
const FrameLabel = ({ children, w }) => (
  <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", color: C.mid, textTransform: "uppercase", width: w }}>
    {children}
  </div>
);

const SectionLabel = ({ children, light }) => (
  <div style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: light ? C.braun : C.mid, fontWeight: 600, marginBottom: 6 }}>
    {children}
  </div>
);

const AccentLine = ({ w = 40, color = C.accent }) => (
  <div style={{ width: w, height: 2, background: color, marginBottom: 12 }} />
);

const Nav = ({ dark }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", height: 28, background: dark ? "rgba(26,25,22,0.95)" : C.dark, borderBottom: `1px solid rgba(176,173,165,0.1)` }}>
    <span style={{ fontSize: 7, letterSpacing: "0.2em", color: C.white, fontWeight: 600 }}>DIETER <span style={{ color: C.accent }}>RAMS</span></span>
    <div style={{ display: "flex", gap: 10 }}>
      {["About", "Principles", "Work", "Legacy", "Timeline", "Contact"].map(l => (
        <span key={l} style={{ fontSize: 6, letterSpacing: "0.1em", color: C.braun, textTransform: "uppercase" }}>{l}</span>
      ))}
    </div>
  </div>
);

const MobileNav = () => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px", height: 22, background: C.dark }}>
    <span style={{ fontSize: 6, color: C.white, fontWeight: 600, letterSpacing: "0.15em" }}>DR</span>
    <span style={{ fontSize: 8, color: C.white }}>☰</span>
  </div>
);

// ============================================================
// DESKTOP FRAMES
// ============================================================
const FRAME_W = 440;
const FRAME_H = 300;

const HeroFrame = () => (
  <div style={{ width: FRAME_W, height: FRAME_H, background: C.dark, position: "relative", overflow: "hidden" }}>
    {/* Grid */}
    <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(90deg,transparent,transparent 59px,${C.mid} 59px,${C.mid} 60px),repeating-linear-gradient(0deg,transparent,transparent 59px,${C.mid} 59px,${C.mid} 60px)` }} />
    <Nav />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: FRAME_H - 28, position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: 7, letterSpacing: "0.3em", color: C.braun, textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>Industrial Designer · 1932 – Present</div>
      <div style={{ fontSize: 36, fontWeight: 300, color: C.white, lineHeight: 1.05, marginBottom: 10 }}>Dieter Rams</div>
      <div style={{ fontSize: 13, fontStyle: "italic", color: C.mid, fontFamily: "Georgia, serif", marginBottom: 16 }}>"Weniger, aber besser."</div>
      <div style={{ width: 40, height: 2, background: C.accent }} />
    </div>
    <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <span style={{ fontSize: 6, letterSpacing: "0.25em", color: C.braun, textTransform: "uppercase" }}>Scroll</span>
      <div style={{ width: 1, height: 20, background: C.braun, opacity: 0.5 }} />
    </div>
  </div>
);

const AboutFrame = () => (
  <div style={{ width: FRAME_W, height: FRAME_H, background: C.white, overflow: "hidden" }}>
    <Nav />
    <div style={{ padding: "14px 20px" }}>
      <SectionLabel>01 — About</SectionLabel>
      <div style={{ fontSize: 18, fontWeight: 300, color: C.text, marginBottom: 14 }}>Architect of Quiet Objects</div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: 100, flexShrink: 0 }}>
          <div style={{ width: 100, height: 130, background: C.offWhite, border: `1px solid ${C.light}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 28, color: C.mid, fontWeight: 300 }}>DR</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginTop: 8 }}>
            {[["BORN", "1932"], ["EDU", "Arch."], ["BRAUN", "55–97"], ["VITSOE", "59–"]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 5, letterSpacing: "0.15em", color: C.mid, fontWeight: 600 }}>{l}</div>
                <div style={{ fontSize: 7, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 8, color: C.textLight, lineHeight: 1.7, marginBottom: 8 }}>Dieter Rams is one of the most influential industrial designers of the twentieth century. Trained as an architect and carpenter, he joined Braun in 1955 and rose to become Head of Design — a role he held for over three decades.</p>
          <p style={{ fontSize: 8, color: C.textLight, lineHeight: 1.7, marginBottom: 12 }}>His grandfather, a master carpenter, instilled a belief in craftsmanship and honest materials. This early influence shaped a philosophy centered on restraint and purpose.</p>
          <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
            <div style={{ width: 2, background: C.accent, flexShrink: 0 }} />
            <p style={{ fontSize: 8, fontStyle: "italic", color: C.text, fontFamily: "Georgia, serif", lineHeight: 1.6 }}>"I believe designers should eliminate the unnecessary."</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PrinciplesFrame = () => {
  const principles = [
    ["01", "Innovative"], ["02", "Useful"], ["03", "Aesthetic"], ["04", "Understandable"],
    ["05", "Unobtrusive"], ["06", "Honest"], ["07", "Long-lasting"], ["08", "Thorough"],
    ["09", "Environmentally friendly"], ["10", "As little design as possible"]
  ];
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: C.offWhite, overflow: "hidden" }}>
      <Nav />
      <div style={{ padding: "14px 20px" }}>
        <SectionLabel>02 — Principles</SectionLabel>
        <div style={{ fontSize: 18, fontWeight: 300, color: C.text, marginBottom: 12 }}>Ten Principles of Good Design</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {principles.map(([num, title]) => (
            <div key={num} style={{ background: C.white, border: `1px solid ${C.light}`, padding: "8px 10px", display: "flex", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 300, color: C.accent, lineHeight: 1 }}>{num}</span>
              <div>
                <div style={{ fontSize: 8, fontWeight: 600, color: C.text, marginBottom: 2 }}>Good design is {title.toLowerCase()}</div>
                <div style={{ fontSize: 6, color: C.textLight, lineHeight: 1.5 }}>Description of this principle and how it applies to the design process.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkFrame = () => {
  const products = [
    ["SK 4 Radiogram", "Braun · 1956"], ["T 3 Pocket Radio", "Braun · 1958"],
    ["606 Shelving", "Vitsoe · 1960"], ["ET 66 Calculator", "Braun · 1987"],
    ["TP 1 Radio/Phono", "Braun · 1959"], ["RT 20 Radio", "Braun · 1961"],
    ["620 Chair", "Vitsoe · 1962"], ["L 450 Speaker", "Braun · 1964"]
  ];
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: C.white, overflow: "hidden" }}>
      <Nav />
      <div style={{ padding: "14px 20px" }}>
        <SectionLabel>03 — Work</SectionLabel>
        <div style={{ fontSize: 18, fontWeight: 300, color: C.text, marginBottom: 10 }}>Selected Products</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {["All", "Braun", "Vitsoe"].map((f, i) => (
            <div key={f} style={{ padding: "3px 10px", fontSize: 6, letterSpacing: "0.12em", textTransform: "uppercase", border: `1px solid ${i === 0 ? C.dark : C.light}`, background: i === 0 ? C.dark : "transparent", color: i === 0 ? C.white : C.textLight, fontWeight: 500 }}>{f}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {products.map(([name, meta]) => (
            <div key={name}>
              <div style={{ background: C.offWhite, border: `1px solid ${C.light}`, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 16, color: C.mid, opacity: 0.4 }}>◉</span>
              </div>
              <div style={{ fontSize: 7, fontWeight: 500, color: C.text }}>{name}</div>
              <div style={{ fontSize: 6, color: C.textLight }}>{meta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LegacyFrame = () => {
  const areas = [
    ["◼", "Apple & Digital Design", "Jonathan Ive cited Rams as primary influence for Apple's design language."],
    ["▲", "Architecture", "Honest materials, structural clarity, elimination of ornament."],
    ["◆", "Sustainability", "Advocating for durable, repairable products decades before the movement."],
    ["◎", "Design Education", "Ten Principles taught in nearly every design program worldwide."],
    ["○", "User Experience", "User-centered ethos that predates the UX field by decades."],
    ["■", "Furniture & Interiors", "606 and 620 defined modular, system-based modern furniture."]
  ];
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: C.dark, overflow: "hidden" }}>
      <Nav dark />
      <div style={{ padding: "14px 20px" }}>
        <SectionLabel light>04 — Legacy</SectionLabel>
        <div style={{ fontSize: 18, fontWeight: 300, color: C.white, marginBottom: 12 }}>Enduring Influence</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {areas.map(([icon, title, desc]) => (
            <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: 10 }}>
              <div style={{ fontSize: 12, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: C.white, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 6.5, color: C.braun, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineFrame = () => {
  const events = [
    ["1932", "Born in Wiesbaden"], ["1955", "Joins Braun"], ["1956", "SK 4 'Snow White's Coffin'"],
    ["1960", "606 Shelving System"], ["1961", "Head of Design at Braun"], ["1976", "Ten Principles"],
    ["1997", "Retirement from Braun"], ["2018", "'Rams' Documentary"]
  ];
  return (
    <div style={{ width: FRAME_W, height: FRAME_H, background: C.offWhite, overflow: "hidden" }}>
      <Nav />
      <div style={{ padding: "14px 20px" }}>
        <SectionLabel>05 — Timeline</SectionLabel>
        <div style={{ fontSize: 18, fontWeight: 300, color: C.text, marginBottom: 14 }}>A Life in Design</div>
        <div style={{ position: "relative", paddingLeft: 24 }}>
          <div style={{ position: "absolute", left: 4, top: 2, bottom: 0, width: 1, background: C.light }} />
          {events.map(([year, title], i) => (
            <div key={year + title} style={{ position: "relative", marginBottom: i < events.length - 1 ? 8 : 0, display: "flex", gap: 10 }}>
              <div style={{ position: "absolute", left: -22, top: 2, width: 7, height: 7, borderRadius: "50%", background: C.accent }} />
              <div>
                <div style={{ fontSize: 6, letterSpacing: "0.12em", color: C.accent, fontWeight: 600, marginBottom: 1 }}>{year}</div>
                <div style={{ fontSize: 8, color: C.text, fontWeight: 500 }}>{title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactFrame = () => (
  <div style={{ width: FRAME_W, height: FRAME_H, background: C.white, overflow: "hidden" }}>
    <Nav />
    <div style={{ padding: "14px 20px" }}>
      <SectionLabel>06 — Contact</SectionLabel>
      <div style={{ fontSize: 18, fontWeight: 300, color: C.text, marginBottom: 14 }}>Get in Touch</div>
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: C.text, marginBottom: 6, fontWeight: 500 }}>Enquiries</div>
          <p style={{ fontSize: 7, color: C.textLight, lineHeight: 1.7, marginBottom: 12 }}>For general enquiries about Dieter Rams's work, legacy, and design philosophy, please use the contact form.</p>
          <AccentLine w={30} />
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 5, letterSpacing: "0.15em", color: C.mid, fontWeight: 600, marginBottom: 2 }}>STUDIO</div>
            <div style={{ fontSize: 7, color: C.text }}>Kronberg im Taunus, Germany</div>
          </div>
          <div>
            <div style={{ fontSize: 5, letterSpacing: "0.15em", color: C.mid, fontWeight: 600, marginBottom: 2 }}>ARCHIVE</div>
            <div style={{ fontSize: 7, color: C.text }}>Museum für Angewandte Kunst, Frankfurt</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {["NAME", "EMAIL", "MESSAGE"].map(f => (
            <div key={f}>
              <div style={{ fontSize: 5, letterSpacing: "0.15em", color: C.mid, fontWeight: 600, marginBottom: 3 }}>{f}</div>
              <div style={{ height: f === "MESSAGE" ? 50 : 22, background: C.offWhite, border: `1px solid ${C.light}` }} />
            </div>
          ))}
          <div style={{ alignSelf: "flex-start", padding: "6px 16px", background: C.dark, color: C.white, fontSize: 6, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Send Enquiry</div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// MOBILE FRAMES
// ============================================================
const MOB_W = 160;
const MOB_H = 320;

const MobileHero = () => (
  <div style={{ width: MOB_W, height: MOB_H, background: C.dark, borderRadius: 10, overflow: "hidden", position: "relative" }}>
    <MobileNav />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: MOB_H - 22, padding: "0 12px", textAlign: "center" }}>
      <div style={{ fontSize: 5, letterSpacing: "0.25em", color: C.braun, marginBottom: 8 }}>INDUSTRIAL DESIGNER</div>
      <div style={{ fontSize: 22, fontWeight: 300, color: C.white, lineHeight: 1.1, marginBottom: 8 }}>Dieter Rams</div>
      <div style={{ fontSize: 9, fontStyle: "italic", color: C.mid, fontFamily: "Georgia, serif", marginBottom: 12 }}>"Weniger, aber besser."</div>
      <div style={{ width: 24, height: 1.5, background: C.accent }} />
    </div>
    <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", fontSize: 5, color: C.braun, letterSpacing: "0.2em" }}>SCROLL ↓</div>
  </div>
);

const MobileAbout = () => (
  <div style={{ width: MOB_W, height: MOB_H, background: C.white, borderRadius: 10, overflow: "hidden" }}>
    <MobileNav />
    <div style={{ padding: 10 }}>
      <div style={{ fontSize: 5, letterSpacing: "0.25em", color: C.mid, fontWeight: 600, marginBottom: 4 }}>01 — ABOUT</div>
      <div style={{ fontSize: 12, fontWeight: 300, color: C.text, marginBottom: 8 }}>Architect of Quiet Objects</div>
      <div style={{ width: "100%", height: 80, background: C.offWhite, border: `1px solid ${C.light}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 20, color: C.mid, fontWeight: 300 }}>DR</span>
      </div>
      <p style={{ fontSize: 6, color: C.textLight, lineHeight: 1.7, marginBottom: 8 }}>Dieter Rams is one of the most influential industrial designers of the twentieth century. Trained as an architect and carpenter, he joined Braun in 1955.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {[["BORN", "1932"], ["EDU", "Architecture"], ["BRAUN", "1955–1997"], ["VITSOE", "1959–Present"]].map(([l, v]) => (
          <div key={l} style={{ background: C.offWhite, padding: 4 }}>
            <div style={{ fontSize: 4, letterSpacing: "0.1em", color: C.mid, fontWeight: 600 }}>{l}</div>
            <div style={{ fontSize: 6, color: C.text }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MobilePrinciples = () => (
  <div style={{ width: MOB_W, height: MOB_H, background: C.offWhite, borderRadius: 10, overflow: "hidden" }}>
    <MobileNav />
    <div style={{ padding: 10 }}>
      <div style={{ fontSize: 5, letterSpacing: "0.25em", color: C.mid, fontWeight: 600, marginBottom: 4 }}>02 — PRINCIPLES</div>
      <div style={{ fontSize: 12, fontWeight: 300, color: C.text, marginBottom: 8 }}>Ten Principles</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[["01", "Innovative"], ["02", "Useful"], ["03", "Aesthetic"], ["04", "Understandable"], ["05", "Unobtrusive"], ["06", "Honest"], ["07", "Long-lasting"]].map(([n, t]) => (
          <div key={n} style={{ background: C.white, border: `1px solid ${C.light}`, padding: "5px 8px", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 300, color: C.accent }}>{n}</span>
            <span style={{ fontSize: 6, fontWeight: 500, color: C.text }}>Good design is {t.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MobileWork = () => (
  <div style={{ width: MOB_W, height: MOB_H, background: C.white, borderRadius: 10, overflow: "hidden" }}>
    <MobileNav />
    <div style={{ padding: 10 }}>
      <div style={{ fontSize: 5, letterSpacing: "0.25em", color: C.mid, fontWeight: 600, marginBottom: 4 }}>03 — WORK</div>
      <div style={{ fontSize: 12, fontWeight: 300, color: C.text, marginBottom: 8 }}>Selected Products</div>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {["All", "Braun", "Vitsoe"].map((f, i) => (
          <div key={f} style={{ padding: "2px 6px", fontSize: 5, background: i === 0 ? C.dark : "transparent", color: i === 0 ? C.white : C.textLight, border: `1px solid ${i === 0 ? C.dark : C.light}`, letterSpacing: "0.1em" }}>{f}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[["SK 4 Radiogram", "Braun · 1956"], ["T 3 Pocket Radio", "Braun · 1958"], ["606 Shelving System", "Vitsoe · 1960"], ["ET 66 Calculator", "Braun · 1987"]].map(([name, meta]) => (
          <div key={name} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, background: C.offWhite, border: `1px solid ${C.light}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: C.mid, opacity: 0.4 }}>◉</span>
            </div>
            <div>
              <div style={{ fontSize: 6.5, fontWeight: 500, color: C.text }}>{name}</div>
              <div style={{ fontSize: 5.5, color: C.textLight }}>{meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MobileContact = () => (
  <div style={{ width: MOB_W, height: MOB_H, background: C.white, borderRadius: 10, overflow: "hidden" }}>
    <MobileNav />
    <div style={{ padding: 10 }}>
      <div style={{ fontSize: 5, letterSpacing: "0.25em", color: C.mid, fontWeight: 600, marginBottom: 4 }}>06 — CONTACT</div>
      <div style={{ fontSize: 12, fontWeight: 300, color: C.text, marginBottom: 8 }}>Get in Touch</div>
      <p style={{ fontSize: 6, color: C.textLight, lineHeight: 1.6, marginBottom: 10 }}>For enquiries about Dieter Rams's work and legacy, please use the contact form.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {["NAME", "EMAIL"].map(f => (
          <div key={f}>
            <div style={{ fontSize: 4.5, letterSpacing: "0.12em", color: C.mid, fontWeight: 600, marginBottom: 2 }}>{f}</div>
            <div style={{ height: 18, background: C.offWhite, border: `1px solid ${C.light}` }} />
          </div>
        ))}
        <div>
          <div style={{ fontSize: 4.5, letterSpacing: "0.12em", color: C.mid, fontWeight: 600, marginBottom: 2 }}>MESSAGE</div>
          <div style={{ height: 45, background: C.offWhite, border: `1px solid ${C.light}` }} />
        </div>
        <div style={{ alignSelf: "flex-start", padding: "5px 12px", background: C.dark, color: C.white, fontSize: 5, letterSpacing: "0.12em", fontWeight: 600 }}>SEND ENQUIRY</div>
      </div>
    </div>
  </div>
);

// ============================================================
// DESIGN SYSTEM PANEL
// ============================================================
const DesignSystemPanel = () => (
  <div style={{ background: C.white, border: `1px solid ${C.light}`, padding: 24, width: 440 }}>
    <div style={{ fontSize: 10, letterSpacing: "0.3em", color: C.mid, fontWeight: 600, marginBottom: 6 }}>DESIGN SYSTEM</div>
    <div style={{ fontSize: 20, fontWeight: 300, color: C.text, marginBottom: 20 }}>Visual Language</div>

    {/* Colors */}
    <div style={{ fontSize: 7, letterSpacing: "0.2em", color: C.mid, fontWeight: 600, marginBottom: 8 }}>COLOR PALETTE</div>
    <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
      {[
        ["Dark", C.dark], ["Text", C.text], ["Text Light", C.textLight], ["Mid", C.mid],
        ["Light", C.light], ["Off White", C.offWhite], ["Accent", C.accent], ["Green", C.green]
      ].map(([name, hex]) => (
        <div key={name} style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: hex, border: `1px solid ${C.light}`, marginBottom: 4 }} />
          <div style={{ fontSize: 6, color: C.text, fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 5, color: C.mid }}>{hex}</div>
        </div>
      ))}
    </div>

    {/* Typography */}
    <div style={{ fontSize: 7, letterSpacing: "0.2em", color: C.mid, fontWeight: 600, marginBottom: 8 }}>TYPOGRAPHY</div>
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 28, fontWeight: 300, color: C.text, marginBottom: 2 }}>Aa</div>
        <div style={{ fontSize: 7, color: C.mid }}>Inter / Light</div>
        <div style={{ fontSize: 6, color: C.textLight }}>Primary typeface</div>
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 300, color: C.text, fontFamily: "Georgia, serif", fontStyle: "italic", marginBottom: 2 }}>Aa</div>
        <div style={{ fontSize: 7, color: C.mid }}>Georgia / Italic</div>
        <div style={{ fontSize: 6, color: C.textLight }}>Accent quotes</div>
      </div>
    </div>

    {/* Type Scale */}
    <div style={{ fontSize: 7, letterSpacing: "0.2em", color: C.mid, fontWeight: 600, marginBottom: 8 }}>TYPE SCALE</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
      {[
        ["H1 — Hero", 36, 300], ["H2 — Section Title", 20, 300], ["H3 — Card Title", 12, 500],
        ["Body", 9, 400], ["Label", 7, 600], ["Caption", 6, 400]
      ].map(([label, size, weight]) => (
        <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: size > 20 ? 14 : size, fontWeight: weight, color: C.text }}>{label}</span>
          <span style={{ fontSize: 5, color: C.mid }}>{size}px · {weight}</span>
        </div>
      ))}
    </div>

    {/* Spacing */}
    <div style={{ fontSize: 7, letterSpacing: "0.2em", color: C.mid, fontWeight: 600, marginBottom: 8 }}>SPACING SCALE</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
      {[4, 8, 12, 16, 24, 32, 48, 64].map(s => (
        <div key={s} style={{ textAlign: "center" }}>
          <div style={{ width: 24, height: s * 0.8, background: C.light, marginBottom: 2 }} />
          <div style={{ fontSize: 5, color: C.mid }}>{s}</div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// COMPONENT LIBRARY PANEL
// ============================================================
const ComponentLibrary = () => (
  <div style={{ background: C.white, border: `1px solid ${C.light}`, padding: 24, width: 440 }}>
    <div style={{ fontSize: 10, letterSpacing: "0.3em", color: C.mid, fontWeight: 600, marginBottom: 6 }}>COMPONENTS</div>
    <div style={{ fontSize: 20, fontWeight: 300, color: C.text, marginBottom: 20 }}>UI Library</div>

    {/* Buttons */}
    <div style={{ fontSize: 7, letterSpacing: "0.2em", color: C.mid, fontWeight: 600, marginBottom: 8 }}>BUTTONS</div>
    <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
      <div style={{ padding: "8px 20px", background: C.dark, color: C.white, fontSize: 7, letterSpacing: "0.15em", fontWeight: 600 }}>PRIMARY</div>
      <div style={{ padding: "8px 20px", background: "transparent", color: C.text, fontSize: 7, letterSpacing: "0.15em", fontWeight: 600, border: `1px solid ${C.light}` }}>SECONDARY</div>
      <div style={{ padding: "8px 20px", background: C.accent, color: C.white, fontSize: 7, letterSpacing: "0.15em", fontWeight: 600 }}>ACCENT</div>
    </div>

    {/* Cards */}
    <div style={{ fontSize: 7, letterSpacing: "0.2em", color: C.mid, fontWeight: 600, marginBottom: 8 }}>CARDS</div>
    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
      <div style={{ flex: 1, background: C.offWhite, border: `1px solid ${C.light}`, padding: 12 }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: C.text, marginBottom: 4 }}>Light Card</div>
        <div style={{ fontSize: 6, color: C.textLight }}>On light background</div>
      </div>
      <div style={{ flex: 1, background: C.dark, border: `1px solid rgba(255,255,255,0.06)`, padding: 12 }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: C.white, marginBottom: 4 }}>Dark Card</div>
        <div style={{ fontSize: 6, color: C.braun }}>On dark background</div>
      </div>
    </div>

    {/* Form */}
    <div style={{ fontSize: 7, letterSpacing: "0.2em", color: C.mid, fontWeight: 600, marginBottom: 8 }}>FORM ELEMENTS</div>
    <div style={{ display: "flex", gap: 8 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 5, letterSpacing: "0.12em", color: C.mid, fontWeight: 600, marginBottom: 3 }}>LABEL</div>
        <div style={{ height: 24, background: C.offWhite, border: `1px solid ${C.light}`, padding: "0 8px", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 7, color: C.textLight }}>Placeholder text</span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 5, letterSpacing: "0.12em", color: C.mid, fontWeight: 600, marginBottom: 3 }}>FOCUSED</div>
        <div style={{ height: 24, background: C.offWhite, border: `1px solid ${C.accent}`, padding: "0 8px", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 7, color: C.text }}>Input text</span>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// MAIN APP
// ============================================================
export default function DieterRamsDesignBoard() {
  const [activeView, setActiveView] = useState("all");
  const views = ["all", "desktop", "mobile", "system"];

  return (
    <div style={{ background: "#F0EFEB", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Top Bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: C.dark, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.white, letterSpacing: "0.1em" }}>Dieter Rams — Portfolio Website</span>
          <span style={{ fontSize: 9, color: C.braun }}>High-Fidelity Design Board</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {views.map(v => (
            <button key={v} onClick={() => setActiveView(v)} style={{ padding: "4px 14px", fontSize: 9, letterSpacing: "0.1em", textTransform: "capitalize", border: "none", background: activeView === v ? "rgba(255,255,255,0.1)" : "transparent", color: activeView === v ? C.white : C.braun, cursor: "pointer", borderRadius: 4, fontFamily: "inherit" }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px 24px" }}>
        {/* DESKTOP SECTION */}
        {(activeView === "all" || activeView === "desktop") && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.35em", color: C.mid, fontWeight: 600, marginBottom: 6 }}>DESKTOP — 1440PX</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: C.text, marginBottom: 24 }}>Full-Width Screens</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              {[
                ["Hero", <HeroFrame />],
                ["About", <AboutFrame />],
                ["Principles", <PrinciplesFrame />],
                ["Work", <WorkFrame />],
                ["Legacy", <LegacyFrame />],
                ["Timeline", <TimelineFrame />],
                ["Contact", <ContactFrame />],
              ].map(([label, frame]) => (
                <div key={label}>
                  <div style={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                    {frame}
                  </div>
                  <FrameLabel w={FRAME_W}>{label}</FrameLabel>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE SECTION */}
        {(activeView === "all" || activeView === "mobile") && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.35em", color: C.mid, fontWeight: 600, marginBottom: 6 }}>MOBILE — 390PX</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: C.text, marginBottom: 24 }}>Responsive Screens</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              {[
                ["Hero", <MobileHero />],
                ["About", <MobileAbout />],
                ["Principles", <MobilePrinciples />],
                ["Work", <MobileWork />],
                ["Contact", <MobileContact />],
              ].map(([label, frame]) => (
                <div key={label}>
                  <div style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                    {frame}
                  </div>
                  <FrameLabel w={MOB_W}>{label}</FrameLabel>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DESIGN SYSTEM */}
        {(activeView === "all" || activeView === "system") && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.35em", color: C.mid, fontWeight: 600, marginBottom: 6 }}>FOUNDATIONS</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: C.text, marginBottom: 24 }}>Design System</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              <DesignSystemPanel />
              <ComponentLibrary />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: C.dark, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, color: C.braun, letterSpacing: "0.15em" }}>MAX MCDONOUGH — EMILY CARR UNIVERSITY — MARCH 2026</span>
        <span style={{ fontSize: 9, fontStyle: "italic", color: C.mid, fontFamily: "Georgia, serif" }}>"Weniger, aber besser."</span>
      </div>
    </div>
  );
}
