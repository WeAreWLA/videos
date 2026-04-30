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
  { title: "Science-backed nutrition", body: "Built around how women's bodies actually work." },
  { title: "Daily expert coaching", body: "I'll walk you through every meal, every step." },
  { title: "A community of women", body: "No solo journeys. We rise together." },
];

const Bullet: React.FC<{
  index: number;
  title: string;
  body: string;
}> = ({ index, title, body }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 25 + index * 28;
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, mass: 0.6 },
  });
  const x = interpolate(enter, [0, 1], [-60, 0]);

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
          color: colors.blush,
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
            fontSize: 52,
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
            lineHeight: 1.35,
            marginTop: 10,
            maxWidth: 720,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export const Benefits: React.FC = () => {
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
  const imgOpacity = interpolate(frame, [0, 20], [0, 0.4], { extrapolateRight: "clamp" });

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
      <AbsoluteFill style={{ background: colors.cream, opacity: 0.78 }} />

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
              color: colors.blush,
              fontSize: 26,
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
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            Built for the
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
            woman you are.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {items.map((it, i) => (
            <Bullet key={it.title} index={i} title={it.title} body={it.body} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
