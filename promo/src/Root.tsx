import "./index.css";
import { Composition } from "remotion";
import { Promo, TOTAL_DURATION } from "./Composition";
import { RecipePoster } from "./recipes/RecipePoster";
import { RecipeReel, REEL_TOTAL } from "./recipes/RecipeReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Recipe posters */}
      <Composition
        id="RecipePosterSquare"
        component={RecipePoster}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="RecipePosterFeed"
        component={RecipePoster}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="RecipePosterStory"
        component={RecipePoster}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Recipe reels */}
      <Composition
        id="RecipeReelSquare"
        component={RecipeReel}
        durationInFrames={REEL_TOTAL}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="RecipeReelFeed"
        component={RecipeReel}
        durationInFrames={REEL_TOTAL}
        fps={30}
        width={1080}
        height={1350}
      />
      <Composition
        id="RecipeReelStory"
        component={RecipeReel}
        durationInFrames={REEL_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
