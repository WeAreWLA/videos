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

  const freeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fatLoss = interpolate(frame, [8, 28], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fatLossY = interpolate(fatLoss, [0, 1], [20, 0]);

  const number = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16, mass: 0.6 },
  });
  const dayReset = spring({
    frame: frame - 38,
    fps,
    config: { damping: 18 },
  });

  const lineW = interpolate(frame, [60, 90], [0, 360], {
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
            fontFamily: baskerville,
            color: c.coral,
            fontSize: 130,
            fontStyle: "italic",
            fontWeight: 500,
            opacity: freeIn,
            lineHeight: 1,
          }}
        >
          Free
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: fatLoss,
            transform: `translateY(${fatLossY}px)`,
            marginTop: 14,
            lineHeight: 1,
          }}
        >
          Fat Loss
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 540,
            fontWeight: 700,
            lineHeight: 0.9,
            transform: `scale(${interpolate(number, [0, 1], [0.6, 1])})`,
            opacity: number,
            marginTop: 14,
            marginBottom: 0,
          }}
        >
          5
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: dayReset,
            transform: `translateY(${interpolate(dayReset, [0, 1], [40, 0])}px)`,
            marginTop: -10,
            lineHeight: 1,
          }}
        >
          Day Reset
        </div>

        <div
          style={{
            width: lineW,
            height: 2,
            background: c.coral,
            marginTop: 36,
          }}
        />

        <div
          style={{
            fontFamily: alegreya,
            color: c.ink,
            fontSize: 50,
            fontWeight: 500,
            letterSpacing: 1,
            marginTop: 28,
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
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginTop: 30,
            opacity: dateIn,
            background: c.cream2,
            padding: "14px 32px",
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
