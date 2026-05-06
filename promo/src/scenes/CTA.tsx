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
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Early bird · £80 off
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: colors.cream,
              fontSize: 154,
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
              fontSize: 154,
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
            fontSize: 34,
            fontWeight: 500,
            opacity: sub,
            textAlign: "center",
            letterSpacing: 1,
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Regular £97 · Now £17
          <br />
          Pre-week Monday 4 May
        </div>

        <div
          style={{
            opacity: buttonIn,
            transform: `scale(${buttonScale * pulse})`,
            background: colors.blush,
            color: colors.navy,
            fontFamily: alegreya,
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "26px 56px",
            borderRadius: 100,
            boxShadow: "0 18px 36px rgba(0,0,0,0.25)",
          }}
        >
          Secure your place for £17
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: colors.cream,
            fontSize: 28,
            fontWeight: 500,
            opacity: sub * 0.7,
            letterSpacing: 1,
          }}
        >
          7-day money-back guarantee
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
