import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, portraits } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";
import { SafeImg } from "../lib/SafeImg";

const benefits = [
  {
    title: "Nutritionist-designed",
    body: "Built by a Registered Associate Nutritionist for women 45+ navigating menopause.",
  },
  {
    title: "Daily coaching from Anna",
    body: "I'll walk you through every meal, every step. No guesswork.",
  },
  {
    title: "50,000+ women like you",
    body: "No more starting over every Monday. Steady, sustainable change.",
  },
];

const stats = [
  { value: "10 yrs", label: "Clinical practice" },
  { value: "4.9 ★", label: "Member rating" },
];

const Bullet: React.FC<{
  index: number;
  title: string;
  body: string;
  baseDelay: number;
}> = ({ index, title, body, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 22;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.6 },
  });
  const x = interpolate(enter, [0, 1], [-50, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 28,
        opacity: enter,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontFamily: baskerville,
          color: colors.blushDeep,
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1,
          minWidth: 80,
        }}
      >
        0{index + 1}
      </div>
      <div>
        <div
          style={{
            fontFamily: baskerville,
            color: colors.navy,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: alegreya,
            color: colors.ink,
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.35,
            marginTop: 8,
            maxWidth: 780,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

const StatTile: React.FC<{
  index: number;
  value: string;
  label: string;
  baseDelay: number;
}> = ({ index, value, label, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 14;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.6 },
  });
  const y = interpolate(enter, [0, 1], [30, 0]);

  return (
    <div
      style={{
        flex: 1,
        opacity: enter,
        transform: `translateY(${y}px)`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: baskerville,
          color: colors.navy,
          fontSize: 100,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: alegreya,
          color: colors.blushDeep,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 6,
          textTransform: "uppercase",
          marginTop: 14,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Combined: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const headIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(frame, [0, 20], [24, 0], { extrapolateRight: "clamp" });

  const imgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.12]);
  const imgOpacity = interpolate(frame, [0, 20], [0, 0.32], { extrapolateRight: "clamp" });

  const dividerW = interpolate(frame, [120, 150], [0, 240], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.cream, opacity: exitOpacity }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <SafeImg
          src={portraits.journaling}
          label="Founder · journaling"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            opacity: imgOpacity,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: colors.cream, opacity: 0.82 }} />

      <AbsoluteFill
        style={{
          padding: 80,
          paddingTop: 130,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            opacity: headIn,
            transform: `translateY(${headY}px)`,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              fontFamily: alegreya,
              color: colors.blushDeep,
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            What's inside
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.navy,
              fontSize: 100,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            You're in
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.navy,
              fontSize: 100,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            good company.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 38 }}>
          {benefits.map((b, i) => (
            <Bullet
              key={b.title}
              index={i}
              title={b.title}
              body={b.body}
              baseDelay={28}
            />
          ))}
        </div>

        <div
          style={{
            width: dividerW,
            height: 2,
            background: colors.blushDeep,
            margin: "44px auto 36px",
          }}
        />

        <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
          {stats.map((s, i) => (
            <StatTile
              key={s.value}
              index={i}
              value={s.value}
              label={s.label}
              baseDelay={140}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
