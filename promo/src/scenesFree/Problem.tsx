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

const signals = [
  "Eating less. Scale won't move.",
  "The 4pm sugar pull.",
  "Energy crashes by mid-afternoon.",
  "Lost count of all the Mondays.",
];

const Signal: React.FC<{ index: number; text: string; baseDelay: number }> = ({
  index,
  text,
  baseDelay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 10;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.5 },
  });
  const x = interpolate(enter, [0, 1], [-40, 0]);

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
        padding: "28px 32px",
        boxShadow: "0 18px 36px -24px rgba(14,39,70,0.25)",
      }}
    >
      <div
        style={{
          flex: "none",
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: c.cream2,
          color: c.coral,
          fontFamily: baskerville,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 32,
          display: "grid",
          placeItems: "center",
        }}
      >
        {index + 1}
      </div>
      <div
        style={{
          fontFamily: baskerville,
          color: c.navy,
          fontSize: 44,
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: -0.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Problem: React.FC = () => {
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
  const head = interpolate(frame, [8, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [8, 30], [24, 0], {
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
          Sound familiar?
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1,
            opacity: head,
            transform: `translateY(${headY}px)`,
            marginBottom: 60,
          }}
        >
          Over 45 and
          <br />
          <span style={{ fontStyle: "italic", color: c.coral, fontWeight: 500 }}>
            everything changed?
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {signals.map((s, i) => (
            <Signal key={s} index={i} text={s} baseDelay={28} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
