import type { CSSProperties } from "react";

const iconStyle: CSSProperties = {
  width: 14,
  height: 14,
  display: "inline-block",
};

export function ZapActionLogo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <svg viewBox="0 0 24 24" aria-hidden="true" style={iconStyle}>
        <path fill="#6366f1" d="M13 2 4 14h6l-1 8 11-14h-6l-1-6Z" />
        <circle cx="19" cy="18" r="3" fill="#22c55e" />
      </svg>
      <strong>ZapAction</strong>
    </span>
  );
}
