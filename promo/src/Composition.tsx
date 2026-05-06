import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { colors } from "./lib/brand";
import { Hook } from "./scenes/Hook";
import { Founder } from "./scenes/Founder";
import { Recipes } from "./scenes/Recipes";
import { Combined } from "./scenes/Combined";
import { BeforeAfter } from "./scenes/BeforeAfter";
import { CTA } from "./scenes/CTA";

export const SCENE_DURATIONS = {
  hook: 90, // 0-3s
  founder: 90, // 3-6s
  recipes: 150, // 6-11s
  combined: 210, // 11-18s — Benefits + Stats merged
  beforeAfter: 210, // 18-25s — 3 transformations
  cta: 165, // 25-30.5s — long hold on CTA
};

export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0,
);

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.cream }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.hook}>
          <Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.founder}>
          <Founder />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.recipes}>
          <Recipes />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.combined}>
          <Combined />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.beforeAfter}>
          <BeforeAfter />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
