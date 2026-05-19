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
  { t: "Daily Live Coaching", s: "Show up daily with Anna." },
  { t: "Bank Holiday Prep Day", s: "Start strong, not stressed." },
  { t: "Private Facebook Group", s: "Daily check-ins. Real support." },
  { t: "Batch Cookbook (Bonus)", s: "Yours to keep.", bonus: true },
];

const Feat: React.FC<{
  index: number;
  title: string;
  sub: string;
  bonus?: boolean;
  baseDelay: number;
}> = ({ index, title, sub, bonus, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 14;
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
        padding: "30px 32px",
        opacity: enter,
        transform: `translateY(${y}px)`,
        boxShadow: "0 24px 50px -28px rgba(14,39,70,0.22)",
        display: "flex",
        alignItems: "center",
        gap: 28,
      }}
    >
      {bonus ? (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: c.coral,
            color: "#fff",
            fontFamily: alegreya,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 999,
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
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -0.5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: alegreya,
            color: c.ink,
            fontSize: 30,
            fontWeight: 500,
            lineHeight: 1.35,
            marginTop: 8,
          }}
        >
          {sub}
        </div>
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

  const eyebrow = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: "clamp",
  });
  const head = interpolate(frame, [8, 28], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [8, 28], [22, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: c.cream, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          padding: 80,
          paddingTop: 130,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: c.coral,
            fontSize: 30,
            fontWeight: 600,
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
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1,
            opacity: head,
            transform: `translateY(${headY}px)`,
            marginBottom: 50,
          }}
        >
          5 days,
          <br />
          <span style={{ fontStyle: "italic", color: c.coral, fontWeight: 500 }}>
            properly supported.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {items.map((it, i) => (
            <Feat
              key={it.t}
              index={i}
              title={it.t}
              sub={it.s}
              bonus={it.bonus}
              baseDelay={28}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
