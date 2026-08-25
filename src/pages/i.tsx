import Link from "next/link";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { ContactBlock } from "@/components/ContactBlock";
import { LogoMark } from "@/components/LogoMark";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { TextSection } from "@/components/TextSection";
import { client } from "../../sanity/lib/client";
import { PROJECT_INDEX_QUERY } from "../../sanity/queries/projects";
import { STUDIO_QUERY } from "../../sanity/queries/studio";

export const getStaticProps = (async () => {
  const [studio, projects] = await Promise.all([
    client.fetch(STUDIO_QUERY),
    client.fetch(PROJECT_INDEX_QUERY),
  ]);

  return { props: { studio, projects }, revalidate: 60 };
}) satisfies GetStaticProps;

export default function Index({
  studio,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageContainer>
      <Navigation />
      <div className="min-h-screen">
        {/* Pull up by one line-height so the first entry shares a line with
            the sticky logo. Tracks body's line-height in globals.css. */}
        <TextSection className="-mt-5 sm:-mt-6">
          {projects.map((project) =>
            project.slug ? (
              <p key={project._id}>
                <LogoMark visible={false} />
                <Link
                  href={`/project/${project.slug}`}
                  className="uppercase hover:underline"
                >
                  {project.title}
                </Link>
              </p>
            ) : null
          )}
        </TextSection>
      </div>
      {/* contact block */}
      <ContactBlock blurb={studio?.contactBlurb} />
    </PageContainer>
  );
}
