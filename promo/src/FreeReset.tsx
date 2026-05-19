import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { colorsFree as c } from "./lib/brandFree";
import { Hook } from "./scenesFree/Hook";
import { Problem } from "./scenesFree/Problem";
import { Inside } from "./scenesFree/Inside";
import { Outcomes } from "./scenesFree/Outcomes";
import { Results } from "./scenesFree/Results";
import { CTA } from "./scenesFree/CTA";

export const FREE_RESET_DURATIONS = {
  hook: 90, // 0-3s
  problem: 120, // 3-7s
  inside: 150, // 7-12s
  outcomes: 180, // 12-18s
  results: 210, // 18-25s
  cta: 165, // 25-30.5s
};

export const FREE_RESET_TOTAL = Object.values(FREE_RESET_DURATIONS).reduce(
  (a, b) => a + b,
  0,
);

export const FreeReset: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: c.cream }}>
      <Series>
        <Series.Sequence durationInFrames={FREE_RESET_DURATIONS.hook}>
          <Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={FREE_RESET_DURATIONS.problem}>
          <Problem />
        </Series.Sequence>
        <Series.Sequence durationInFrames={FREE_RESET_DURATIONS.inside}>
          <Inside />
        </Series.Sequence>
        <Series.Sequence durationInFrames={FREE_RESET_DURATIONS.outcomes}>
          <Outcomes />
        </Series.Sequence>
        <Series.Sequence durationInFrames={FREE_RESET_DURATIONS.results}>
          <Results />
        </Series.Sequence>
        <Series.Sequence durationInFrames={FREE_RESET_DURATIONS.cta}>
          <CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
