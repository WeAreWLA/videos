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

  const sub = interpolate(frame, [40, 58], [0, 1], {
    extrapolateRight: "clamp",
  });

  const buttonIn = spring({
    frame: frame - 56,
    fps,
    config: { damping: 16, mass: 0.5 },
  });
  const buttonScale = interpolate(buttonIn, [0, 1], [0.8, 1]);

  const pulse = 1 + Math.sin((frame - 70) / 6) * 0.025;

  const doors = interpolate(frame, [70, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: c.navy, opacity: bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(217,119,87,0.22) 0%, rgba(14,39,70,0) 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          padding: 100,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
        }}
      >
        <div
          style={{
            opacity: monoIn,
            transform: `translateY(${monoY}px)`,
          }}
        >
          <Monogram size={72} color={c.cream} />
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
              fontFamily: baskerville,
              color: c.cream,
              fontSize: 138,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
              marginBottom: 20,
            }}
          >
            Join the
          </div>
          <div
            style={{
              fontFamily: baskerville,
              color: c.coralSoft,
              fontSize: 138,
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            Free 5 Day Reset
          </div>
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: c.cream,
            fontSize: 44,
            fontWeight: 600,
            opacity: sub,
            textAlign: "center",
            letterSpacing: 1,
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          Usually £47 · <span style={{ color: c.coralSoft }}>Free this round</span>
          <br />
          <br />
          Kickoff Monday 1st June
        </div>

        <div
          style={{
            opacity: buttonIn,
            transform: `scale(${buttonScale * pulse})`,
            background: c.coral,
            color: "#fff",
            fontFamily: alegreya,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "28px 58px",
            borderRadius: 100,
            boxShadow: "0 18px 36px rgba(0,0,0,0.3)",
          }}
        >
          Register For Free
        </div>

        <div
          style={{
            fontFamily: alegreya,
            color: c.cream,
            fontSize: 28,
            fontWeight: 600,
            opacity: doors * 0.8,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Doors close Sun 31st May
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
