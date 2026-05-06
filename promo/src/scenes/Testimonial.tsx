import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";

export const Testimonial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const eyebrow = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

  const quoteIn = spring({
    frame: frame - 20,
    fps,
    config: { damping: 22, mass: 0.8 },
  });
  const quoteY = interpolate(quoteIn, [0, 1], [40, 0]);

  const lineW = interpolate(frame, [70, 100], [0, 220], { extrapolateRight: "clamp" });
  const attribution = interpolate(frame, [80, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  const proofIn = interpolate(frame, [110, 130], [0, 1], { extrapolateRight: "clamp" });
  const proofY = interpolate(frame, [110, 130], [16, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: colors.cream, opacity: exitOpacity }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${colors.beige} 0%, ${colors.cream} 70%)`,
          opacity: 0.85,
        }}
      />

      <AbsoluteFill
        style={{
          padding: 90,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
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
            opacity: eyebrow,
            marginBottom: 40,
          }}
        >
          Real women · real results
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: colors.blush,
            fontSize: 220,
            lineHeight: 0.6,
            fontStyle: "italic",
            fontWeight: 700,
            opacity: quoteIn * 0.5,
            marginBottom: -20,
          }}
        >
          “
        </div>

        <div
          style={{
            fontFamily: baskerville,
            color: colors.navy,
            fontSize: 88,
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.2,
            opacity: quoteIn,
            transform: `translateY(${quoteY}px)`,
            maxWidth: 880,
          }}
        >
          My menopause symptoms improved and I lost 12 lbs.
        </div>

        <div
          style={{
            width: lineW,
            height: 2,
            background: colors.blushDeep,
            marginTop: 56,
          }}
        />

        <div
          style={{
            fontFamily: alegreya,
            color: colors.ink,
            fontSize: 32,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginTop: 28,
            opacity: attribution,
            fontWeight: 600,
          }}>
          Ruth, 54
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: colors.ink,
            fontSize: 28,
            fontWeight: 500,
            marginTop: 80,
            opacity: proofIn * 0.7,
            transform: `translateY(${proofY}px)`,
            letterSpacing: 1,
          }}
        >
          Joined by 50,000+ women.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
