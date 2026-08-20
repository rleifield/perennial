import clsx from "clsx";
import { LogoMark } from "@/components/LogoMark";

// The site's single text column. On mobile it hugs the left edge behind a 24px
// gutter; from `sm` up it becomes a centered 440px measure. Every block of copy
// goes through this so left edges line up with the sticky logo in Navigation.
export const TextSection = ({
  logoMark = false,
  className,
  children,
}: {
  // Prefixes the copy with an invisible logo, indenting the first line so it
  // starts where the sticky "PERENNIAL studio," above it ends.
  logoMark?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        // `w-full` is load-bearing: these sit inside `flex flex-col` columns,
        // where `mx-auto` is a cross-axis auto margin and so cancels
        // `align-items: stretch`. Without a definite width the box would
        // shrink-wrap its text and the auto margins would then center it,
        // making short copy drift away from the ghosted logo's left edge.
        "w-full max-w-4/5 sm:max-w-[440px] mx-0 sm:mx-auto px-6 sm:px-0",
        className
      )}
    >
      {logoMark ? (
        <p>
          <LogoMark visible={false} />
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
};
