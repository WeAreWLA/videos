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
  hook: 150, // 0-5s
  problem: 180, // 5-11s
  inside: 240, // 11-19s
  outcomes: 240, // 19-27s
  results: 210, // 27-34s
  cta: 180, // 34-40s
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
