import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { ContactBlock } from "@/components/ContactBlock";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { PortableTextSection } from "@/components/PortableTextSection";
import { TextSection } from "@/components/TextSection";
import { client } from "../../sanity/lib/client";
import { imageProps } from "../../sanity/lib/image";
import { SELECTED_PROJECTS_QUERY } from "../../sanity/queries/projects";
import { STUDIO_QUERY } from "../../sanity/queries/studio";

const SCROLL_KEY = "home-scroll";

export const getStaticProps = (async () => {
  const [studio, projects] = await Promise.all([
    client.fetch(STUDIO_QUERY),
    client.fetch(SELECTED_PROJECTS_QUERY),
  ]);

  return { props: { studio, projects }, revalidate: 60 };
}) satisfies GetStaticProps;

export default function Home({
  studio,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  useEffect(() => {
    // Restore the scroll position saved when we last left the homepage, so
    // returning via "close" feels like dismissing an overlay in place.
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem(SCROLL_KEY);
    }

    // Save the position on the way out (to /i or a project page).
    const save = () =>
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    router.events.on("routeChangeStart", save);
    return () => router.events.off("routeChangeStart", save);
  }, [router]);

  return (
    <PageContainer>
      <Navigation />
      {/* Pull up by one line-height so the first line of copy shares a line
          with the sticky logo. Must track body's line-height in globals.css. */}
      <div className="-mt-5 sm:-mt-6">
        <div className="flex flex-col gap-24">
          {/* homepage top text */}
          <PortableTextSection value={studio?.about} logoMark />
          {/* projects list */}
          <div>
            {/* project item */}
            {/* A reference resolves to null when its project was deleted or
                is unpublished, so skip anything without a slug or image. */}
            {projects?.map((project) => {
              // Full-bleed on every breakpoint, hence sizes="100vw".
              const image = imageProps(project?.mainImage, "100vw");
              if (!project?.slug || !image) return null;

              return (
                <Link href={`/project/${project.slug}`} key={project._id}>
                  <div className="relative">
                    <img
                      {...image}
                      alt={project.mainImage?.alt ?? project.title ?? ""}
                      className="max-h-screen w-full h-full object-contain"
                    />
                    <div className="absolute top-6 sm:top-12 right-0 left-0">
                      <TextSection logoMark>
                        <span className="uppercase">{project.title}</span>
                      </TextSection>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {/* homepage footer item*/}
          {studio?.clientsCollaborators?.length ? (
            <TextSection logoMark>
              clients and collaborators:{" "}
              {studio.clientsCollaborators.join(", ")}
            </TextSection>
          ) : null}
          {studio?.consultants?.length ? (
            <TextSection logoMark>
              consultants: {studio.consultants.join(", ")}
            </TextSection>
          ) : null}
          <TextSection logoMark>site credit: Mental Gymnastics</TextSection>
          {/* contact block */}
          <ContactBlock blurb={studio?.contactBlurb} />
        </div>
      </div>
    </PageContainer>
  );
}
