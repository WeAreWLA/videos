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

const items = [
  { t: "5 Day Reset Protocol Guide" },
  { t: "Live Daily Coaching" },
  { t: "Private Facebook Group" },
  { t: "Daily Check-Ins" },
  { t: "The No-Fuss Batch Cookbook", bonus: true },
];

const Feat: React.FC<{
  index: number;
  title: string;
  bonus?: boolean;
  baseDelay: number;
}> = ({ index, title, bonus, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 10;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.6 },
  });
  const y = interpolate(enter, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: "relative",
        background: c.paper,
        border: `1px solid rgba(14,39,70,0.08)`,
        borderRadius: 18,
        padding: "26px 32px",
        opacity: enter,
        transform: `translateY(${y}px)`,
        boxShadow: "0 22px 46px -26px rgba(14,39,70,0.22)",
        display: "flex",
        alignItems: "center",
        gap: 30,
      }}
    >
      {bonus ? (
        <div
          style={{
            position: "absolute",
            top: -14,
            right: 20,
            background: c.coral,
            color: "#fff",
            fontFamily: alegreya,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 999,
            boxShadow: "0 10px 24px -10px rgba(217,119,87,0.6)",
          }}
        >
          Bonus
        </div>
      ) : null}
      <div
        style={{
          flex: "none",
          width: 86,
          height: 86,
          borderRadius: 18,
          background: c.cream2,
          color: c.coral,
          fontFamily: baskerville,
          fontWeight: 700,
          fontSize: 44,
          display: "grid",
          placeItems: "center",
        }}
      >
        0{index + 1}
      </div>
      <div
        style={{
          fontFamily: baskerville,
          color: c.navy,
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: -0.5,
          flex: 1,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const Inside: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const eyebrow = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const head = interpolate(frame, [6, 26], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [6, 26], [22, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: c.cream, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          padding: 60,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: c.coral,
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: eyebrow,
            marginBottom: 22,
          }}
        >
          What you get
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 70,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1,
            opacity: head,
            transform: `translateY(${headY}px)`,
            marginBottom: 42,
          }}
        >
          5 days,{" "}
          <span style={{ fontStyle: "italic", color: c.coral, fontWeight: 500 }}>
            properly supported.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {items.map((it, i) => (
            <Feat
              key={it.t}
              index={i}
              title={it.t}
              bonus={it.bonus}
              baseDelay={28}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
