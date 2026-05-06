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

const items = [
  "Drop a dress size and start seeing real changes",
  "Lose up to a stone without extreme dieting",
  "Feel back in control around food (no more all-or-nothing)",
  "Wake up lighter, less bloated, and more comfortable in your clothes",
  "Have steady energy that actually lasts all day",
];

const stats = [
  { value: "10 yrs", label: "Clinical practice" },
  { value: "4.9 ★", label: "Member rating" },
];

const Bullet: React.FC<{
  index: number;
  text: string;
  baseDelay: number;
}> = ({ index, text, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = baseDelay + index * 14;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.55 },
  });
  const x = interpolate(enter, [0, 1], [-40, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 36,
        opacity: enter,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontFamily: baskerville,
          color: colors.blushDeep,
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1,
          minWidth: 110,
          paddingTop: 4,
        }}
      >
        0{index + 1}
      </div>
      <div
        style={{
          flex: 1,
          fontFamily: alegreya,
          color: colors.navy,
          fontSize: 44,
          fontWeight: 500,
          lineHeight: 1.25,
          paddingTop: 12,
        }}
      >
        {text}
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
          fontSize: 96,
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
          fontSize: 24,
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

  const dividerW = interpolate(frame, [170, 200], [0, 240], {
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
      <AbsoluteFill style={{ background: colors.cream, opacity: 0.84 }} />

      <AbsoluteFill
        style={{
          padding: 60,
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
              marginBottom: 18,
            }}
          >
            What's possible
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.navy,
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Here's what can change
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.navy,
              fontSize: 72,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            in just 21 days…
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {items.map((t, i) => (
            <Bullet key={t} index={i} text={t} baseDelay={28} />
          ))}
        </div>

        <div
          style={{
            width: dividerW,
            height: 2,
            background: colors.blushDeep,
            margin: "44px auto 30px",
          }}
        />

        <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
          {stats.map((s, i) => (
            <StatTile
              key={s.value}
              index={i}
              value={s.value}
              label={s.label}
              baseDelay={200}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
