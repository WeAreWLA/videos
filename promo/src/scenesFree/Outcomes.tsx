import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colorsFree as c } from "../lib/brandFree";
import { portraits } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";
import { SafeImg } from "../lib/SafeImg";

const items = [
  { stat: "2–7 lbs", t: "Scales shift by day 5" },
  { stat: "1–3 days", t: "Sugar cravings handled" },
  { stat: "All day", t: "Steady, balanced energy" },
];

const Outcome: React.FC<{
  index: number;
  stat: string;
  text: string;
  baseDelay: number;
}> = ({ index, stat, text, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 14;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.55 },
  });
  const y = interpolate(enter, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: "relative",
        background: c.paper,
        border: `1px solid rgba(14,39,70,0.08)`,
        borderRadius: 18,
        padding: "38px 36px 32px",
        opacity: enter,
        transform: `translateY(${y}px)`,
        boxShadow: "0 24px 50px -28px rgba(14,39,70,0.22)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 28,
          right: 28,
          height: 6,
          background: c.coral,
          borderRadius: "0 0 6px 6px",
        }}
      />
      <div
        style={{
          fontFamily: baskerville,
          color: c.coral,
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1,
          letterSpacing: -0.5,
        }}
      >
        {stat}
      </div>
      <div
        style={{
          fontFamily: baskerville,
          color: c.navy,
          fontSize: 36,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: -0.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const FounderTag: React.FC<{ baseDelay: number }> = ({ baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - baseDelay,
    fps,
    config: { damping: 22, mass: 0.7 },
  });
  const y = interpolate(enter, [0, 1], [20, 0]);

  return (
    <div
      style={{
        marginTop: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        opacity: enter,
        transform: `translateY(${y}px)`,
        paddingTop: 40,
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${c.coral}`,
          flexShrink: 0,
        }}
      >
        <SafeImg
          src={portraits.laptop}
          label="Anna"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "70% 30%",
          }}
        />
      </div>
      <div>
        <div
          style={{
            fontFamily: baskerville,
            color: c.navy,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          Anna Wallace
        </div>
        <div
          style={{
            fontFamily: alegreya,
            color: c.coral,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginTop: 10,
            lineHeight: 1.3,
          }}
        >
          BSc · Registered
          <br />
          Associate Nutritionist
        </div>
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
    <AbsoluteFill style={{ background: c.cream2, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          padding: 70,
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
            textAlign: "center",
          }}
        >
          Your 5-day wins
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
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          What changes by
          <br />
          <span style={{ fontStyle: "italic", color: c.coral, fontWeight: 500 }}>
            Friday.
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
            <Outcome
              key={it.t}
              index={i}
              stat={it.stat}
              text={it.t}
              baseDelay={28}
            />
          ))}
        </div>

        <FounderTag baseDelay={130} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
