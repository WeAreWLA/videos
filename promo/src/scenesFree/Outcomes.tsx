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
  {
    stat: "2–7 lbs",
    t: "Scales shift by day 5",
    d: "Many women notice the scales drop by day 5, largely from reduced bloating and water retention that builds up from processed foods, sugar and inconsistent eating habits.",
  },
  {
    stat: "1–3 days",
    t: "Sugar cravings handled",
    d: "Within the first 1–3 days, the afternoon snacking pull starts to fade and the snack cycle breaks.",
  },
  {
    stat: "All day",
    t: "Steady, balanced energy",
    d: "No more afternoon crashes or evening energy dips. Feel fuller, clearer, and more in control throughout the day.",
  },
  {
    stat: "Real food",
    t: "No banned lists",
    d: "Proper meals built around protein, vegetables and the right carbs at the right time.",
  },
  {
    stat: "Real life",
    t: "Food you'll actually enjoy",
    d: "Flexible meals that work around work, kids, social plans and busy days, without feeling like you're \"on a diet\".",
  },
  {
    stat: "5 days +",
    t: "A reset you can keep going",
    d: "Habits that compound for the next 4 weeks. Not a one-off you start over from on Monday.",
  },
];

const Outcome: React.FC<{
  index: number;
  stat: string;
  title: string;
  desc: string;
  baseDelay: number;
}> = ({ index, stat, title, desc, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 10;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.55 },
  });
  const y = interpolate(enter, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: "relative",
        background: c.paper,
        border: `1px solid rgba(14,39,70,0.08)`,
        borderRadius: 16,
        padding: "22px 24px 20px",
        opacity: enter,
        transform: `translateY(${y}px)`,
        boxShadow: "0 18px 40px -26px rgba(14,39,70,0.22)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 22,
          right: 22,
          height: 4,
          background: c.coral,
          borderRadius: "0 0 4px 4px",
        }}
      />
      <div
        style={{
          fontFamily: baskerville,
          color: c.coral,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 30,
          lineHeight: 1,
          letterSpacing: -0.5,
          marginTop: 4,
        }}
      >
        {stat}
      </div>
      <div
        style={{
          fontFamily: baskerville,
          color: c.navy,
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: -0.5,
          marginTop: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: alegreya,
          color: c.ink,
          fontSize: 18,
          fontWeight: 400,
          lineHeight: 1.35,
        }}
      >
        {desc}
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
          paddingTop: 90,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: c.coral,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: eyebrow,
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          What you'll walk away with
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 110,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: -2,
            opacity: head,
            transform: `translateY(${headY}px)`,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Your{" "}
          <span style={{ fontStyle: "italic", color: c.coral, fontWeight: 500 }}>
            5 day wins.
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {items.map((it, i) => (
            <Outcome
              key={it.t}
              index={i}
              stat={it.stat}
              title={it.t}
              desc={it.d}
              baseDelay={28}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
