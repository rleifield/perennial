import { useState } from "react";

// Renders a contained image (no crop, no distortion) whose SHORT side is 720px.
// The constraining axis depends on orientation, so we detect it on load:
// landscape -> pin height, portrait -> pin width.
export const StackImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isPortrait, setIsPortrait] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={(e) => {
        const img = e.currentTarget;
        setIsPortrait(img.naturalHeight > img.naturalWidth);
      }}
      className={
        isPortrait
          ? "w-[720px] h-auto object-contain"
          : "h-[720px] w-auto object-contain"
      }
    />
  );
};
