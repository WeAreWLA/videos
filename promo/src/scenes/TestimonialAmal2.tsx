import React from "react";
import { TestimonialCaptioned } from "./TestimonialCaptioned";
import { amalTwoWords } from "./testimonials/amal-2.words";

export const TestimonialAmal2: React.FC = () => (
  <TestimonialCaptioned
    videoSrc="Video Testimonials/Amal/testimonial-amal-2.mp4"
    words={amalTwoWords}
  />
);

export const TESTIMONIAL_AMAL_2_DURATION = 173;
