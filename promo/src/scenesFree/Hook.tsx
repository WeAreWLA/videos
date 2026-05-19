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
  const freeY = interpolate(freeIn, [0, 1], [20, 0]);

  const number = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, mass: 0.6 },
  });

  const fatLoss = spring({
    frame: frame - 26,
    fps,
    config: { damping: 18 },
  });
  const reset = spring({
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
            fontSize: 150,
            fontStyle: "italic",
            fontWeight: 500,
            opacity: freeIn,
            transform: `translateY(${freeY}px)`,
            lineHeight: 1,
          }}
        >
          Free
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 28,
            opacity: number,
            transform: `scale(${interpolate(number, [0, 1], [0.7, 1])})`,
            marginTop: 18,
          }}
        >
          <div
            style={{
              fontFamily: baskerville,
              color: c.navy,
              fontSize: 320,
              fontWeight: 700,
              lineHeight: 0.9,
            }}
          >
            5
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: c.navy,
              fontSize: 140,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: 2,
            }}
          >
            day
          </div>
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 100,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: fatLoss,
            transform: `translateY(${interpolate(fatLoss, [0, 1], [30, 0])}px)`,
            marginTop: 16,
            lineHeight: 1,
          }}
        >
          Fat Loss
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 100,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: reset,
            transform: `translateY(${interpolate(reset, [0, 1], [30, 0])}px)`,
            marginTop: 18,
            lineHeight: 1,
          }}
        >
          Reset
        </div>

        <div
          style={{
            width: lineW,
            height: 2,
            background: c.coral,
            marginTop: 38,
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
