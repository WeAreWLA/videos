import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, transformations } from "../lib/brand";
import { alegreya } from "../lib/fonts";
import { SafeImg } from "../lib/SafeImg";

const Card: React.FC<{
  index: number;
  src: string;
  startFrame: number;
  cardDuration: number;
  fadeFrames: number;
}> = ({ index, src, startFrame, cardDuration, fadeFrames }) => {
  const frame = useCurrentFrame();

  const localFrame = frame - startFrame;
  const opacity = interpolate(
    localFrame,
    [0, fadeFrames, cardDuration - fadeFrames, cardDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = interpolate(localFrame, [0, cardDuration], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SafeImg
        src={src}
        label={`Transformation ${index + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

export const BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cardDuration = Math.floor(durationInFrames / transformations.length) + 14;
  const stride = Math.floor(durationInFrames / transformations.length);
  const fadeFrames = 14;

  const eyebrow = interpolate(frame, [4, 22], [0, 1], { extrapolateRight: "clamp" });
  const eyebrowOut = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const proof = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: colors.navy, opacity: exitOpacity }}>
      {transformations.map((src, i) => (
        <Card
          key={src}
          index={i}
          src={src}
          startFrame={i * stride}
          cardDuration={cardDuration}
          fadeFrames={fadeFrames}
        />
      ))}

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,48,96,0.55) 0%, rgba(0,48,96,0.0) 18%, rgba(0,48,96,0.0) 78%, rgba(0,48,96,0.85) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: eyebrow * eyebrowOut,
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: colors.cream,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            lineHeight: 1.15,
          }}
        >
          Real Women.
          <br />
          Real Results.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: proof * 0.95,
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: colors.cream,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          Members of The Weight Loss Academy
        </div>
      </div>
    </AbsoluteFill>
  );
};
