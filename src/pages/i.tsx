import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { LogoMark } from "@/components/LogoMark";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { ProjectList } from "@/data/projects";

export default function Index() {
  return (
    <PageContainer>
      <Navigation />
      <div className="min-h-screen">
        <div className="max-w-[440px] mx-auto -mt-6">
          {ProjectList.map((project) => (
            <p key={project.title}>
              <LogoMark visible={false} />
              <Link
                href={`/project/${project.id}`}
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
