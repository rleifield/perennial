import clsx from "clsx";
import type { SanityImageSource } from "@sanity/image-url";

import { imageProps } from "../../sanity/lib/image";

// A project-page image: full width inside the mobile gutter, then capped to a
// 960px box and centered from `sm` up, so portrait and landscape images share
// the same bounding square. `sizes` mirrors exactly that.
export const ProjectImage = ({
  image,
  alt,
  className,
}: {
  image: SanityImageSource | null | undefined;
  alt: string;
  className?: string;
}) => {
  const props = imageProps(image, "(min-width: 640px) 960px, 100vw");
  if (!props) return null;

  return (
    <div className={clsx("flex justify-center px-6 sm:px-0", className)}>
      <img
        {...props}
        alt={alt}
        className="w-full h-auto object-contain sm:w-auto sm:max-w-[960px] sm:max-h-[960px]"
      />
    </div>
  );
};
