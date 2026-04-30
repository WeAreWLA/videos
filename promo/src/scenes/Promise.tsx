import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, portraits } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";
import { SafeImg } from "../lib/SafeImg";

export const Promise: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const imgOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  const imgScale = interpolate(frame, [0, durationInFrames], [1.05, 1.18]);
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const lineW = interpolate(frame, [20, 50], [0, 220], { extrapolateRight: "clamp" });

  const words = ["Sustainable.", "Flexible.", "Yours."];
  const wordOpacities = words.map((_, i) =>
    interpolate(frame, [40 + i * 18, 58 + i * 18], [0, 1], { extrapolateRight: "clamp" }),
  );
  const wordYs = words.map((_, i) =>
    interpolate(frame, [40 + i * 18, 58 + i * 18], [30, 0], { extrapolateRight: "clamp" }),
  );

  const sub = interpolate(frame, [110, 130], [0, 1], { extrapolateRight: "clamp" });
  const subY = interpolate(frame, [110, 130], [16, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: colors.navy, opacity: exitOpacity }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <SafeImg
          src={portraits.laughing}
          label="Founder · laughing"
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
          background: `linear-gradient(180deg, rgba(0,48,96,0.15) 0%, rgba(0,48,96,0.6) 50%, rgba(0,48,96,0.95) 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          padding: 80,
          paddingBottom: 200,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: lineW,
            height: 2,
            background: colors.blush,
            marginBottom: 36,
          }}
        />

        <div
          style={{
            fontFamily: baskerville,
            color: colors.cream,
            fontSize: 110,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {words.map((w, i) => (
            <div
              key={w}
              style={{
                opacity: wordOpacities[i],
                transform: `translateY(${wordYs[i]}px)`,
                fontStyle: i === 1 ? "italic" : "normal",
                fontWeight: i === 1 ? 400 : 700,
              }}
            >
              {w}
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: colors.cream,
            fontSize: 30,
            marginTop: 36,
            opacity: sub,
            transform: `translateY(${subY}px)`,
            letterSpacing: 1,
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          Sustainable weight loss that fits your life.
          <br />
          Simple. Flexible. Science-backed.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
