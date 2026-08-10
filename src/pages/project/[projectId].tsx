import { useRouter } from "next/router";
import { ContactBlock } from "@/components/ContactBlock";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { LogoMark } from "@/components/LogoMark";
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
      <div className="-mt-6">
        <div className="flex flex-col gap-24">
          {/* project title */}
          <div className="w-full max-w-[440px] mx-auto">
            <p>
              <LogoMark visible={false} />
              <span className="uppercase">{project.title}</span>
            </p>
          </div>
          {/* Project stack */}
          <div className="flex flex-col gap-24 items-center">
            {/* main image */}
            <div className="w-full sm:w-auto">
              <img
                src={project.mainImage}
                alt={project.title}
                className="w-full h-auto object-contain sm:w-auto sm:max-w-[960px] sm:max-h-[960px]"
              />
            </div>
            {/* blurb + information */}
            <div className="max-w-[440px] mx-auto flex flex-col gap-6">
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
            </div>
            {/* stack blocks */}
            {project.projectStack.map((block, index) =>
              block.type === "image" ? (
                <div key={index} className="w-full sm:w-auto">
                  <img
                    src={block.image}
                    alt={block.alt}
                    className="w-full h-auto object-contain sm:w-auto sm:max-w-[960px] sm:max-h-[960px]"
                  />
                </div>
              ) : (
                <div key={index} className="max-w-[440px] mx-auto">
                  <p>{block.text}</p>
                </div>
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
