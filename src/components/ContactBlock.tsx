import { LogoMark } from "@/components/LogoMark";

export const ContactBlock = () => {
  return (
    <div className="max-w-[440px] mx-auto h-[calc(100vh-48px)] sm:h-[calc(100vh-96px)]">
      <p>
        <LogoMark visible={false} />
        contact: We welcome your inquiries. Reach out to us via email at{" "}
        <a href="mailto:info@perennialstudio.space" className="hover:underline">
          info@perennialstudio.space
        </a>
      </p>
    </div>
  );
};
