import "./index.css";
import { Composition } from "remotion";
import { Promo, TOTAL_DURATION } from "./Composition";
import { FreeReset, FREE_RESET_TOTAL } from "./FreeReset";
import { RecipePoster } from "./recipes/RecipePoster";
import { RecipeReel, REEL_TOTAL } from "./recipes/RecipeReel";
import {
  TestimonialAmal1,
  TESTIMONIAL_AMAL_1_DURATION,
} from "./scenes/TestimonialAmal1";
import {
  TestimonialAmal2,
  TESTIMONIAL_AMAL_2_DURATION,
} from "./scenes/TestimonialAmal2";

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

      <Composition
        id="FreeReset"
        component={FreeReset}
        durationInFrames={FREE_RESET_TOTAL}
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

      {/* Testimonials */}
      <Composition
        id="TestimonialAmal1"
        component={TestimonialAmal1}
        durationInFrames={Math.ceil(TESTIMONIAL_AMAL_1_DURATION * 30)}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TestimonialAmal2"
        component={TestimonialAmal2}
        durationInFrames={Math.ceil(TESTIMONIAL_AMAL_2_DURATION * 30)}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
