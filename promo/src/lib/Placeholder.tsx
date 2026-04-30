import React from "react";
import { colors } from "./brand";
import { alegreya } from "./fonts";

export const Placeholder: React.FC<{ label: string; bg?: string }> = ({
  label,
  bg = colors.beige,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `repeating-linear-gradient(45deg, ${bg}, ${bg} 24px, ${colors.cream} 24px, ${colors.cream} 48px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: alegreya,
        color: colors.navy,
        opacity: 0.55,
        fontSize: 28,
        letterSpacing: 2,
        textTransform: "uppercase",
        textAlign: "center",
        padding: 24,
      }}
    >
      {label}
    </div>
  );
};
