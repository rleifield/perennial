import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { LogoMark } from "@/components/LogoMark";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { TextSection } from "@/components/TextSection";
import { projects } from "@/data/projects";

export default function Index() {
  return (
    <PageContainer>
      <Navigation />
      <div className="min-h-screen">
        {/* Pull up by one line-height so the first entry shares a line with
            the sticky logo. Tracks body's line-height in globals.css. */}
        <TextSection className="-mt-5 sm:-mt-6">
          {projects.map((project) => (
            <p key={project.slug}>
              <LogoMark visible={false} />
              <Link
                href={`/project/${project.slug}`}
                className="uppercase hover:underline"
              >
                {project.title}
              </Link>
            </p>
          ))}
        </TextSection>
      </div>
      {/* contact block */}
      <ContactBlock />
    </PageContainer>
  );
}
