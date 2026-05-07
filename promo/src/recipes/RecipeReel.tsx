import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";

// Each clip is shown for SHOT_FRAMES, with FADE_FRAMES of cross-fade.
// Reel total = 2 * SHOT_FRAMES + outro
const SHOT_FRAMES = 90; // 3s at 30fps
const FADE_FRAMES = 12;
const OUTRO_FRAMES = 90; // 3s outro card
export const REEL_TOTAL = SHOT_FRAMES * 2 + OUTRO_FRAMES; // 270 frames = 9s

const Clip: React.FC<{
  src: string;
  fadeIn: boolean;
  fadeOut: boolean;
  startFrom?: number;
}> = ({ src, fadeIn, fadeOut, startFrom = 0 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const opIn = fadeIn
    ? interpolate(frame, [0, FADE_FRAMES], [0, 1], { extrapolateRight: "clamp" })
    : 1;
  const opOut = fadeOut
    ? interpolate(
        frame,
        [durationInFrames - FADE_FRAMES, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 1;

  // Source is 1080x1920 portrait. Cover the canvas so smaller aspects
  // crop in (food remains roughly centered).
  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity: opIn * opOut }}>
      <OffthreadVideo
        src={staticFile(src)}
        startFrom={startFrom}
        muted
        style={{
          width,
          height,
          objectFit: "cover",
          objectPosition: "center 40%",
        }}
      />
    </AbsoluteFill>
  );
};

const Lower: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const titleSize = Math.round(height * 0.04);
  const eyebrowSize = Math.round(height * 0.013);
  const padding = Math.round(height * 0.05);

  const enter = spring({
    frame: frame - 8,
    fps,
    config: { damping: 22, mass: 0.8 },
  });
  const y = interpolate(enter, [0, 1], [40, 0]);
  const exitOp = interpolate(frame, [SHOT_FRAMES * 2 - 18, SHOT_FRAMES * 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: padding,
        left: padding,
        right: padding,
        opacity: enter * exitOp,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: alegreya,
          color: colors.blush,
          fontSize: eyebrowSize,
          fontWeight: 600,
          letterSpacing: 6,
          textTransform: "uppercase",
          marginBottom: eyebrowSize * 0.5,
          textShadow: "0 2px 12px rgba(0,0,0,0.45)",
        }}
      >
        Recipe · 20-minute lunch
      </div>
      <div
        style={{
          fontFamily: baskerville,
          color: colors.cream,
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.05,
          textShadow: "0 4px 24px rgba(0,0,0,0.5)",
          maxWidth: "92%",
        }}
      >
        Healthy{" "}
        <span style={{ fontStyle: "italic", fontWeight: 400 }}>
          sweet chilli
        </span>
        {" "}
        chicken wrap.
      </div>
    </div>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const monogramSize = Math.round(height * 0.06);
  const titleSize = Math.round(height * 0.06);
  const ctaSize = Math.round(height * 0.024);
  const subSize = Math.round(height * 0.018);

  const monoIn = spring({
    frame: frame - 4,
    fps,
    config: { damping: 22 },
  });
  const titleIn = spring({
    frame: frame - 16,
    fps,
    config: { damping: 22 },
  });
  const ctaIn = spring({
    frame: frame - 36,
    fps,
    config: { damping: 18, mass: 0.6 },
  });
  const ctaScale = interpolate(ctaIn, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, ${colors.beige} 0%, ${colors.cream} 70%)`,
          opacity: 0.7,
        }}
      />

      <AbsoluteFill
        style={{
          padding: 80,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: monogramSize * 0.5,
        }}
      >
        <div
          style={{
            opacity: monoIn,
            transform: `translateY(${interpolate(monoIn, [0, 1], [-20, 0])}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: baskerville,
              color: colors.navy,
              fontSize: monogramSize,
              fontWeight: 700,
              letterSpacing: monogramSize * 0.05,
              lineHeight: 1,
            }}
          >
            WLA
          </div>
          <div
            style={{
              fontFamily: alegreya,
              color: colors.navy,
              fontSize: subSize,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginTop: monogramSize * 0.18,
            }}
          >
            The Weight Loss Academy
          </div>
        </div>

        <div
          style={{
            opacity: titleIn,
            transform: `translateY(${interpolate(titleIn, [0, 1], [20, 0])}px)`,
            textAlign: "center",
            fontFamily: baskerville,
            color: colors.navy,
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: `${monogramSize * 0.2}px 0`,
          }}
        >
          Get the
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>recipe</span>.
        </div>

        <div
          style={{
            opacity: ctaIn,
            transform: `scale(${ctaScale})`,
            background: colors.blush,
            color: colors.navy,
            fontFamily: alegreya,
            fontSize: ctaSize,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: `${ctaSize * 0.7}px ${ctaSize * 1.6}px`,
            borderRadius: 999,
            boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
          }}
        >
          wearewla.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const RecipeReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.navy }}>
      <Sequence durationInFrames={SHOT_FRAMES * 2}>
        <Sequence durationInFrames={SHOT_FRAMES}>
          <Clip src="recipe-shoot/wrap-2.mp4" fadeIn fadeOut={false} />
        </Sequence>
        <Sequence from={SHOT_FRAMES} durationInFrames={SHOT_FRAMES}>
          <Clip
            src="recipe-shoot/wrap-1.mp4"
            fadeIn
            fadeOut
            startFrom={45}
          />
        </Sequence>
        <Lower />
      </Sequence>
      <Sequence from={SHOT_FRAMES * 2} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
