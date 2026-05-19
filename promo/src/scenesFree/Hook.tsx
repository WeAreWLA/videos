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

  const freeIn = interpolate(frame, [10, 32], [0, 1], {
    extrapolateRight: "clamp",
  });
  const freeY = interpolate(freeIn, [0, 1], [30, 0]);

  const number = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, mass: 0.6 },
  });
  const dayText = spring({
    frame: frame - 32,
    fps,
    config: { damping: 18 },
  });

  const lineW = interpolate(frame, [60, 90], [0, 320], {
    extrapolateRight: "clamp",
  });
  const sub = interpolate(frame, [70, 92], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dateIn = interpolate(frame, [90, 115], [0, 1], {
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
          padding: 70,
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: c.coral,
            fontSize: 46,
            fontWeight: 700,
            letterSpacing: 10,
            textTransform: "uppercase",
            opacity: eyebrowIn,
            marginBottom: 36,
            textAlign: "center",
          }}
        >
          Fat Loss Reset
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.coral,
            fontSize: 124,
            fontStyle: "italic",
            fontWeight: 500,
            opacity: freeIn,
            transform: `translateY(${freeY}px)`,
            lineHeight: 1,
            marginBottom: -10,
          }}
        >
          Free
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 520,
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
            fontSize: 154,
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
            width: lineW,
            height: 2,
            background: c.coral,
            marginTop: 30,
          }}
        />

        <div
          style={{
            fontFamily: alegreya,
            color: c.ink,
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: 1,
            marginTop: 32,
            textAlign: "center",
            opacity: sub,
            lineHeight: 1.2,
          }}
        >
          for women{" "}
          <span
            style={{
              fontFamily: baskerville,
              fontStyle: "italic",
              color: c.navy,
              fontWeight: 700,
            }}
          >
            45+
          </span>
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: c.navy,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginTop: 36,
            opacity: dateIn,
            background: c.cream2,
            padding: "16px 36px",
            borderRadius: 999,
            textAlign: "center",
          }}
        >
          Live · Mon 1st – Fri 5th June
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
