// 24px top/bottom on mobile, 48px from `sm` up. Two things track these values
// and must change with them: Navigation's sticky `top-*` mirrors the top pad,
// and ContactBlock's height subtracts both pads so the contact line lands under
// the sticky logo when the page is scrolled to the end.
export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-6 sm:py-12">{children}</div>;
};
