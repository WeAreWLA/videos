import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { colors } from "./lib/brand";
import { Hook } from "./scenes/Hook";
import { Founder } from "./scenes/Founder";
import { Recipes } from "./scenes/Recipes";
import { Benefits } from "./scenes/Benefits";
import { Stats } from "./scenes/Stats";
import { Testimonial } from "./scenes/Testimonial";
import { CTA } from "./scenes/CTA";

export const SCENE_DURATIONS = {
  hook: 90, // 0-3s
  founder: 135, // 3-7.5s
  recipes: 240, // 7.5-15.5s
  middle: 195, // 15.5-22s — Benefits or Stats
  testimonial: 150, // 22-27s — Ruth's quote
  cta: 90, // 27-30s
};

export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0,
);

const Frame: React.FC<{ middle: React.ReactNode }> = ({ middle }) => {
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
        <Series.Sequence durationInFrames={SCENE_DURATIONS.middle}>
          {middle}
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.testimonial}>
          <Testimonial />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

export const Promo: React.FC = () => <Frame middle={<Benefits />} />;
export const PromoStats: React.FC = () => <Frame middle={<Stats />} />;
