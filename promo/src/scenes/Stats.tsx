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

const stats = [
  { value: "50,000+", label: "Women supported" },
  { value: "10 yrs", label: "Clinical practice" },
  { value: "4.9 ★", label: "Member rating" },
];

const Stat: React.FC<{
  index: number;
  value: string;
  label: string;
}> = ({ index, value, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 35 + index * 22;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.7 },
  });
  const y = interpolate(enter, [0, 1], [40, 0]);

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${y}px)`,
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontFamily: baskerville,
          color: colors.navy,
          fontSize: 144,
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

export const Stats: React.FC = () => {
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
  const imgOpacity = interpolate(frame, [0, 20], [0, 0.35], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: colors.cream, opacity: exitOpacity }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <SafeImg
          src={portraits.laptop}
          label="Founder · laptop"
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
          paddingTop: 160,
          flexDirection: "column",
          gap: 70,
        }}
      >
        <div
          style={{
            opacity: headIn,
            transform: `translateY(${headY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: alegreya,
              color: colors.blushDeep,
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Trusted, proven, loved
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.navy,
              fontSize: 88,
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
              fontSize: 88,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            good company.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 50 }}>
          {stats.map((s, i) => (
            <Stat key={s.value} index={i} value={s.value} label={s.label} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
