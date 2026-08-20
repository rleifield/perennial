import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { ContactBlock } from "@/components/ContactBlock";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { CaseContent } from "@/components/PortableTextSection";
import { ProjectImage } from "@/components/ProjectImage";
import { TextSection } from "@/components/TextSection";
import { client } from "../../../sanity/lib/client";
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "../../../sanity/queries/projects";
import { STUDIO_QUERY } from "../../../sanity/queries/studio";

export const getStaticPaths = (async () => {
  const slugs = await client.fetch(PROJECT_SLUGS_QUERY);

  return {
    // The type predicate is load-bearing: a plain truthiness filter leaves
    // the element type as `string | null`, which ParsedUrlQuery rejects.
    paths: slugs
      .filter((slug): slug is string => !!slug)
      .map((slug) => ({ params: { slug } })),
    // Projects published after a build render on first request rather than
    // 404ing until the next deploy.
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") return { notFound: true };

  const [studio, project] = await Promise.all([
    client.fetch(STUDIO_QUERY),
    client.fetch(PROJECT_BY_SLUG_QUERY, { slug }),
  ]);

  if (!project) return { notFound: true, revalidate: 60 };

  return { props: { studio, project }, revalidate: 60 };
}) satisfies GetStaticProps;

const ProjectPage = ({
  studio,
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            <ProjectImage
              image={project.mainImage}
              alt={project.mainImage?.alt ?? project.title ?? ""}
            />
            {/* blurb + information */}
            {project.introduction || project.information?.length ? (
              <TextSection className="flex flex-col gap-6">
                {project.introduction ? <p>{project.introduction}</p> : null}
                {project.information?.length ? (
                  <div className="flex flex-col gap-6">
                    <p>Information</p>
                    <ul>
                      {project.information.map((item) => (
                        <li key={item._key}>
                          {item.label}: {item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </TextSection>
            ) : null}
            {/* stack blocks */}
            <CaseContent value={project.caseContent} />
          </div>
          {/* contact block */}
          <ContactBlock blurb={studio?.contactBlurb} />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProjectPage;
