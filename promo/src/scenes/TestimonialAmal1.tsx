import React from "react";
import { TestimonialCaptioned } from "./TestimonialCaptioned";
import { amalOneWords } from "./testimonials/amal-1.words";

export const TestimonialAmal1: React.FC = () => (
  <TestimonialCaptioned
    videoSrc="Video Testimonials/Amal/testimonial-amal-1.mp4"
    words={amalOneWords}
  />
);

export const TESTIMONIAL_AMAL_1_DURATION = 279;
