import { useRouter } from "next/router";
import { ContactBlock } from "@/components/ContactBlock";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { ProjectImage } from "@/components/ProjectImage";
import { TextSection } from "@/components/TextSection";
import { projects } from "@/data/projects";

const ProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const project = projects.find((p) => p.slug === projectId);

  // router.query is empty on the first client render; bail until it resolves.
  if (!project) return null;

  return (
    <PageContainer>
      <Navigation />
      {/* Pull up by one line-height so the first line of copy shares a line
          with the sticky logo. Must track body's line-height in globals.css. */}
      <div className="-mt-5 sm:-mt-6">
        <div className="flex flex-col gap-24">
          {/* project title */}
          <TextSection logoMark>
            <span className="uppercase">{project.title}</span>
          </TextSection>
          {/* Project stack */}
          <div className="flex flex-col gap-24">
            {/* main image */}
            <ProjectImage src={project.mainImage} alt={project.title} />
            {/* blurb + information */}
            <TextSection className="flex flex-col gap-6">
              <p>{project.projectBlurb}</p>
              <div className="flex flex-col gap-6">
                <p>Information</p>
                <ul>
                  {project.information.map((item) => (
                    <li key={item.label}>
                      {item.label}: {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </TextSection>
            {/* stack blocks */}
            {project.projectStack.map((block, index) =>
              block.type === "image" ? (
                <ProjectImage key={index} src={block.image} alt={block.alt} />
              ) : (
                <TextSection key={index}>
                  <p>{block.text}</p>
                </TextSection>
              )
            )}
          </div>
          {/* contact block */}
          <ContactBlock />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProjectPage;
