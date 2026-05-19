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
  "You're eating less than ever, and the scale isn't moving.",
  "The 4pm sugar pull has become non-negotiable.",
  "Energy crashes mid-afternoon and again after dinner.",
  "You don't quite recognise your own body anymore.",
  "You've started so many \"Mondays\" you've lost count.",
];

const Signal: React.FC<{ index: number; text: string; baseDelay: number }> = ({
  index,
  text,
  baseDelay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 8;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.5 },
  });
  const x = interpolate(enter, [0, 1], [-30, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 30,
        opacity: enter,
        transform: `translateX(${x}px)`,
        background: c.paper,
        border: `1px solid rgba(14,39,70,0.08)`,
        borderRadius: 18,
        padding: "26px 32px",
        boxShadow: "0 18px 36px -24px rgba(14,39,70,0.22)",
      }}
    >
      <div
        style={{
          flex: "none",
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: c.cream2,
          color: c.coral,
          fontFamily: baskerville,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 40,
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
          fontSize: 38,
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: -0.4,
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

  const eyebrow = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const head = interpolate(frame, [6, 26], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [6, 26], [22, 0], {
    extrapolateRight: "clamp",
  });

  const intro = interpolate(frame, [20, 42], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: c.cream, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          padding: 64,
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
          Sound familiar?
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1,
            opacity: head,
            transform: `translateY(${headY}px)`,
            marginBottom: 26,
          }}
        >
          Over 45 and{" "}
          <span style={{ fontStyle: "italic", color: c.coral, fontWeight: 500 }}>
            everything changed?
          </span>
        </div>

        <div
          style={{
            fontFamily: baskerville,
            fontStyle: "italic",
            color: c.navy,
            fontSize: 34,
            lineHeight: 1.45,
            opacity: intro,
            marginBottom: 34,
            maxWidth: 940,
          }}
        >
          The weight that used to come off with a bit of effort now won't budge.
          The plans that used to work feel like a punishment.
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {signals.map((s, i) => (
            <Signal key={s} index={i} text={s} baseDelay={44} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
