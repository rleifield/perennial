import clsx from "clsx";

export const LogoMark = ({ visible }: { visible: boolean }) => {
  return (
    <span
      className={clsx(
        visible ? "opacity-100" : "opacity-0",
        "pointer-events-none"
      )}
    >
      PERENNIAL studio,{" "}
    </span>
  );
};
