import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";
import { Monogram } from "../lib/Monogram";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const number = spring({ frame, fps, config: { damping: 16, mass: 0.6 } });
  const days = spring({ frame: frame - 10, fps, config: { damping: 18 } });
  const sub = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const subY = interpolate(frame, [25, 45], [20, 0], { extrapolateRight: "clamp" });
  const mono = interpolate(frame, [55, 80], [0, 1], { extrapolateRight: "clamp" });

  const lineW = interpolate(frame, [40, 70], [0, 240], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${colors.beige} 0%, ${colors.cream} 60%)`,
          opacity: 0.7,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 80,
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: colors.blushDeep,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: 10,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            marginBottom: 40,
          }}
        >
          The 21 Day Fat Loss Reset
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: colors.navy,
            fontSize: 360,
            fontWeight: 700,
            lineHeight: 0.9,
            transform: `scale(${interpolate(number, [0, 1], [0.6, 1])})`,
            opacity: number,
          }}
        >
          21
        </div>
        <div
          style={{
            fontFamily: baskerville,
            color: colors.navy,
            fontSize: 110,
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: 4,
            opacity: days,
            transform: `translateY(${interpolate(days, [0, 1], [40, 0])}px)`,
            marginTop: -20,
          }}
        >
          days
        </div>

        <div
          style={{
            width: lineW,
            height: 2,
            background: colors.blush,
            marginTop: 36,
          }}
        />

        <div
          style={{
            fontFamily: alegreya,
            color: colors.ink,
            fontSize: 42,
            fontWeight: 400,
            letterSpacing: 1,
            marginTop: 40,
            textAlign: "center",
            opacity: sub,
            transform: `translateY(${subY}px)`,
            maxWidth: 880,
          }}
        >
          lose weight. curb cravings.
          <br />
          boost energy.
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: mono,
        }}
      >
        <Monogram size={36} />
      </div>
    </AbsoluteFill>
  );
};
