import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { LogoMark } from "@/components/LogoMark";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { projects } from "@/data/projects";

export default function Index() {
  return (
    <PageContainer>
      <Navigation />
      <div className="min-h-screen">
        <div className="max-w-[440px] mx-auto -mt-6">
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
        </div>
      </div>
      {/* contact block */}
      <ContactBlock />
    </PageContainer>
  );
}
