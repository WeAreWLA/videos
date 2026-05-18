import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { montserrat } from "../lib/fonts";
import { CaptionWord } from "./testimonials/amal-1.words";

const POP_IN_SECONDS = 0.08;
const BASE_FONT_SIZE = 140;
const MAX_LINE_WIDTH = 900;
const APPROX_CHAR_WIDTH_EM = 0.7;

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

const findCurrentWord = (words: CaptionWord[], t: number): CaptionWord | null => {
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const next = words[i + 1];
    const wordEnd = next ? next.start : w.end;
    if (t >= w.start && t < wordEnd) return w;
  }
  return null;
};

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

export const TestimonialCaptioned: React.FC<{
  videoSrc: string;
  words: CaptionWord[];
}> = ({ videoSrc, words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const current = findCurrentWord(words, t);

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ filter: "brightness(1.12) saturate(1.04)" }}>
        <OffthreadVideo src={staticFile(videoSrc)} />
      </AbsoluteFill>
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
