import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { colors } from "./lib/brand";
import { Hook } from "./scenes/Hook";
import { Founder } from "./scenes/Founder";
import { Recipes } from "./scenes/Recipes";
import { Benefits } from "./scenes/Benefits";
import { Promise as PromiseScene } from "./scenes/Promise";
import { CTA } from "./scenes/CTA";

export const SCENE_DURATIONS = {
  hook: 90, // 0-3s
  founder: 135, // 3-7.5s
  recipes: 240, // 7.5-15.5s
  benefits: 195, // 15.5-22s
  promise: 150, // 22-27s
  cta: 90, // 27-30s
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
        <Series.Sequence durationInFrames={SCENE_DURATIONS.benefits}>
          <Benefits />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.promise}>
          <PromiseScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
