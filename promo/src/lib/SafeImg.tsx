import React, { useState } from "react";
import { Img, staticFile } from "remotion";
import { Placeholder } from "./Placeholder";

export const SafeImg: React.FC<{
  src: string;
  label?: string;
  style?: React.CSSProperties;
}> = ({ src, label, style }) => {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div style={{ position: "relative", ...style, overflow: "hidden" }}>
        <Placeholder label={label ?? src} />
      </div>
    );
  }
  return (
    <Img
      src={staticFile(src)}
      onError={() => setErrored(true)}
      style={style}
    />
  );
};
