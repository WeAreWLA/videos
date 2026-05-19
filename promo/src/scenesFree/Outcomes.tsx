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
  { stat: "2–7 lbs", t: "Scales shift by day 5" },
  { stat: "1–3 days", t: "Sugar cravings handled" },
  { stat: "All day", t: "Steady, balanced energy" },
  { stat: "Real food", t: "No banned lists" },
  { stat: "Real life", t: "Food you'll actually enjoy" },
  { stat: "5 days +", t: "A reset you can keep going" },
];

const Win: React.FC<{
  index: number;
  stat: string;
  title: string;
  baseDelay: number;
}> = ({ index, stat, title, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 8;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.55 },
  });
  const x = interpolate(enter, [0, 1], [-30, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        opacity: enter,
        transform: `translateX(${x}px)`,
        background: c.paper,
        border: `1px solid rgba(14,39,70,0.08)`,
        borderRadius: 18,
        padding: "24px 30px",
        boxShadow: "0 18px 38px -24px rgba(14,39,70,0.22)",
      }}
    >
      <div
        style={{
          flex: "none",
          minWidth: 240,
          fontFamily: baskerville,
          color: c.coral,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1.05,
          letterSpacing: -0.5,
        }}
      >
        {stat}
      </div>
      <div
        style={{
          flex: 1,
          fontFamily: baskerville,
          color: c.navy,
          fontSize: 38,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: -0.5,
          borderLeft: `2px solid ${c.cream2}`,
          paddingLeft: 28,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const Outcomes: React.FC = () => {
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
    <AbsoluteFill style={{ background: c.cream2, opacity: exitOpacity }}>
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
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: eyebrow,
            marginBottom: 22,
          }}
        >
          What you'll walk away with
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: -1.5,
            opacity: head,
            transform: `translateY(${headY}px)`,
            marginBottom: 42,
          }}
        >
          Your{" "}
          <span style={{ fontStyle: "italic", color: c.coral, fontWeight: 500 }}>
            5 day wins.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {items.map((it, i) => (
            <Win
              key={it.t}
              index={i}
              stat={it.stat}
              title={it.t}
              baseDelay={28}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
