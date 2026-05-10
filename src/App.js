import React, { useState, useEffect, useCallback } from "react";

// ─── Responsive Hook ──────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  rose: "#D4607A",
  roseMid: "#E8849A",
  roseLight: "#F5C6D0",
  rosePale: "#FDF0F3",
  blush: "#FAE8ED",
  gold: "#C8A96B",
  goldLight: "#EDD9A3",
  cream: "#FFF8F9",
  inkDark: "#2C1A1F",
  inkMid: "#7A5563",
  inkSoft: "#B09098",
  border: "#F0DCE2",
  borderDark: "#E8C8D0",
  white: "#FFFFFF",
  dmBg: "#1A0E11",
  dmSurface: "#261419",
  dmBorder: "rgba(212,96,122,0.18)",
  dmText: "#F5E8EB",
  dmSubText: "#C4A0A8",
};

const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_BODY = "'Cormorant Garamond', Georgia, serif";

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_CUSTOMERS = [
  { id: 1, name: "Amara Okafor", phone: "08034567890", email: "amara@gmail.com", avatar: "AO" },
  { id: 2, name: "Chidinma Eze", phone: "08123456789", email: "chidinma@yahoo.com", avatar: "CE" },
  { id: 3, name: "Fatima Bello", phone: "09012345678", email: "fatima@gmail.com", avatar: "FB" },
  { id: 4, name: "Ngozi Adeyemi", phone: "08056789012", email: "ngozi@hotmail.com", avatar: "NA" },
  { id: 5, name: "Kemi Abiodun", phone: "07034567891", email: "kemi@gmail.com", avatar: "KA" },
  { id: 6, name: "Blessing Nwosu", phone: "08198765432", email: "blessing@gmail.com", avatar: "BN" },
  { id: 7, name: "Adaeze Okeke", phone: "09087654321", email: "adaeze@gmail.com", avatar: "AO" },
  { id: 8, name: "Ifeoma Chukwu", phone: "08165432109", email: "ifeoma@yahoo.com", avatar: "IC" },
];

const SEED_ORDERS = [
  { id: 1, customerId: 1, customerName: "Amara Okafor", phone: "08034567890", description: "Ankara Aso-oke Bridal Set", quantity: 2, amount: 85000, advancePaid: 50000, balance: 35000, deliveryDate: "2025-06-15", status: "In Progress", createdAt: "2025-05-01", notes: "Groom's family colours — blue & gold" },
  { id: 2, customerId: 2, customerName: "Chidinma Eze", phone: "08123456789", description: "Corporate Blazer & Trousers", quantity: 1, amount: 45000, advancePaid: 45000, balance: 0, deliveryDate: "2025-05-20", status: "Delivered", createdAt: "2025-04-28", notes: "Navy blue, slim fit" },
  { id: 3, customerId: 3, customerName: "Fatima Bello", phone: "09012345678", description: "Lace Gown & Wrapper Set", quantity: 3, amount: 120000, advancePaid: 65000, balance: 55000, deliveryDate: "2025-06-30", status: "Pending", createdAt: "2025-05-03", notes: "Deep purple lace for wedding" },
  { id: 4, customerId: 4, customerName: "Ngozi Adeyemi", phone: "08056789012", description: "Kaftan Embroidered Set", quantity: 1, amount: 55000, advancePaid: 35000, balance: 20000, deliveryDate: "2025-06-05", status: "Ready", createdAt: "2025-04-25", notes: "Gold embroidery on white" },
  { id: 5, customerId: 5, customerName: "Kemi Abiodun", phone: "07034567891", description: "Ankara Crop Top & Skirt", quantity: 2, amount: 38000, advancePaid: 28000, balance: 10000, deliveryDate: "2025-05-28", status: "In Progress", createdAt: "2025-05-05", notes: "Floral print, A-line skirt" },
  { id: 6, customerId: 6, customerName: "Blessing Nwosu", phone: "08198765432", description: "Owambe Ball Gown", quantity: 1, amount: 95000, advancePaid: 50000, balance: 45000, deliveryDate: "2025-07-01", status: "Pending", createdAt: "2025-05-06", notes: "Red satin, sweetheart neckline" },
  { id: 7, customerId: 7, customerName: "Adaeze Okeke", phone: "09087654321", description: "Skirt Suit (2-piece)", quantity: 1, amount: 42000, advancePaid: 42000, balance: 0, deliveryDate: "2025-05-15", status: "Delivered", createdAt: "2025-04-20", notes: "Grey herringbone fabric" },
  { id: 8, customerId: 8, customerName: "Ifeoma Chukwu", phone: "08165432109", description: "Traditional Igbo Bridal", quantity: 4, amount: 180000, advancePaid: 155000, balance: 25000, deliveryDate: "2025-06-20", status: "In Progress", createdAt: "2025-05-02", notes: "Full set: George wrapper, blouse, headgear" },
  { id: 9, customerId: 1, customerName: "Amara Okafor", phone: "08034567890", description: "Casual Boubou", quantity: 1, amount: 22000, advancePaid: 22000, balance: 0, deliveryDate: "2025-04-30", status: "Delivered", createdAt: "2025-04-10", notes: "" },
  { id: 10, customerId: 3, customerName: "Fatima Bello", phone: "09012345678", description: "Evening Dinner Dress", quantity: 1, amount: 68000, advancePaid: 40000, balance: 28000, deliveryDate: "2025-06-10", status: "Ready", createdAt: "2025-04-30", notes: "Black sequin, floor length" },
];

const MEASUREMENTS = [
  { id: 1, customerId: 1, neck: 14, chest: 38, waist: 32, sleeve: 24, shoulder: 16, notes: "Prefers slightly loose fit on waist" },
  { id: 2, customerId: 2, neck: 13.5, chest: 36, waist: 30, sleeve: 23, shoulder: 15, notes: "Slim fit preference" },
  { id: 3, customerId: 3, neck: 14.5, chest: 40, waist: 34, sleeve: 24.5, shoulder: 16.5, notes: "Add 0.5 inch ease on chest" },
  { id: 4, customerId: 4, neck: 14, chest: 37, waist: 31, sleeve: 23.5, shoulder: 15.5, notes: "" },
];

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 185000, orders: 8 },
  { month: "Feb", revenue: 240000, orders: 11 },
  { month: "Mar", revenue: 310000, orders: 14 },
  { month: "Apr", revenue: 275000, orders: 12 },
  { month: "May", revenue: 420000, orders: 18 },
];

const ACTIVITY_FEED = [
  { id: 1, text: "New order from Ifeoma Chukwu", time: "2 hrs ago", icon: "🌸" },
  { id: 2, text: "Kemi Abiodun paid ₦28,000 advance", time: "5 hrs ago", icon: "💕" },
  { id: 3, text: "Adaeze Okeke's order delivered", time: "Yesterday", icon: "✨" },
  { id: 4, text: "New order from Blessing Nwosu", time: "Yesterday", icon: "🌸" },
  { id: 5, text: "New client: Ifeoma Chukwu", time: "2 days ago", icon: "🌷" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => `₦${Number(n).toLocaleString("en-NG")}`;

const statusCfg = {
  Pending: { bg: "#FEF0F3", text: "#C04060", dot: "#E8849A", border: "#F5C0CC" },
  "In Progress": { bg: "#FEF5E8", text: "#9A6020", dot: "#C8A96B", border: "#EDD9A3" },
  Ready: { bg: "#F0FAF0", text: "#2A7A40", dot: "#5AAA6A", border: "#A8DDB0" },
  Delivered: { bg: "#F8F4FC", text: "#6040A0", dot: "#9A7ACC", border: "#D0C0EC" },
};

// ─── Shared Primitives ────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const c = statusCfg[status] || statusCfg.Pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      padding: "3px 10px", borderRadius: 999,
      fontSize: 10, fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap",
      fontFamily: FONT_BODY,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
};

const Petal = ({ dark }) => (
  <span style={{ color: dark ? "rgba(212,96,122,0.4)" : C.roseLight, margin: "0 6px", fontSize: 10 }}>✦</span>
);

const Toast = ({ msg, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 90, right: 16, zIndex: 9999,
      background: `linear-gradient(135deg, ${C.rose}, #B04060)`,
      color: "#fff", padding: "12px 18px", borderRadius: 14,
      boxShadow: "0 8px 32px rgba(212,96,122,0.35)",
      display: "flex", alignItems: "center", gap: 10,
      fontSize: 13, fontWeight: 500, fontFamily: FONT_BODY,
      animation: "slideUp 0.3s ease",
      maxWidth: "calc(100vw - 32px)",
    }}>
      <span style={{ fontSize: 16 }}>🌸</span>
      {msg}
    </div>
  );
};

const Card = ({ children, dark, style = {}, pink = false }) => (
  <div style={{
    background: dark ? C.dmSurface : C.white,
    border: `1px solid ${dark ? C.dmBorder : pink ? C.border : "#F2E8EB"}`,
    borderRadius: 16,
    boxShadow: dark ? "none" : pink
      ? "0 4px 20px rgba(212,96,122,0.08)"
      : "0 2px 16px rgba(212,96,122,0.05)",
    overflow: "hidden",
    ...style,
  }}>
    {children}
  </div>
);

const StatCard = ({ label, value, sub, emoji, accent, dark }) => (
  <Card dark={dark} pink style={{
    padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8,
    cursor: "default", position: "relative", overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: -16, right: -16, width: 60, height: 60, borderRadius: "50%", background: dark ? "rgba(212,96,122,0.08)" : "rgba(212,96,122,0.06)" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
      <span style={{ fontSize: 10, color: dark ? C.dmSubText : C.inkMid, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: FONT_BODY, lineHeight: 1.4 }}>{label}</span>
      <span style={{ fontSize: 20 }}>{emoji}</span>
    </div>
    <div style={{ fontSize: 22, fontWeight: 700, color: accent || (dark ? C.dmText : C.inkDark), fontFamily: FONT_DISPLAY, letterSpacing: "-0.5px", position: "relative" }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: dark ? C.dmSubText : C.inkSoft, fontFamily: FONT_BODY }}>{sub}</div>}
  </Card>
);

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Home", icon: "◈" },
  { id: "orders", label: "Orders", icon: "◧" },
  { id: "customers", label: "Clients", icon: "◉" },
  { id: "measurements", label: "Sizes", icon: "⊞" },
  { id: "invoices", label: "Invoices", icon: "◫" },
  { id: "analytics", label: "Analytics", icon: "◰" },
  { id: "settings", label: "Settings", icon: "◎" },
];

const BottomNav = ({ page, setPage, dark }) => (
  <nav style={{
    position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
    background: dark
      ? "linear-gradient(180deg, #1F0E14 0%, #2C1019 100%)"
      : "linear-gradient(180deg, #3D1020 0%, #5C1832 100%)",
    borderTop: "1px solid rgba(245,198,208,0.15)",
    display: "flex", alignItems: "stretch",
    paddingBottom: "env(safe-area-inset-bottom)",
  }}>
    {NAV.slice(0, 5).map(n => {
      const active = page === n.id;
      return (
        <button key={n.id} onClick={() => setPage(n.id)} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 3, padding: "10px 4px", border: "none", cursor: "pointer",
          background: active ? "rgba(245,198,208,0.12)" : "transparent",
          color: active ? C.roseLight : "rgba(245,198,208,0.38)",
          fontSize: active ? 16 : 15, transition: "all 0.18s",
          borderTop: active ? `2px solid ${C.roseLight}` : "2px solid transparent",
        }}>
          <span>{n.icon}</span>
          <span style={{ fontSize: 9, letterSpacing: "0.04em", fontFamily: FONT_BODY, fontWeight: active ? 600 : 400 }}>{n.label}</span>
        </button>
      );
    })}
  </nav>
);

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
const Sidebar = ({ page, setPage, dark }) => (
  <aside style={{
    width: 220, minHeight: "100vh", position: "sticky", top: 0, height: "100vh",
    background: dark
      ? "linear-gradient(180deg, #1F0E14 0%, #2C1019 100%)"
      : "linear-gradient(180deg, #3D1020 0%, #5C1832 50%, #3D1020 100%)",
    display: "flex", flexDirection: "column", padding: "0 0 28px",
    borderRight: "1px solid rgba(212,96,122,0.2)",
    flexShrink: 0,
  }}>
    <div style={{ padding: "28px 22px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
      <div style={{ fontSize: 9, color: "rgba(245,198,208,0.5)", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 10 }}>✦ Est. Lagos ✦</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 700, color: C.roseLight, lineHeight: 1.2, letterSpacing: "0.01em" }}>Pretty Benny</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 400, color: "rgba(245,198,208,0.45)", letterSpacing: "0.45em", textTransform: "uppercase", marginTop: 2 }}>Luxe</div>
      <div style={{ width: 32, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,198,208,0.3), transparent)", margin: "12px auto 0" }} />
    </div>
    <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
      {NAV.map(n => {
        const active = page === n.id;
        return (
          <button key={n.id} onClick={() => setPage(n.id)} style={{
            display: "flex", alignItems: "center", gap: 11, padding: "10px 13px",
            borderRadius: 12, border: "none", cursor: "pointer", width: "100%",
            background: active ? "rgba(245,198,208,0.12)" : "transparent",
            color: active ? C.roseLight : "rgba(245,198,208,0.38)",
            fontSize: 13, fontWeight: active ? 600 : 400,
            letterSpacing: "0.02em", textAlign: "left", fontFamily: FONT_BODY,
            transition: "all 0.18s",
            borderLeft: active ? `2px solid ${C.roseLight}` : "2px solid transparent",
          }}>
            <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>{n.icon}</span>
            {n.label}
          </button>
        );
      })}
    </nav>
    <div style={{ padding: "0 12px" }}>
      <div style={{ background: "rgba(245,198,208,0.08)", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(245,198,208,0.13)" }}>
        <div style={{ fontSize: 9, color: "rgba(245,198,208,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4, fontFamily: FONT_BODY }}>Studio Owner</div>
        <div style={{ fontSize: 13, color: "rgba(245,198,208,0.8)", fontWeight: 600, fontFamily: FONT_DISPLAY }}>Pretty Benny</div>
        <div style={{ fontSize: 11, color: "rgba(245,198,208,0.3)", fontFamily: FONT_BODY }}>Fashion Studio · Lagos</div>
      </div>
    </div>
  </aside>
);

// ─── Topbar ───────────────────────────────────────────────────────────────────
const Topbar = ({ title, dark, setDark, isMobile, page }) => (
  <header style={{
    height: isMobile ? 56 : 64,
    display: "flex", alignItems: "center",
    padding: isMobile ? "0 16px" : "0 28px",
    gap: 12, position: "sticky", top: 0, zIndex: 100,
    background: dark ? C.dmBg : C.cream,
    borderBottom: `1px solid ${dark ? C.dmBorder : C.border}`,
  }}>
    {isMobile && (
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, color: dark ? C.dmText : C.rose, letterSpacing: "0.03em" }}>
        Pretty Benny
      </div>
    )}
    {!isMobile && (
      <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: dark ? C.dmText : C.inkDark, fontFamily: FONT_DISPLAY, letterSpacing: "0.01em", flex: 1 }}>
        {title}
      </h1>
    )}
    {isMobile && (
      <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: dark ? C.dmSubText : C.inkMid, fontFamily: FONT_BODY, textAlign: "center" }}>
        {title}
      </div>
    )}
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: isMobile ? 0 : "auto" }}>
      {!isMobile && (
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.roseMid, fontSize: 13 }}>♡</span>
          <input placeholder="Search darling…" style={{
            padding: "8px 14px 8px 32px", borderRadius: 12,
            border: `1px solid ${dark ? C.dmBorder : C.border}`,
            fontSize: 13, fontFamily: FONT_BODY,
            background: dark ? C.dmSurface : C.rosePale,
            color: dark ? C.dmText : C.inkDark, outline: "none", width: 200,
          }} />
        </div>
      )}
      <button onClick={() => setDark(d => !d)} style={{
        width: 34, height: 34, borderRadius: 10,
        border: `1px solid ${dark ? C.dmBorder : C.border}`,
        background: dark ? C.dmSurface : C.rosePale,
        cursor: "pointer", fontSize: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: C.rose,
      }}>{dark ? "☀" : "☾"}</button>
      <div style={{ position: "relative" }}>
        <button style={{
          width: 34, height: 34, borderRadius: 10,
          border: `1px solid ${dark ? C.dmBorder : C.border}`,
          background: dark ? C.dmSurface : C.rosePale,
          cursor: "pointer", fontSize: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>🔔</button>
        <span style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, background: C.rose, borderRadius: "50%", border: `2px solid ${dark ? C.dmBg : C.cream}` }} />
      </div>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: `linear-gradient(135deg, ${C.rose}, #A03050)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: FONT_DISPLAY,
      }}>PB</div>
    </div>
  </header>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = ({ orders, dark, isMobile }) => {
  const totalRevenue = orders.reduce((s, o) => s + o.advancePaid, 0);
  const outstanding = orders.reduce((s, o) => s + o.balance, 0);
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const maxRev = Math.max(...MONTHLY_REVENUE.map(m => m.revenue));
  const bdr = dark ? C.dmBorder : C.border;
  const tx = dark ? C.dmText : C.inkDark;
  const sub = dark ? C.dmSubText : C.inkSoft;
  const p = isMobile ? 16 : 28;

  return (
    <div style={{ padding: p, display: "flex", flexDirection: "column", gap: isMobile ? 16 : 24 }}>
      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 10 : 16 }}>
        <StatCard dark={dark} label="Total Orders" value={orders.length} sub="All time" emoji="🌸" />
        <StatCard dark={dark} label="Outstanding" value={fmt(outstanding)} sub="Awaiting collection" emoji="💌" accent="#C8A96B" />
        <StatCard dark={dark} label="Delivered" value={delivered} sub={`of ${orders.length}`} emoji="✨" accent="#5A9A60" />
        <StatCard dark={dark} label="Collected" value={fmt(totalRevenue)} sub="Advance payments" emoji="💕" accent={C.rose} />
      </div>

      {/* Recent orders */}
      <Card dark={dark} pink>
        <div style={{ padding: isMobile ? "14px 16px" : "18px 24px", borderBottom: `1px solid ${bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 14 : 15, fontWeight: 700, color: tx }}>
            Recent Orders <Petal dark={dark} />
          </div>
        </div>
        {isMobile ? (
          <div>
            {orders.slice(0, 5).map(o => (
              <div key={o.id} style={{ padding: "13px 16px", borderTop: `1px solid ${bdr}`, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${C.roseLight}, ${C.roseMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: FONT_DISPLAY }}>
                  {o.customerName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: tx, fontFamily: FONT_BODY, marginBottom: 2 }}>{o.customerName.split(" ")[0]}</div>
                  <div style={{ fontSize: 11, color: sub, fontFamily: FONT_BODY, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.description}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, fontFamily: FONT_DISPLAY, marginBottom: 4 }}>{fmt(o.amount)}</div>
                  <Badge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: dark ? "rgba(212,96,122,0.05)" : C.rosePale }}>
                {["Client", "Outfit", "Amount", "Balance", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, color: C.inkMid, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: FONT_BODY }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map(o => (
                <tr key={o.id} style={{ borderTop: `1px solid ${bdr}` }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: tx, fontFamily: FONT_BODY }}>{o.customerName.split(" ")[0]}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: sub, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: FONT_BODY }}>{o.description}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: C.gold, fontFamily: FONT_DISPLAY }}>{fmt(o.amount)}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: o.balance > 0 ? "#B07020" : "#3A8A50", fontFamily: FONT_BODY }}>{o.balance > 0 ? fmt(o.balance) : "Cleared"}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Revenue chart */}
      <Card dark={dark} pink style={{ padding: isMobile ? 16 : 20 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 13 : 14, fontWeight: 700, color: tx, marginBottom: 16 }}>Monthly Revenue <Petal dark={dark} /></div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: isMobile ? 6 : 7, height: isMobile ? 70 : 80 }}>
          {MONTHLY_REVENUE.map(m => (
            <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div title={fmt(m.revenue)} style={{
                width: "100%", borderRadius: "5px 5px 0 0",
                background: `linear-gradient(180deg, ${C.rose}, ${C.roseMid})`,
                height: `${(m.revenue / maxRev) * (isMobile ? 55 : 68)}px`,
                cursor: "default",
              }} />
              <span style={{ fontSize: 10, color: sub, fontFamily: FONT_BODY }}>{m.month}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity */}
      <Card dark={dark} pink style={{ padding: isMobile ? 16 : 20 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 13 : 14, fontWeight: 700, color: tx, marginBottom: 14 }}>Activity <Petal dark={dark} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ACTIVITY_FEED.map(a => (
            <div key={a.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: dark ? C.dmText : C.inkDark, fontWeight: 500, fontFamily: FONT_BODY }}>{a.text}</div>
                <div style={{ fontSize: 11, color: sub, fontFamily: FONT_BODY }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ─── Orders Page ──────────────────────────────────────────────────────────────
const OrdersPage = ({ orders, setOrders, dark, toast, isMobile }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const bdr = dark ? C.dmBorder : C.border;
  const tx = dark ? C.dmText : C.inkDark;
  const sub = dark ? C.dmSubText : C.inkSoft;
  const p = isMobile ? 16 : 28;

  const filtered = orders.filter(o =>
    (filter === "All" || o.status === filter) &&
    (o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.description.toLowerCase().includes(search.toLowerCase()))
  );

  const markDelivered = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "Delivered" } : o));
    toast("Order marked as delivered ✨");
  };

  return (
    <div style={{ padding: p, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Search + new order */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.roseMid, fontSize: 13 }}>♡</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders…"
            style={{ width: "100%", padding: "10px 14px 10px 32px", borderRadius: 12, border: `1px solid ${bdr}`, fontSize: 13, fontFamily: FONT_BODY, background: dark ? C.dmSurface : C.rosePale, color: tx, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <button onClick={() => setShowModal(true)} style={{
          padding: isMobile ? "10px 14px" : "10px 22px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.rose}, #B04060)`,
          border: "none", color: "#fff", fontSize: isMobile ? 12 : 13, fontWeight: 600,
          cursor: "pointer", fontFamily: FONT_BODY, whiteSpace: "nowrap",
          boxShadow: "0 6px 20px rgba(212,96,122,0.35)",
        }}>🌸 {isMobile ? "New" : "New Order"}</button>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {["All", "Pending", "In Progress", "Ready", "Delivered"].map(s => {
          const active = filter === s;
          return (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: "7px 14px", borderRadius: 10, whiteSpace: "nowrap", flexShrink: 0,
              border: `1px solid ${active ? C.rose : bdr}`,
              background: active ? `linear-gradient(135deg, ${C.rose}, #B04060)` : dark ? C.dmSurface : C.rosePale,
              color: active ? "#fff" : sub,
              fontSize: 12, fontFamily: FONT_BODY, fontWeight: active ? 600 : 400, cursor: "pointer",
            }}>{s}</button>
          );
        })}
      </div>

      {/* Orders list */}
      <Card dark={dark} pink>
        {isMobile ? (
          <div>
            {filtered.length === 0
              ? <div style={{ padding: "40px 0", textAlign: "center", color: sub, fontSize: 14, fontFamily: FONT_BODY }}>🌸 No orders found</div>
              : filtered.map(o => (
                <div key={o.id} style={{ padding: "14px 16px", borderTop: `1px solid ${bdr}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: tx, fontFamily: FONT_BODY, marginBottom: 2 }}>{o.customerName}</div>
                      <div style={{ fontSize: 12, color: sub, fontFamily: FONT_BODY }}>{o.description}</div>
                    </div>
                    <Badge status={o.status} />
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.gold, fontFamily: FONT_DISPLAY }}>{fmt(o.amount)}</span>
                    {o.balance > 0 && <span style={{ fontSize: 12, color: "#B07020", fontFamily: FONT_BODY }}>Bal: {fmt(o.balance)}</span>}
                    <span style={{ fontSize: 11, color: sub, fontFamily: FONT_BODY }}>Due: {o.deliveryDate}</span>
                    <a href={`https://wa.me/234${o.phone.slice(1)}`} target="_blank" rel="noreferrer" style={{ color: "#25D366", fontSize: 12, fontFamily: FONT_BODY }}>📱 WhatsApp</a>
                    {o.status !== "Delivered" && (
                      <button onClick={() => markDelivered(o.id)} style={{
                        padding: "4px 10px", fontSize: 11, borderRadius: 8,
                        background: "transparent", border: `1px solid ${C.rose}`,
                        color: C.rose, cursor: "pointer", fontWeight: 500, fontFamily: FONT_BODY,
                      }}>Deliver ✦</button>
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr style={{ background: dark ? "rgba(212,96,122,0.06)" : C.rosePale, borderBottom: `1px solid ${bdr}` }}>
                  {["Date", "Client", "Phone", "Outfit", "Qty", "Amount", "Advance", "Balance", "Delivery", "Status", ""].map(h => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 10, color: C.inkMid, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: FONT_BODY, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0
                  ? <tr><td colSpan={11} style={{ padding: "52px 0", textAlign: "center", color: sub, fontSize: 14, fontFamily: FONT_BODY }}>🌸 No orders found</td></tr>
                  : filtered.map(o => (
                    <tr key={o.id} style={{ borderTop: `1px solid ${bdr}` }}>
                      <td style={{ padding: "13px 14px", fontSize: 11, color: sub, whiteSpace: "nowrap", fontFamily: FONT_BODY }}>{o.createdAt}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 600, color: tx, whiteSpace: "nowrap", fontFamily: FONT_BODY }}>{o.customerName}</td>
                      <td style={{ padding: "13px 14px" }}>
                        <a href={`https://wa.me/234${o.phone.slice(1)}`} target="_blank" rel="noreferrer" style={{ color: "#25D366", textDecoration: "none", fontSize: 12, fontWeight: 500, fontFamily: FONT_BODY }}>📱 {o.phone}</a>
                      </td>
                      <td style={{ padding: "13px 14px", fontSize: 12, color: sub, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: FONT_BODY }}>{o.description}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: sub, textAlign: "center", fontFamily: FONT_BODY }}>{o.quantity}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 700, color: C.gold, whiteSpace: "nowrap", fontFamily: FONT_DISPLAY }}>{fmt(o.amount)}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, color: "#3A8A50", whiteSpace: "nowrap", fontFamily: FONT_BODY }}>{fmt(o.advancePaid)}</td>
                      <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 600, color: o.balance > 0 ? "#B07020" : "#3A8A50", whiteSpace: "nowrap", fontFamily: FONT_BODY }}>{o.balance > 0 ? fmt(o.balance) : "—"}</td>
                      <td style={{ padding: "13px 14px", fontSize: 11, color: sub, whiteSpace: "nowrap", fontFamily: FONT_BODY }}>{o.deliveryDate}</td>
                      <td style={{ padding: "13px 14px" }}><Badge status={o.status} /></td>
                      <td style={{ padding: "13px 14px" }}>
                        {o.status !== "Delivered" && (
                          <button onClick={() => markDelivered(o.id)} style={{ padding: "5px 11px", fontSize: 11, borderRadius: 8, background: "transparent", border: `1px solid ${C.rose}`, color: C.rose, cursor: "pointer", fontWeight: 500, fontFamily: FONT_BODY, whiteSpace: "nowrap" }}>Deliver ✦</button>
                        )}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
        <div style={{ padding: "10px 16px", borderTop: `1px solid ${bdr}`, fontSize: 12, color: sub, fontFamily: FONT_BODY }}>
          Showing {filtered.length} of {orders.length} orders
        </div>
      </Card>

      {showModal && (
        <OrderModal dark={dark} isMobile={isMobile} onClose={() => setShowModal(false)}
          onSave={o => { setOrders(p => [{ ...o, id: p.length + 1, createdAt: new Date().toISOString().slice(0, 10) }, ...p]); setShowModal(false); toast("New order created! 🌸"); }}
        />
      )}
    </div>
  );
};

// ─── Order Modal ──────────────────────────────────────────────────────────────
const OrderModal = ({ dark, onClose, onSave, isMobile }) => {
  const [form, setForm] = useState({ customerName: "", phone: "", description: "", quantity: 1, amount: "", advancePaid: "", deliveryDate: "", notes: "", status: "Pending" });
  const balance = Math.max(0, (Number(form.amount) || 0) - (Number(form.advancePaid) || 0));
  const bdr = dark ? C.dmBorder : C.border;

  const inp = (name, label, type = "text", placeholder = "") => (
    <div>
      <label style={{ fontSize: 11, color: dark ? C.dmSubText : C.inkMid, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: FONT_BODY }}>{label}</label>
      <input type={type} placeholder={placeholder} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${bdr}`, fontSize: 13, fontFamily: FONT_BODY, background: dark ? "#2A1018" : C.rosePale, color: dark ? C.dmText : C.inkDark, outline: "none", boxSizing: "border-box" }}
        onFocus={e => e.target.style.borderColor = C.rose}
        onBlur={e => e.target.style.borderColor = bdr}
      />
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(60,10,20,0.55)", backdropFilter: "blur(4px)", zIndex: 500, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: dark ? C.dmSurface : C.white, borderRadius: isMobile ? "24px 24px 0 0" : 24,
        padding: isMobile ? "32px 20px 40px" : 36, width: "100%", maxWidth: isMobile ? "100%" : 560,
        maxHeight: isMobile ? "90vh" : "90vh", overflowY: "auto",
        boxShadow: "0 24px 80px rgba(212,96,122,0.25)",
        border: `1px solid ${dark ? C.dmBorder : C.border}`,
      }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${C.roseLight}, ${C.rose}, ${C.roseLight})`, borderRadius: 4, margin: isMobile ? "-32px -20px 24px" : "-36px -36px 28px" }} />
        {isMobile && <div style={{ width: 40, height: 4, background: C.border, borderRadius: 4, margin: "0 auto 20px", display: "block" }} />}

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: dark ? C.dmText : C.inkDark, fontFamily: FONT_DISPLAY }}>New Order 🌸</div>
          <div style={{ fontSize: 13, color: dark ? C.dmSubText : C.inkSoft, marginTop: 4, fontFamily: FONT_BODY, fontStyle: "italic" }}>Fill in the client's outfit details</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {inp("customerName", "Client Name", "text", "e.g. Amara Okafor")}
          {inp("phone", "Phone Number", "text", "080xxxxxxxx")}
          {inp("description", "Outfit Description", "text", "e.g. Ankara Bridal Set")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {inp("quantity", "Quantity", "number", "1")}
            {inp("deliveryDate", "Delivery Date", "date")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {inp("amount", "Total (₦)", "number", "0")}
            {inp("advancePaid", "Advance (₦)", "number", "0")}
          </div>
          <div style={{ background: balance > 0 ? "rgba(200,169,107,0.08)" : "rgba(58,138,80,0.08)", border: `1px solid ${balance > 0 ? "rgba(200,169,107,0.25)" : "rgba(58,138,80,0.25)"}`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: dark ? C.dmSubText : C.inkMid, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontFamily: FONT_BODY }}>Balance Due</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: balance > 0 ? "#B07020" : "#3A8A50", fontFamily: FONT_DISPLAY }}>{fmt(balance)}</div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: dark ? C.dmSubText : C.inkMid, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 6, fontFamily: FONT_BODY }}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Special instructions…" rows={3}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${bdr}`, fontSize: 13, fontFamily: FONT_BODY, background: dark ? "#2A1018" : C.rosePale, color: dark ? C.dmText : C.inkDark, outline: "none", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${bdr}`, background: "transparent", color: dark ? C.dmSubText : C.inkMid, fontSize: 13, fontFamily: FONT_BODY, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => form.customerName && form.description && onSave({ ...form, balance, amount: Number(form.amount), advancePaid: Number(form.advancePaid), quantity: Number(form.quantity) })}
            style={{ flex: 2, padding: 12, borderRadius: 12, background: `linear-gradient(135deg, ${C.rose}, #B04060)`, border: "none", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: FONT_BODY, cursor: "pointer", boxShadow: "0 6px 20px rgba(212,96,122,0.3)" }}>
            Create Order 🌸
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Customers Page ───────────────────────────────────────────────────────────
const CustomersPage = ({ orders, dark, isMobile }) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const bdr = dark ? C.dmBorder : C.border;
  const tx = dark ? C.dmText : C.inkDark;
  const sub = dark ? C.dmSubText : C.inkSoft;
  const p = isMobile ? 16 : 28;

  const customers = SEED_CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const selectedOrders = selected ? orders.filter(o => o.customerId === selected.id) : [];
  const selectedMeas = selected ? MEASUREMENTS.find(m => m.customerId === selected.id) : null;

  return (
    <div style={{ padding: p, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.roseMid, fontSize: 13 }}>🌷</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients…"
          style={{ width: "100%", padding: "10px 14px 10px 34px", borderRadius: 12, border: `1px solid ${dark ? "rgba(232,119,154,0.2)" : C.border}`, fontSize: 13, fontFamily: FONT_BODY, background: dark ? C.dmSurface : C.rosePale, color: tx, outline: "none", boxSizing: "border-box" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 12 }}>
        {customers.map(c => {
          const custOrders = orders.filter(o => o.customerId === c.id);
          const bal = custOrders.reduce((s, o) => s + o.balance, 0);
          const isSelected = selected?.id === c.id;
          return (
            <div key={c.id} onClick={() => setSelected(isSelected ? null : c)} style={{
              background: dark ? C.dmSurface : C.white,
              border: `1px solid ${isSelected ? C.rose : dark ? C.dmBorder : C.border}`,
              borderRadius: 16, padding: isMobile ? 16 : 20, cursor: "pointer",
              boxShadow: isSelected ? `0 0 0 3px rgba(212,96,122,0.14)` : "0 2px 14px rgba(212,96,122,0.06)",
              transition: "all 0.2s", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -14, right: -14, width: 50, height: 50, borderRadius: "50%", background: "rgba(212,96,122,0.06)" }} />
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg, ${C.roseLight}, ${C.roseMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: FONT_DISPLAY, boxShadow: "0 4px 12px rgba(212,96,122,0.25)" }}>{c.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: tx, marginBottom: 2, fontFamily: FONT_DISPLAY }}>{c.name}</div>
                  <a href={`https://wa.me/234${c.phone.slice(1)}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#25D366", textDecoration: "none", fontFamily: FONT_BODY }} onClick={e => e.stopPropagation()}>📱 {c.phone}</a>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${dark ? "rgba(212,96,122,0.1)" : C.border}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: sub, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT_BODY }}>Orders</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.rose, fontFamily: FONT_DISPLAY }}>{custOrders.length}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: sub, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT_BODY }}>Balance</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: bal > 0 ? "#B07020" : "#3A8A50", fontFamily: FONT_DISPLAY }}>{bal > 0 ? fmt(bal) : "Cleared ✓"}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer detail — bottom sheet on mobile, inline drawer on desktop */}
      {selected && (
        <>
          {isMobile && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(60,10,20,0.45)", zIndex: 400 }} onClick={() => setSelected(null)} />
          )}
          <div style={isMobile ? {
            position: "fixed", bottom: 70, left: 0, right: 0, zIndex: 500,
            background: dark ? C.dmSurface : C.white, borderRadius: "24px 24px 0 0",
            maxHeight: "75vh", overflowY: "auto",
            boxShadow: "0 -8px 40px rgba(212,96,122,0.2)",
          } : {
            background: dark ? C.dmSurface : C.white, border: `1px solid ${dark ? C.dmBorder : C.border}`,
            borderRadius: 20, overflow: "hidden",
            boxShadow: "0 8px 40px rgba(212,96,122,0.14)",
          }}>
            <div style={{ background: `linear-gradient(135deg, ${C.rose}, #A03050)`, padding: isMobile ? "20px 20px" : "24px 22px", position: "relative" }}>
              {isMobile && <div style={{ width: 36, height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 4, margin: "0 auto 16px" }} />}
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: isMobile ? 16 : 14, right: 16, background: "rgba(255,255,255,0.18)", border: "none", color: "#fff", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: FONT_DISPLAY, marginBottom: 10, border: "2px solid rgba(255,255,255,0.3)" }}>{selected.avatar}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: "#fff" }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: FONT_BODY, marginTop: 2 }}>{selected.phone}</div>
            </div>
            <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
              {selectedMeas && (
                <div>
                  <div style={{ fontSize: 10, color: C.rose, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontFamily: FONT_BODY }}>✦ Measurements (inches)</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                    {["neck", "chest", "waist", "sleeve", "shoulder"].map(k => (
                      <div key={k} style={{ background: dark ? "rgba(212,96,122,0.08)" : C.rosePale, borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: C.rose, fontFamily: FONT_DISPLAY }}>{selectedMeas[k]}"</div>
                        <div style={{ fontSize: 9, color: sub, textTransform: "capitalize", fontFamily: FONT_BODY }}>{k}</div>
                      </div>
                    ))}
                  </div>
                  {selectedMeas.notes && <div style={{ marginTop: 10, fontSize: 12, color: sub, fontStyle: "italic", background: dark ? "rgba(212,96,122,0.07)" : C.rosePale, padding: "9px 13px", borderRadius: 10, borderLeft: `3px solid ${C.roseMid}`, fontFamily: FONT_BODY }}>"{selectedMeas.notes}"</div>}
                </div>
              )}
              <div>
                <div style={{ fontSize: 10, color: C.rose, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontFamily: FONT_BODY }}>✦ Order History</div>
                {selectedOrders.length === 0
                  ? <div style={{ color: sub, fontSize: 13, fontFamily: FONT_BODY, fontStyle: "italic" }}>No orders yet, darling 🌷</div>
                  : selectedOrders.map(o => (
                    <div key={o.id} style={{ padding: "11px 0", borderBottom: `1px solid ${bdr}` }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: dark ? C.dmText : C.inkDark, marginBottom: 6, fontFamily: FONT_BODY }}>{o.description}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Badge status={o.status} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.gold, fontFamily: FONT_DISPLAY }}>{fmt(o.amount)}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Measurements Page ────────────────────────────────────────────────────────
const MeasurementsPage = ({ dark, isMobile }) => {
  const sub = dark ? C.dmSubText : C.inkSoft;
  const tx = dark ? C.dmText : C.inkDark;
  const p = isMobile ? 16 : 28;

  return (
    <div style={{ padding: p }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
        {MEASUREMENTS.map(m => {
          const cust = SEED_CUSTOMERS.find(c => c.id === m.customerId);
          return (
            <Card key={m.id} dark={dark} pink style={{ padding: 20, overflow: "visible" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, background: `linear-gradient(135deg, ${C.roseLight}, ${C.roseMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: FONT_DISPLAY, boxShadow: "0 4px 12px rgba(212,96,122,0.22)" }}>{cust?.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: tx, fontFamily: FONT_DISPLAY }}>{cust?.name}</div>
                  <div style={{ fontSize: 11, color: sub, fontFamily: FONT_BODY }}>Last updated · May 2025</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                {["neck", "chest", "waist", "sleeve", "shoulder"].map(k => (
                  <div key={k} style={{ background: dark ? "rgba(212,96,122,0.08)" : C.rosePale, borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
                    <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, color: C.rose, fontFamily: FONT_DISPLAY }}>{m[k]}"</div>
                    <div style={{ fontSize: 9, color: sub, textTransform: "capitalize", letterSpacing: "0.04em", fontFamily: FONT_BODY }}>{k}</div>
                  </div>
                ))}
              </div>
              {m.notes && (
                <div style={{ marginTop: 12, fontSize: 12, color: sub, fontStyle: "italic", background: dark ? "rgba(212,96,122,0.07)" : C.rosePale, padding: "9px 13px", borderRadius: 10, borderLeft: `3px solid ${C.roseMid}`, fontFamily: FONT_BODY }}>
                  "{m.notes}"
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── Invoice Page ─────────────────────────────────────────────────────────────
const InvoicePage = ({ orders, dark, toast, isMobile }) => {
  const [sel, setSel] = useState(orders[0]);
  const [showPicker, setShowPicker] = useState(false);
  const bdr = dark ? C.dmBorder : C.border;
  const sub = dark ? C.dmSubText : C.inkSoft;
  const tx = dark ? C.dmText : C.inkDark;
  const p = isMobile ? 16 : 28;

  return (
    <div style={{ padding: p, display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 14 : 24 }}>
      {isMobile ? (
        <>
          <button onClick={() => setShowPicker(true)} style={{ padding: "11px 16px", borderRadius: 12, background: dark ? C.dmSurface : C.rosePale, border: `1px solid ${bdr}`, color: tx, fontSize: 13, fontFamily: FONT_BODY, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{sel ? `${sel.customerName.split(" ")[0]} — ${sel.description.slice(0, 25)}…` : "Select an order"}</span>
            <span style={{ color: C.rose }}>▾</span>
          </button>
          {showPicker && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(60,10,20,0.5)", zIndex: 400, display: "flex", alignItems: "flex-end" }} onClick={() => setShowPicker(false)}>
              <div style={{ background: dark ? C.dmSurface : C.white, borderRadius: "20px 20px 0 0", padding: "24px 20px 40px", width: "100%", maxHeight: "70vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 700, color: tx, marginBottom: 16 }}>Select Order</div>
                {orders.slice(0, 8).map(o => (
                  <div key={o.id} onClick={() => { setSel(o); setShowPicker(false); }} style={{ padding: "13px 0", borderBottom: `1px solid ${bdr}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: tx, fontFamily: FONT_BODY }}>{o.customerName}</div>
                      <div style={{ fontSize: 12, color: sub, fontFamily: FONT_BODY }}>{o.description.slice(0, 30)}…</div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.rose, fontFamily: FONT_DISPLAY }}>{fmt(o.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ width: 230, flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: sub, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, fontFamily: FONT_BODY }}>Select Order</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {orders.slice(0, 8).map(o => (
              <div key={o.id} onClick={() => setSel(o)} style={{ padding: "12px 15px", borderRadius: 12, cursor: "pointer", background: sel?.id === o.id ? (dark ? "rgba(212,96,122,0.12)" : C.rosePale) : dark ? C.dmSurface : C.white, border: `1px solid ${sel?.id === o.id ? C.rose : bdr}`, transition: "all 0.15s" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: tx, fontFamily: FONT_DISPLAY }}>{o.customerName.split(" ")[0]}</div>
                <div style={{ fontSize: 11, color: sub, fontFamily: FONT_BODY }}>{o.description.slice(0, 28)}…</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.rose, marginTop: 4, fontFamily: FONT_DISPLAY }}>{fmt(o.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sel && (
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <button onClick={() => toast("PDF download started! 🌸")} style={{ padding: "9px 16px", borderRadius: 10, background: `linear-gradient(135deg, ${C.rose}, #B04060)`, border: "none", color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: FONT_BODY, cursor: "pointer" }}>⬇ Download PDF</button>
            <a href={`https://wa.me/234${sel.phone.slice(1)}?text=Hello ${sel.customerName.split(" ")[0]} 🌸, your invoice for "${sel.description}" is ready. Total: ${fmt(sel.amount)}. Balance: ${fmt(sel.balance)}.`}
              target="_blank" rel="noreferrer"
              style={{ padding: "9px 16px", borderRadius: 10, background: "#25D366", border: "none", color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: FONT_BODY, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              📱 WhatsApp
            </a>
          </div>

          {/* Invoice */}
          <div style={{ background: "#fff", borderRadius: 16, padding: isMobile ? 24 : 48, boxShadow: "0 8px 48px rgba(212,96,122,0.12)", border: `1px solid ${C.border}` }}>
            <div style={{ height: 5, background: `linear-gradient(90deg, ${C.roseLight}, ${C.rose}, ${C.roseLight})`, borderRadius: 5, margin: `${isMobile ? -24 : -48}px ${isMobile ? -24 : -48}px ${isMobile ? 24 : 40}px` }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isMobile ? 20 : 36, paddingBottom: isMobile ? 16 : 28, borderBottom: `1px solid ${C.border}`, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 22 : 28, fontWeight: 700, color: C.inkDark, letterSpacing: "-0.5px" }}>Pretty Benny</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 10, color: C.rose, letterSpacing: "0.45em", textTransform: "uppercase" }}>Luxe</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 6, fontFamily: FONT_BODY }}>Premium Fashion · Lagos</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: C.inkSoft, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT_BODY }}>Invoice</div>
                <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: C.rose, fontFamily: FONT_DISPLAY }}>#{String(sel.id).padStart(4, "0")}</div>
                <div style={{ fontSize: 11, color: C.inkSoft, fontFamily: FONT_BODY }}>Due: {sel.deliveryDate}</div>
              </div>
            </div>

            <div style={{ marginBottom: isMobile ? 16 : 28 }}>
              <div style={{ fontSize: 10, color: C.inkSoft, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6, fontFamily: FONT_BODY }}>Bill To</div>
              <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: C.inkDark, fontFamily: FONT_DISPLAY }}>{sel.customerName}</div>
              <div style={{ fontSize: 12, color: C.inkMid, fontFamily: FONT_BODY }}>{sel.phone}</div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: isMobile ? 16 : 28 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                  {["Description", "Qty", "Total"].map(h => (
                    <th key={h} style={{ padding: "8px 0", textAlign: "left", fontSize: 10, color: C.inkSoft, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: FONT_BODY }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "14px 0", fontSize: 13, color: C.inkDark, fontFamily: FONT_BODY }}>{sel.description}</td>
                  <td style={{ padding: "14px 0", fontSize: 13, color: C.inkMid, fontFamily: FONT_BODY }}>{sel.quantity}</td>
                  <td style={{ padding: "14px 0", fontSize: 14, fontWeight: 700, color: C.inkDark, fontFamily: FONT_DISPLAY }}>{fmt(sel.amount)}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ borderTop: `2px solid ${C.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8, maxWidth: 240, marginLeft: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.inkMid, fontFamily: FONT_BODY }}>
                <span>Subtotal</span><span>{fmt(sel.amount)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#3A8A50", fontFamily: FONT_BODY }}>
                <span>Advance</span><span>— {fmt(sel.advancePaid)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, color: sel.balance > 0 ? "#B07020" : "#3A8A50", borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 4, fontFamily: FONT_DISPLAY }}>
                <span>{sel.balance > 0 ? "Balance Due" : "Fully Paid ✓"}</span>
                <span>{fmt(sel.balance)}</span>
              </div>
            </div>

            <div style={{ marginTop: isMobile ? 24 : 40, paddingTop: 16, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: C.rose, fontFamily: FONT_DISPLAY, fontStyle: "italic" }}>Thank you for choosing Pretty Benny Luxe 🌸</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Analytics Page ───────────────────────────────────────────────────────────
const AnalyticsPage = ({ orders, dark, isMobile }) => {
  const maxRev = Math.max(...MONTHLY_REVENUE.map(m => m.revenue));
  const statusCounts = ["Pending", "In Progress", "Ready", "Delivered"].map(s => ({
    status: s, count: orders.filter(o => o.status === s).length,
  }));
  const tx = dark ? C.dmText : C.inkDark;
  const sub = dark ? C.dmSubText : C.inkSoft;
  const p = isMobile ? 16 : 28;

  return (
    <div style={{ padding: p, display: "flex", flexDirection: "column", gap: isMobile ? 14 : 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 10 : 16 }}>
        <StatCard dark={dark} label="Total Revenue" value={fmt(MONTHLY_REVENUE.reduce((s, m) => s + m.revenue, 0))} sub="All months" emoji="💕" accent={C.rose} />
        <StatCard dark={dark} label="Avg Order" value={fmt(Math.round(orders.reduce((s, o) => s + o.amount, 0) / orders.length))} sub="Per order" emoji="💎" />
        <StatCard dark={dark} label="Collection Rate" value="78%" sub="Advance paid" emoji="✨" accent="#3A8A50" style={isMobile ? { gridColumn: "1/-1" } : {}} />
      </div>

      <Card dark={dark} pink style={{ padding: isMobile ? 16 : 28 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 13 : 15, fontWeight: 700, color: tx, marginBottom: 18 }}>Monthly Revenue <Petal dark={dark} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MONTHLY_REVENUE.map(m => (
            <div key={m.month} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 32, fontSize: 12, color: sub, fontWeight: 500, fontFamily: FONT_BODY }}>{m.month}</div>
              <div style={{ flex: 1, background: dark ? "rgba(212,96,122,0.08)" : C.rosePale, borderRadius: 8, overflow: "hidden", height: 28 }}>
                <div style={{ width: `${(m.revenue / maxRev) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.rose}, ${C.roseMid})`, borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{isMobile ? `₦${(m.revenue / 1000).toFixed(0)}k` : fmt(m.revenue)}</span>
                </div>
              </div>
              <div style={{ width: 24, fontSize: 11, color: sub, textAlign: "right", fontFamily: FONT_BODY }}>{m.orders}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card dark={dark} pink style={{ padding: isMobile ? 16 : 24 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 13 : 14, fontWeight: 700, color: tx, marginBottom: 16 }}>Order Status <Petal dark={dark} /></div>
        {statusCounts.map(s => {
          const pct = Math.round((s.count / orders.length) * 100);
          const c = statusCfg[s.status];
          return (
            <div key={s.status} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: dark ? C.dmText : C.inkMid, fontFamily: FONT_BODY }}>{s.status}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.text, fontFamily: FONT_BODY }}>{s.count} ({pct}%)</span>
              </div>
              <div style={{ height: 7, background: dark ? "rgba(212,96,122,0.1)" : C.rosePale, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: c.dot, borderRadius: 4 }} />
              </div>
            </div>
          );
        })}
      </Card>

      <Card dark={dark} pink style={{ padding: isMobile ? 16 : 24 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 13 : 14, fontWeight: 700, color: tx, marginBottom: 10 }}>Outstanding <Petal dark={dark} /></div>
        <div style={{ fontSize: isMobile ? 26 : 30, fontWeight: 700, color: "#B07020", fontFamily: FONT_DISPLAY }}>{fmt(orders.reduce((s, o) => s + o.balance, 0))}</div>
        <div style={{ fontSize: 12, color: sub, marginTop: 6, fontFamily: FONT_BODY }}>Across {orders.filter(o => o.balance > 0).length} orders</div>
        <div style={{ marginTop: 10, fontSize: 12, color: C.rose, fontStyle: "italic", fontFamily: FONT_BODY }}>Chase those balances, darling 💕</div>
      </Card>
    </div>
  );
};

// ─── Settings Page ────────────────────────────────────────────────────────────
const SettingsPage = ({ dark, toast, isMobile }) => {
  const bdr = dark ? C.dmBorder : C.border;
  const tx = dark ? C.dmText : C.inkDark;
  const sub = dark ? C.dmSubText : C.inkSoft;
  const p = isMobile ? 16 : 28;

  return (
    <div style={{ padding: p, maxWidth: 560 }}>
      <Card dark={dark} pink style={{ padding: isMobile ? 24 : 36 }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${C.roseLight}, ${C.rose}, ${C.roseLight})`, borderRadius: 4, margin: `${isMobile ? -24 : -36}px ${isMobile ? -24 : -36}px ${isMobile ? 22 : 30}px` }} />
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 17 : 20, fontWeight: 700, color: tx, marginBottom: 4 }}>Studio Settings</div>
        <div style={{ fontSize: 13, color: sub, fontFamily: FONT_BODY, fontStyle: "italic", marginBottom: 22 }}>Your Pretty Benny Luxe profile</div>

        {[
          { label: "Business Name", val: "Pretty Benny Luxe" },
          { label: "Email Address", val: "prettybennyluxe@gmail.com" },
          { label: "Phone Number", val: "08012345678" },
          { label: "Studio Address", val: "Lagos, Nigeria" },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 11, color: sub, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 7, fontFamily: FONT_BODY }}>{f.label}</label>
            <input defaultValue={f.val} style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: `1px solid ${bdr}`, fontSize: 13, fontFamily: FONT_BODY, background: dark ? "#2A1018" : C.rosePale, color: tx, outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = C.rose}
              onBlur={e => e.target.style.borderColor = bdr}
            />
          </div>
        ))}

        <button onClick={() => toast("Settings saved! 🌸")} style={{
          padding: "12px 28px", borderRadius: 12, marginTop: 6,
          background: `linear-gradient(135deg, ${C.rose}, #B04060)`,
          border: "none", color: "#fff", fontSize: 13, fontWeight: 700,
          fontFamily: FONT_BODY, cursor: "pointer", boxShadow: "0 6px 20px rgba(212,96,122,0.3)",
        }}>Save Changes 🌸</button>
      </Card>
    </div>
  );
};

// ─── More Page (mobile overflow nav) ─────────────────────────────────────────
const MorePage = ({ page, setPage, dark }) => {
  const tx = dark ? C.dmText : C.inkDark;
  const sub = dark ? C.dmSubText : C.inkSoft;
  const bdr = dark ? C.dmBorder : C.border;
  const extraNavItems = NAV.slice(5); // analytics, settings

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: tx, marginBottom: 16 }}>More</div>
      {extraNavItems.map(n => (
        <div key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 16px", borderRadius: 14, border: `1px solid ${bdr}`, marginBottom: 10, cursor: "pointer", background: dark ? C.dmSurface : C.white }}>
          <span style={{ fontSize: 20 }}>{n.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: tx, fontFamily: FONT_BODY }}>{n.label}</span>
          <span style={{ marginLeft: "auto", color: sub, fontSize: 12 }}>›</span>
        </div>
      ))}
    </div>
  );
};

// ─── Login Page ───────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, isMobile }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", background: C.cream, display: "flex", flexDirection: "column", fontFamily: FONT_BODY }}>
        {/* Mobile hero header */}
        <div style={{
          background: "linear-gradient(145deg, #3D1020 0%, #5C1832 50%, #3D1020 100%)",
          padding: "60px 28px 40px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "10%", left: "10%", width: 120, height: 120, borderRadius: "50%", background: "rgba(245,198,208,0.05)" }} />
          <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: 160, height: 160, borderRadius: "50%", background: "rgba(245,198,208,0.04)" }} />
          <div style={{ fontSize: 9, color: "rgba(245,198,208,0.4)", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 14 }}>✦ Est. Lagos ✦</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 700, color: C.roseLight, lineHeight: 1.1, letterSpacing: "-0.5px" }}>Pretty</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 300, color: C.roseLight, lineHeight: 1.1, letterSpacing: "-0.5px" }}>Benny</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 400, color: "rgba(245,198,208,0.4)", letterSpacing: "0.55em", textTransform: "uppercase", marginTop: 10 }}>Luxe</div>
        </div>

        {/* Form */}
        <div style={{ flex: 1, padding: "32px 24px 40px" }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 10, color: C.rose, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>✦ Studio Portal</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 700, color: C.inkDark }}>Welcome back, darling 🌷</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Email Address", val: email, set: setEmail, type: "email", placeholder: "admin@prettybennyluxe.com" },
              { label: "Password", val: pass, set: setPass, type: "password", placeholder: "••••••••" },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 11, color: C.inkMid, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={f.val} onChange={e => f.set(e.target.value)}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: FONT_BODY, background: C.rosePale, color: C.inkDark, outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = C.rose}
                  onBlur={e => e.target.style.borderColor = C.border}
                  onKeyDown={e => e.key === "Enter" && onLogin()}
                />
              </div>
            ))}
            <button onClick={onLogin} style={{ padding: "15px", borderRadius: 14, marginTop: 6, background: `linear-gradient(135deg, ${C.rose}, #A03050)`, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: FONT_DISPLAY, cursor: "pointer", letterSpacing: "0.04em", boxShadow: "0 8px 28px rgba(212,96,122,0.38)" }}>
              Sign In to Studio 🌸
            </button>
            <div style={{ textAlign: "center", fontSize: 12, color: C.inkSoft, fontStyle: "italic" }}>Demo: use any email & password</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: FONT_BODY }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 56, background: "linear-gradient(145deg, #3D1020 0%, #5C1832 40%, #3D1020 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "10%", width: 200, height: 200, borderRadius: "50%", background: "rgba(245,198,208,0.06)" }} />
        <div style={{ position: "absolute", bottom: "12%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "rgba(245,198,208,0.04)" }} />
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 10, color: "rgba(245,198,208,0.4)", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 16 }}>✦ Est. Lagos ✦</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 58, fontWeight: 700, color: C.roseLight, lineHeight: 1.05, letterSpacing: "-1px" }}>Pretty</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 58, fontWeight: 300, color: C.roseLight, lineHeight: 1.05, letterSpacing: "-1px" }}>Benny</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 400, color: "rgba(245,198,208,0.4)", letterSpacing: "0.55em", textTransform: "uppercase", marginTop: 12 }}>Luxe</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,198,208,0.25))" }} />
            <span style={{ color: "rgba(245,198,208,0.35)", fontSize: 14 }}>🌸</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(245,198,208,0.25), transparent)" }} />
          </div>
          <div style={{ fontSize: 14, color: "rgba(245,198,208,0.4)", lineHeight: 1.9, fontStyle: "italic" }}>
            "Where elegance meets<br />craftsmanship"
          </div>
        </div>
      </div>
      <div style={{ width: 460, background: C.cream, display: "flex", flexDirection: "column", justifyContent: "center", padding: 56, borderLeft: `1px solid ${C.border}` }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 10, color: C.rose, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>✦ Studio Portal</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 700, color: C.inkDark, lineHeight: 1.25 }}>Welcome back to<br />Pretty Benny Luxe</div>
          <div style={{ fontSize: 14, color: C.inkSoft, marginTop: 10, fontStyle: "italic" }}>Sign in to your studio, darling 🌷</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { label: "Email Address", val: email, set: setEmail, type: "email", placeholder: "admin@prettybennyluxe.com" },
            { label: "Password", val: pass, set: setPass, type: "password", placeholder: "••••••••" },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: 11, color: C.inkMid, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={f.val} onChange={e => f.set(e.target.value)}
                style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: FONT_BODY, background: C.rosePale, color: C.inkDark, outline: "none", boxSizing: "border-box" }}
                onFocus={e => { e.target.style.borderColor = C.rose; e.target.style.background = "#fff"; }}
                onBlur={e => { e.target.style.borderColor = C.border; e.target.style.background = C.rosePale; }}
                onKeyDown={e => e.key === "Enter" && onLogin()}
              />
            </div>
          ))}
          <button onClick={onLogin} style={{ padding: "14px", borderRadius: 14, marginTop: 6, background: `linear-gradient(135deg, ${C.rose}, #A03050)`, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: FONT_DISPLAY, cursor: "pointer", letterSpacing: "0.04em", boxShadow: "0 8px 28px rgba(212,96,122,0.38)" }}>
            Sign In to Studio 🌸
          </button>
          <div style={{ textAlign: "center", fontSize: 12, color: C.inkSoft, fontStyle: "italic" }}>Demo: use any email & password</div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 22, borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.inkSoft, textAlign: "center" }}>
          Pretty Benny Luxe · Fashion Studio Management · Lagos
        </div>
      </div>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const isMobile = useIsMobile();
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [toastMsg, setToastMsg] = useState(null);

  const toast = useCallback((msg) => setToastMsg(msg), []);

  const PAGE_TITLES = {
    dashboard: "Dashboard", orders: "Orders", customers: "Clients",
    measurements: "Measurements", invoices: "Invoices",
    analytics: "Analytics", settings: "Settings", more: "More",
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} isMobile={isMobile} />;

  const mobileNav = [
    { id: "dashboard", label: "Home", icon: "◈" },
    { id: "orders", label: "Orders", icon: "◧" },
    { id: "customers", label: "Clients", icon: "◉" },
    { id: "invoices", label: "Invoices", icon: "◫" },
    { id: "more", label: "More", icon: "⋯" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: dark ? C.dmBg : C.cream, fontFamily: FONT_BODY, color: dark ? C.dmText : C.inkDark }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes slideUp { from { transform: translateY(18px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,96,122,0.25); border-radius: 4px; }
        input, textarea, button, a { font-family: inherit; }
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* Desktop sidebar */}
      {!isMobile && <Sidebar page={page} setPage={setPage} dark={dark} />}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar title={PAGE_TITLES[page]} dark={dark} setDark={setDark} isMobile={isMobile} page={page} />

        <main style={{ flex: 1, overflowY: "auto", paddingBottom: isMobile ? 80 : 0 }}>
          {page === "dashboard" && <Dashboard orders={orders} dark={dark} isMobile={isMobile} />}
          {page === "orders" && <OrdersPage orders={orders} setOrders={setOrders} dark={dark} toast={toast} isMobile={isMobile} />}
          {page === "customers" && <CustomersPage orders={orders} dark={dark} isMobile={isMobile} />}
          {page === "measurements" && <MeasurementsPage dark={dark} isMobile={isMobile} />}
          {page === "invoices" && <InvoicePage orders={orders} dark={dark} toast={toast} isMobile={isMobile} />}
          {page === "analytics" && <AnalyticsPage orders={orders} dark={dark} isMobile={isMobile} />}
          {page === "settings" && <SettingsPage dark={dark} toast={toast} isMobile={isMobile} />}
          {page === "more" && <MorePage page={page} setPage={setPage} dark={dark} />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
          background: dark
            ? "linear-gradient(180deg, #1F0E14 0%, #2C1019 100%)"
            : "linear-gradient(180deg, #3D1020 0%, #5C1832 100%)",
          borderTop: "1px solid rgba(245,198,208,0.15)",
          display: "flex", alignItems: "stretch",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}>
          {mobileNav.map(n => {
            const active = page === n.id || (n.id === "more" && ["analytics", "settings", "measurements"].includes(page));
            return (
              <button key={n.id} onClick={() => setPage(n.id)} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 3, padding: "10px 4px", border: "none", cursor: "pointer",
                background: active ? "rgba(245,198,208,0.12)" : "transparent",
                color: active ? C.roseLight : "rgba(245,198,208,0.38)",
                fontSize: 15, transition: "all 0.18s",
                borderTop: active ? `2px solid ${C.roseLight}` : "2px solid transparent",
              }}>
                <span>{n.icon}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.04em", fontFamily: FONT_BODY, fontWeight: active ? 600 : 400 }}>{n.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}
    </div>
  );
}