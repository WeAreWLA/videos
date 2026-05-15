import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { montserrat } from "../lib/fonts";
import { amalOneChunks, CaptionChunk, CaptionWord } from "./testimonials/amal-1.chunks";

const VIDEO_SRC = "Video Testimonials/Amal/testimonial-amal-1.mp4";
const POP_IN_SECONDS = 0.08;

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

const Word: React.FC<{ word: CaptionWord; t: number }> = ({ word, t }) => {
  const dt = t - word.popAt;
  const progress = Math.min(1, Math.max(0, dt / POP_IN_SECONDS));
  const eased = easeOut(progress);
  const scale = 0.8 + 0.2 * eased;
  const opacity = eased;
  return (
    <span
      style={{
        display: "inline-block",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {word.text}
    </span>
  );
};

const CaptionLine: React.FC<{ chunk: CaptionChunk; t: number }> = ({ chunk, t }) => {
  return (
    <div
      style={{
        fontFamily: montserrat,
        fontWeight: 700,
        textTransform: "uppercase",
        color: "#ffffff",
        fontSize: 132,
        lineHeight: 1.05,
        letterSpacing: 1,
        textAlign: "center",
        textShadow:
          "0 4px 14px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.7)",
        maxWidth: 940,
        wordBreak: "break-word",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 24px",
      }}
    >
      {chunk.words.map((w, i) => (
        <Word key={`${chunk.start}-${i}`} word={w} t={t} />
      ))}
    </div>
  );
};

export const TestimonialAmal1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const current = amalOneChunks.find((c) => t >= c.start && t <= c.end);

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo src={staticFile(VIDEO_SRC)} />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 280,
        }}
      >
        {current ? <CaptionLine chunk={current} t={t} /> : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const TESTIMONIAL_AMAL_1_DURATION = 279;
