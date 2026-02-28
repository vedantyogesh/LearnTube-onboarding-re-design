import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useFlow } from "../context/FlowContext";

const GOALS = [
  {
    id: "data",
    emoji: "📊",
    title: "Data & Analytics",
    subtitle: "Data Analyst, BI Analyst, Data Engineer",
    salary: "₹6–18 LPA",
  },
  {
    id: "ai",
    emoji: "🤖",
    title: "AI & Machine Learning",
    subtitle: "ML Engineer, AI Developer, Research Analyst",
    salary: "₹10–28 LPA",
  },
  {
    id: "backend",
    emoji: "⚙️",
    title: "Backend Development",
    subtitle: "Backend Dev, SDE, API Engineer",
    salary: "₹8–22 LPA",
  },
  {
    id: "unsure",
    emoji: "🧭",
    title: "I'm not sure yet",
    subtitle: "We'll help you figure it out",
    salary: null,
  },
];

function RadioDot({ selected }) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: `2px solid ${selected ? "var(--cyan)" : "rgba(255,255,255,0.15)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginLeft: "auto",
        transition: "border-color 0.15s",
      }}
    >
      {selected && (
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--cyan)",
            boxShadow: "0 0 8px var(--cyan-glow)",
          }}
        />
      )}
    </div>
  );
}

export default function GoalScreen() {
  const [selected, setSelected] = useState(null);
  const { setGoal } = useFlow();
  const navigate = useNavigate();

  function handleContinue() {
    if (!selected) return;
    setGoal(selected);
    navigate("/skill");
  }

  return (
    <div
      className="screen-enter"
      style={{ minHeight: "100vh", paddingBottom: "90px" }}
    >
      <Header />

      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 20px" }}>
        {/* Illustration */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "24px 0 16px",
          }}
        >
          <svg
            width="200"
            height="180"
            viewBox="0 0 200 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Glow */}
            <ellipse
              cx="100"
              cy="90"
              rx="80"
              ry="80"
              fill="var(--cyan)"
              opacity="0.05"
              filter="blur(20px)"
            />
            {/* Career path illustration — fork in road */}
            <ellipse
              cx="100"
              cy="160"
              rx="80"
              ry="12"
              fill="rgba(15,28,54,0.6)"
            />
            {/* Ground */}
            <rect x="85" y="100" width="30" height="60" rx="4" fill="#0A1628" />
            {/* Left path */}
            <rect x="30" y="90" width="55" height="14" rx="7" fill="#1F3A5A" />
            <rect
              x="28"
              y="88"
              width="55"
              height="14"
              rx="7"
              fill="#0F1C36"
              stroke="#1F3A5A"
              strokeWidth="1.5"
            />
            {/* Right path */}
            <rect
              x="115"
              y="90"
              width="55"
              height="14"
              rx="7"
              fill="#0F1C36"
              stroke="#1F3A5A"
              strokeWidth="1.5"
            />
            {/* Compass circle */}
            <circle
              cx="100"
              cy="65"
              r="38"
              fill="#0A1628"
              stroke="rgba(0, 210, 255, 0.2)"
              strokeWidth="1.5"
            />
            <circle cx="100" cy="65" r="32" fill="#0F1C36" />
            {/* Compass markings */}
            <text
              x="100"
              y="42"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="9"
              fontFamily="Sora"
            >
              N
            </text>
            <text
              x="100"
              y="92"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="9"
              fontFamily="Sora"
            >
              S
            </text>
            <text
              x="75"
              y="69"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="9"
              fontFamily="Sora"
            >
              W
            </text>
            <text
              x="125"
              y="69"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="9"
              fontFamily="Sora"
            >
              E
            </text>
            {/* Compass needle */}
            <polygon points="100,45 104,65 100,58 96,65" fill="#33DDFF" />
            <polygon points="100,85 104,65 100,72 96,65" fill="#007B99" />
            <circle
              cx="100"
              cy="65"
              r="4"
              fill="#0A1628"
              stroke="#33DDFF"
              strokeWidth="1"
            />
            {/* Person figure */}
            <circle cx="100" cy="108" r="6" fill="#00D2FF" />
            <line
              x1="100"
              y1="114"
              x2="100"
              y2="130"
              stroke="#00D2FF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="92"
              y1="120"
              x2="108"
              y2="120"
              stroke="#00D2FF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="100"
              y1="130"
              x2="94"
              y2="145"
              stroke="#00D2FF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="100"
              y1="130"
              x2="106"
              y2="145"
              stroke="#00D2FF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left path label */}
            <text
              x="57"
              y="87"
              textAnchor="middle"
              fill="#A0B4CC"
              fontSize="8"
              fontFamily="Sora"
              fontWeight="600"
            >
              DATA
            </text>
            {/* Right path label */}
            <text
              x="143"
              y="87"
              textAnchor="middle"
              fill="#A0B4CC"
              fontSize="8"
              fontFamily="Sora"
              fontWeight="600"
            >
              AI/ML
            </text>
            {/* Stars */}
            <circle cx="160" cy="25" r="2" fill="white" opacity="0.4" />
            <circle cx="40" cy="30" r="1.5" fill="white" opacity="0.3" />
            <circle cx="175" cy="55" r="1" fill="white" opacity="0.5" />
            <circle cx="25" cy="60" r="2" fill="white" opacity="0.3" />
          </svg>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(0, 200, 224, 0.1)",
            border: "1px solid rgba(0, 200, 224, 0.25)",
            borderRadius: "999px",
            padding: "4px 12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--cyan)",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              color: "var(--cyan)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
            }}
          >
            Python Career Path
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "26px",
            lineHeight: 1.25,
            marginBottom: "8px",
            letterSpacing: "-0.5px",
          }}
        >
          What are you <span style={{ color: "var(--cyan)" }}>aiming for?</span>
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          Pick your career goal. Your course, roadmap, and projects will be
          built around this.
        </p>

        {/* Goal options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          {GOALS.map((g) => (
            <button
              key={g.id}
              className={`option-btn${selected === g.id ? " selected" : ""}`}
              onClick={() => setSelected(g.id)}
            >
              <span style={{ fontSize: "22px", flexShrink: 0 }}>{g.emoji}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "var(--text-primary)",
                    marginBottom: "2px",
                  }}
                >
                  {g.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {g.subtitle}
                </div>
              </div>
              {g.salary && (
                <div
                  style={{
                    background: "rgba(0, 210, 255, 0.1)",
                    border: "1px solid rgba(0, 210, 255, 0.2)",
                    borderRadius: "6px",
                    padding: "3px 8px",
                    fontSize: "11px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "var(--cyan)",
                    flexShrink: 0,
                    boxShadow: "0 0 10px rgba(0, 210, 255, 0.05)",
                  }}
                >
                  {g.salary}
                </div>
              )}
              <RadioDot selected={selected === g.id} />
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div
          className="glass-panel"
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {[
            ["10 Lakh+", "Active Users"],
            ["4.8/5", "Course Rating"],
            ["34 Lakh", "Highest Package"],
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "var(--text-primary)",
                }}
              >
                {val}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bar */}
      <div className="sticky-bar slide-up">
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <button
            className="btn-primary"
            disabled={!selected}
            onClick={handleContinue}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
