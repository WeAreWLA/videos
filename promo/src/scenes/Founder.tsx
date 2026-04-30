import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, portraits } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";
import { SafeImg } from "../lib/SafeImg";

export const Founder: React.FC = () => {
  const frame = useCurrentFrame();

  const imgScale = interpolate(frame, [0, 135], [1.08, 1.18]);
  const imgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [120, 135], [1, 0], { extrapolateRight: "clamp" });

  const eyebrow = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const headline = interpolate(frame, [22, 50], [0, 1], { extrapolateRight: "clamp" });
  const headlineY = interpolate(frame, [22, 50], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: colors.cream, opacity: fadeOut }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <SafeImg
          src={portraits.kitchen}
          label="Founder · kitchen"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            opacity: imgOpacity,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(0,48,96,0) 35%, rgba(0,48,96,0.55) 70%, rgba(0,48,96,0.85) 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          padding: 80,
          paddingBottom: 160,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: colors.blush,
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: eyebrow,
            marginBottom: 28,
          }}
        >
          For women who are done with diets
        </div>
        <div
          style={{
            fontFamily: baskerville,
            color: colors.cream,
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            opacity: headline,
            transform: `translateY(${headlineY}px)`,
            maxWidth: 920,
          }}
        >
          Real food.
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>Real life.</span>
          <br />
          Real results.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
