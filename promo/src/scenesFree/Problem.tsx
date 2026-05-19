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
        gap: 22,
        opacity: enter,
        transform: `translateX(${x}px)`,
        background: c.paper,
        border: `1px solid rgba(14,39,70,0.08)`,
        borderRadius: 14,
        padding: "20px 26px",
        boxShadow: "0 14px 30px -22px rgba(14,39,70,0.22)",
      }}
    >
      <div
        style={{
          flex: "none",
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: c.cream2,
          color: c.coral,
          fontFamily: baskerville,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 26,
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
          fontSize: 30,
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: -0.3,
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

  const verdictStart = 130;
  const verdictIn = spring({
    frame: frame - verdictStart,
    fps: 30,
    config: { damping: 20, mass: 0.6 },
  });
  const verdictY = interpolate(verdictIn, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ background: c.cream, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          padding: 64,
          paddingTop: 90,
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
            marginBottom: 22,
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
            fontSize: 26,
            lineHeight: 1.45,
            opacity: intro,
            marginBottom: 32,
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
            gap: 12,
          }}
        >
          {signals.map((s, i) => (
            <Signal key={s} index={i} text={s} baseDelay={44} />
          ))}
        </div>

        <div
          style={{
            marginTop: 30,
            padding: "26px 30px",
            background: c.cream2,
            borderLeft: `5px solid ${c.coral}`,
            borderRadius: 14,
            opacity: verdictIn,
            transform: `translateY(${verdictY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: baskerville,
              fontStyle: "italic",
              color: c.navy,
              fontSize: 26,
              lineHeight: 1.45,
              marginBottom: 12,
            }}
          >
            None of this is laziness. None of it is willpower. It's hormones,
            blood sugar, and a body that needs a different approach.
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: c.coral,
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            That's exactly what these 5 days are for.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
