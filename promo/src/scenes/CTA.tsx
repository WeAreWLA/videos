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
import { Monogram } from "../lib/Monogram";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bg = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const monoIn = spring({
    frame: frame - 8,
    fps,
    config: { damping: 18, mass: 0.7 },
  });
  const monoY = interpolate(monoIn, [0, 1], [-40, 0]);

  const head = spring({
    frame: frame - 22,
    fps,
    config: { damping: 18 },
  });
  const headY = interpolate(head, [0, 1], [40, 0]);

  const sub = interpolate(frame, [40, 58], [0, 1], { extrapolateRight: "clamp" });

  const buttonIn = spring({
    frame: frame - 56,
    fps,
    config: { damping: 16, mass: 0.5 },
  });
  const buttonScale = interpolate(buttonIn, [0, 1], [0.8, 1]);

  const pulse = 1 + Math.sin((frame - 70) / 6) * 0.02;

  return (
    <AbsoluteFill style={{ background: colors.navy, opacity: bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(247, 159, 131, 0.18) 0%, rgba(0, 48, 96, 0) 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          padding: 100,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <div
          style={{
            opacity: monoIn,
            transform: `translateY(${monoY}px)`,
          }}
        >
          <Monogram size={72} color={colors.cream} />
        </div>

        <div
          style={{
            opacity: head,
            transform: `translateY(${headY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: alegreya,
              color: colors.blush,
              fontSize: 30,
              letterSpacing: 10,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Doors are open
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.cream,
              fontSize: 130,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            Join the
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.cream,
              fontSize: 130,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            21 Day Reset
          </div>
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: colors.cream,
            fontSize: 28,
            opacity: sub,
            textAlign: "center",
            letterSpacing: 1,
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          Lose weight. Gain confidence.
          <br />
          Finally take control of your health.
        </div>

        <div
          style={{
            opacity: buttonIn,
            transform: `scale(${buttonScale * pulse})`,
            background: colors.blush,
            color: colors.navy,
            fontFamily: alegreya,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            padding: "26px 64px",
            borderRadius: 100,
            boxShadow: "0 18px 36px rgba(0,0,0,0.25)",
          }}
        >
          Start your reset
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
