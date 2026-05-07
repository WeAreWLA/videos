import React from "react";
import { AbsoluteFill, Img, staticFile, useVideoConfig } from "remotion";
import { colors } from "../lib/brand";
import { baskerville, alegreya } from "../lib/fonts";

const RECIPE_TITLE = "Healthy Sweet Chilli Chicken Wrap";
const RECIPE_TAG = "20-minute lunch";
const CTA = "wearewla.com";

export const RecipePoster: React.FC = () => {
  const { width, height } = useVideoConfig();

  // Sizes are width-based so they're consistent across all three aspects.
  const monogramSize = Math.round(width * 0.04);
  const eyebrowSize = Math.round(width * 0.022);
  const titleSize = Math.round(width * 0.075);
  const subSize = Math.round(width * 0.022);
  const ctaSize = Math.round(width * 0.02);
  const padding = Math.round(width * 0.07);
  const isShort = height <= 1100;

  // Source hero is 1080x1920. Slide it so the food (around y=950) sits in
  // the visual upper-third for square / mid for feed / native for story.
  const heroW = 1080;
  const heroH = 1920;
  const scale = width / heroW;
  const scaledH = heroH * scale;
  const yOffset =
    height >= scaledH ? 0 : -((scaledH - height) * 0.68);

  return (
    <AbsoluteFill style={{ background: colors.navy }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("recipe-shoot/hero.jpg")}
          style={{
            width: "100%",
            position: "absolute",
            top: yOffset,
            left: 0,
          }}
        />
      </AbsoluteFill>

      {/* Soft gradient at the bottom for legibility */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,48,96,0) 45%, rgba(0,48,96,0.55) 78%, rgba(0,48,96,0.92) 100%)",
        }}
      />

      {/* Top monogram strip */}
      <div
        style={{
          position: "absolute",
          top: padding,
          left: padding,
          right: padding,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: alegreya,
            color: colors.cream,
            fontSize: eyebrowSize,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
            textShadow: "0 2px 14px rgba(0,0,0,0.5)",
          }}
        >
          Recipe · {RECIPE_TAG}
        </div>
        <div
          style={{
            fontFamily: baskerville,
            color: colors.cream,
            fontSize: monogramSize,
            fontWeight: 700,
            letterSpacing: monogramSize * 0.05,
            textShadow: "0 2px 14px rgba(0,0,0,0.5)",
          }}
        >
          WLA
        </div>
      </div>

      {/* Bottom title block */}
      <div
        style={{
          position: "absolute",
          bottom: padding,
          left: padding,
          right: padding,
        }}
      >
        {!isShort ? (
          <div
            style={{
              fontFamily: alegreya,
              color: colors.blush,
              fontSize: subSize,
              fontWeight: 600,
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: subSize * 0.6,
              textShadow: "0 2px 14px rgba(0,0,0,0.4)",
            }}
          >
            The Weight Loss Academy
          </div>
        ) : null}
        <div
          style={{
            fontFamily: baskerville,
            color: colors.cream,
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.05,
            textShadow: "0 4px 24px rgba(0,0,0,0.45)",
          }}
        >
          Healthy{" "}
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>
            sweet chilli
          </span>
          {" "}
          chicken wrap.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: titleSize * 0.4,
          }}
        >
          <div
            style={{
              width: titleSize * 0.6,
              height: 2,
              background: colors.blush,
            }}
          />
          <div
            style={{
              fontFamily: alegreya,
              color: colors.cream,
              fontSize: ctaSize,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            {CTA}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export { RECIPE_TITLE, RECIPE_TAG, CTA };
