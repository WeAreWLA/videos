import React from "react";
import { colors } from "./brand";
import { baskerville } from "./fonts";

export const Monogram: React.FC<{
  size?: number;
  color?: string;
  showSub?: boolean;
}> = ({ size = 56, color = colors.navy, showSub = true }) => {
  return (
    <div
      style={{
        fontFamily: baskerville,
        color,
        textAlign: "center",
        lineHeight: 1,
      }}
    >
      <div
        style={{
          fontSize: size,
          fontWeight: 700,
          letterSpacing: size * 0.05,
        }}
      >
        WLA
      </div>
      {showSub ? (
        <div
          style={{
            marginTop: size * 0.18,
            fontSize: size * 0.22,
            letterSpacing: size * 0.12,
            textTransform: "uppercase",
          }}
        >
          The Weight Loss Academy
        </div>
      ) : null}
    </div>
  );
};
