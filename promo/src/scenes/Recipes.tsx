import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, recipes } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";
import { SafeImg } from "../lib/SafeImg";

const RecipeCard: React.FC<{
  index: number;
  src: string;
  label: string;
  delay: number;
  exitAt: number;
}> = ({ index, src, label, delay, exitAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, mass: 0.7 },
  });
  const exit = interpolate(frame, [exitAt, exitAt + 18], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const positions = [
    { top: 120, left: 80, w: 520, h: 640, rot: -3 },
    { top: 80, left: 540, w: 460, h: 580, rot: 4 },
    { top: 700, left: 60, w: 480, h: 520, rot: 3 },
    { top: 760, left: 540, w: 480, h: 600, rot: -2 },
    { top: 1380, left: 160, w: 760, h: 480, rot: 1 },
  ];

  const p = positions[index];
  const yOffset = interpolate(enter, [0, 1], [80, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: p.top,
        left: p.left,
        width: p.w,
        height: p.h,
        opacity: enter * exit,
        transform: `translateY(${yOffset}px) rotate(${p.rot}deg)`,
        background: colors.cream,
        padding: 14,
        boxShadow: "0 30px 60px rgba(0, 48, 96, 0.18)",
        borderRadius: 4,
      }}
    >
      <SafeImg
        src={src}
        label={label}
        style={{
          width: "100%",
          height: "82%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          fontFamily: alegreya,
          color: colors.navy,
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          textAlign: "center",
          marginTop: 14,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Recipes: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const exitAt = durationInFrames - 25;

  const enter = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ background: colors.beige, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.cream} 0%, ${colors.beige} 80%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: alegreya,
          color: colors.blush,
          fontSize: 28,
          letterSpacing: 8,
          textTransform: "uppercase",
          opacity: enter,
        }}
      >
        Inside the reset
      </div>

      {recipes.map((r, i) => (
        <RecipeCard
          key={r.src}
          index={i}
          src={r.src}
          label={r.label}
          delay={i * 8}
          exitAt={exitAt}
        />
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            fontFamily: baskerville,
            color: colors.navy,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          21 days.
        </div>
        <div
          style={{
            fontFamily: baskerville,
            color: colors.navy,
            fontSize: 88,
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          60+ recipes.
        </div>
        <div
          style={{
            fontFamily: alegreya,
            color: colors.ink,
            fontSize: 28,
            marginTop: 18,
            letterSpacing: 1,
          }}
        >
          No calorie counting. No guilt.
        </div>
      </div>
    </AbsoluteFill>
  );
};
