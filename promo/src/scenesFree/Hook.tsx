import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colorsFree as c } from "../lib/brandFree";
import { baskerville, alegreya } from "../lib/fonts";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const number = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.6 },
  });
  const dayText = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18 },
  });

  const freeIn = interpolate(frame, [30, 52], [0, 1], {
    extrapolateRight: "clamp",
  });
  const freeY = interpolate(freeIn, [0, 1], [30, 0]);

  const sub = interpolate(frame, [44, 64], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lineW = interpolate(frame, [40, 70], [0, 280], {
    extrapolateRight: "clamp",
  });

  const dateIn = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: c.cream }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${c.cream2} 0%, ${c.cream} 60%)`,
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
            color: c.coral,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: 10,
            textTransform: "uppercase",
            opacity: eyebrowIn,
            marginBottom: 40,
          }}
        >
          Fat Loss Reset
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 460,
            fontWeight: 700,
            lineHeight: 0.9,
            transform: `scale(${interpolate(number, [0, 1], [0.6, 1])})`,
            opacity: number,
          }}
        >
          5
        </div>
        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 134,
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: 4,
            opacity: dayText,
            transform: `translateY(${interpolate(dayText, [0, 1], [40, 0])}px)`,
            marginTop: -20,
          }}
        >
          days
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.coral,
            fontSize: 96,
            fontStyle: "italic",
            fontWeight: 500,
            opacity: freeIn,
            transform: `translateY(${freeY}px)`,
            marginTop: 18,
            lineHeight: 1,
          }}
        >
          free
        </div>

        <div
          style={{
            width: lineW,
            height: 2,
            background: c.coral,
            marginTop: 32,
          }}
        />

        <div
          style={{
            fontFamily: alegreya,
            color: c.ink,
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: 1,
            marginTop: 36,
            textAlign: "center",
            opacity: sub,
            maxWidth: 880,
            lineHeight: 1.25,
          }}
        >
          for women <span style={{ fontFamily: baskerville, fontStyle: "italic", color: c.navy }}>45+</span>
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: c.navy,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginTop: 40,
            opacity: dateIn,
            background: c.cream2,
            padding: "12px 28px",
            borderRadius: 999,
          }}
        >
          Live · 1–5 June
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
