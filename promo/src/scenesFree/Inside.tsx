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
    t: "5 Day Reset Protocol Guide",
    d: "Your exact eating rhythm, macro balance and meal structure for the 5 days. Designed to cut sugar cravings within 72 hours and put real fat loss on the scale by Day 5.",
  },
  {
    t: "Live Daily Coaching",
    d: "Show up each day for a short live session with me. Q&A, mindset, the day's focus, and how to handle the inevitable wobble.",
  },
  {
    t: "The No-Fuss Batch Cookbook",
    d: "Simple batch-cooked meals designed to save time, reduce temptation, and make weight loss easier to stick to.",
    bonus: true,
  },
  {
    t: "Private Facebook Group",
    d: "Real-time support, the other women in your cohort, and a place to ask the questions you've been Googling at 11pm.",
  },
  {
    t: "Daily Check-Ins",
    d: "Daily accountability to keep you focused, consistent, and following through. Five days of support, momentum, and staying on track with your goals.",
  },
];

const Feat: React.FC<{
  index: number;
  title: string;
  desc: string;
  bonus?: boolean;
  baseDelay: number;
}> = ({ index, title, desc, bonus, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 12;
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
        borderRadius: 16,
        padding: "22px 26px",
        opacity: enter,
        transform: `translateY(${y}px)`,
        boxShadow: "0 18px 40px -26px rgba(14,39,70,0.22)",
        display: "flex",
        alignItems: "flex-start",
        gap: 22,
      }}
    >
      {bonus ? (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: c.coral,
            color: "#fff",
            fontFamily: alegreya,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "5px 12px",
            borderRadius: 999,
          }}
        >
          Bonus
        </div>
      ) : null}
      <div
        style={{
          flex: "none",
          width: 64,
          height: 64,
          borderRadius: 14,
          background: c.cream2,
          color: c.coral,
          fontFamily: baskerville,
          fontWeight: 700,
          fontSize: 32,
          display: "grid",
          placeItems: "center",
          marginTop: 4,
        }}
      >
        0{index + 1}
      </div>
      <div style={{ flex: 1, paddingRight: bonus ? 90 : 0 }}>
        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -0.4,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: alegreya,
            color: c.ink,
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.35,
          }}
        >
          {desc}
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
          paddingTop: 80,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: c.coral,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: eyebrow,
            marginBottom: 18,
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
            marginBottom: 36,
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
            gap: 14,
          }}
        >
          {items.map((it, i) => (
            <Feat
              key={it.t}
              index={i}
              title={it.t}
              desc={it.d}
              bonus={it.bonus}
              baseDelay={28}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
