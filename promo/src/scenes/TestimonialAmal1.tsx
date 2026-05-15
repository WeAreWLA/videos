import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { montserrat } from "../lib/fonts";
import { amalOneWords, CaptionWord } from "./testimonials/amal-1.words";

const VIDEO_SRC = "Video Testimonials/Amal/testimonial-amal-1.mp4";
const POP_IN_SECONDS = 0.08;

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

const findCurrentWord = (t: number): CaptionWord | null => {
  for (let i = 0; i < amalOneWords.length; i++) {
    const w = amalOneWords[i];
    const next = amalOneWords[i + 1];
    const wordEnd = next ? next.start : w.end;
    if (t >= w.start && t < wordEnd) return w;
  }
  return null;
};

const BASE_FONT_SIZE = 160;
const MAX_LINE_WIDTH = 980;
const APPROX_CHAR_WIDTH_EM = 0.62;

const fitFontSize = (text: string) => {
  const len = Math.max(1, text.length);
  const fitted = MAX_LINE_WIDTH / (len * APPROX_CHAR_WIDTH_EM);
  return Math.min(BASE_FONT_SIZE, fitted);
};

const WordDisplay: React.FC<{ word: CaptionWord; t: number }> = ({ word, t }) => {
  const dt = Math.max(0, t - word.start);
  const progress = Math.min(1, dt / POP_IN_SECONDS);
  const eased = easeOut(progress);
  const scale = 0.8 + 0.2 * eased;
  const opacity = eased;
  const fontSize = fitFontSize(word.text);
  return (
    <div
      style={{
        fontFamily: montserrat,
        fontWeight: 700,
        textTransform: "uppercase",
        color: "#ffffff",
        fontSize,
        lineHeight: 1.05,
        letterSpacing: 1,
        textAlign: "center",
        textShadow:
          "0 4px 14px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.7)",
        whiteSpace: "nowrap",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {word.text}
    </div>
  );
};

export const TestimonialAmal1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const current = findCurrentWord(t);

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
        {current ? <WordDisplay word={current} t={t} /> : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const TESTIMONIAL_AMAL_1_DURATION = 279;
