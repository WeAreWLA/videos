import { loadFont as loadBaskerville } from "@remotion/google-fonts/LibreBaskerville";
import { loadFont as loadAlegreya } from "@remotion/google-fonts/AlegreyaSans";

export const baskerville = loadBaskerville("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
}).fontFamily;

export const baskervilleItalic = loadBaskerville("italic", {
  weights: ["400", "700"],
  subsets: ["latin"],
}).fontFamily;

export const alegreya = loadAlegreya("normal", {
  weights: ["300", "400", "500", "700"],
  subsets: ["latin"],
}).fontFamily;
