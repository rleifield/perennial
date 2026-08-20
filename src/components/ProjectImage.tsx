// A project-page image: full width inside the mobile gutter, then capped to a
// 960px box and centered from `sm` up, so portrait and landscape images share
// the same bounding square.
export const ProjectImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="flex justify-center px-6 sm:px-0">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain sm:w-auto sm:max-w-[960px] sm:max-h-[960px]"
      />
    </div>
  );
};
