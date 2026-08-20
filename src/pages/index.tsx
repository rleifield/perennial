import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { TextSection } from "@/components/TextSection";
import { projects } from "@/data/projects";

const SCROLL_KEY = "home-scroll";

export default function Home() {
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
          <TextSection logoMark>
            is an architecture and design studio based in Los Angeles,
            California.
          </TextSection>
          {/* projects list */}
          <div>
            {/* project item */}
            {projects.map((project) => (
              <Link href={`/project/${project.slug}`} key={project.slug}>
                <div className="relative">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="max-h-screen w-full h-full object-contain"
                  />
                  <div className="absolute top-6 sm:top-12 right-0 left-0">
                    <TextSection logoMark>
                      <span className="uppercase">{project.title}</span>
                    </TextSection>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* homepage footer item*/}
          <TextSection logoMark>
            clients and collaborators: LACA, The Broad, Hauser & Wirth, LA
            County Arts Commission, Hammer Museum, 18th Street Arts Center, Self
            Help Graphics & Art, Los Angeles Conservancy, Night Gallery,
            Clockshop.
          </TextSection>
          <TextSection logoMark>
            consultants: ARUP, Buro Happold, Thornton Tomasetti, WSP, Glumac,
            Rios, SALT Landscape Architects, Lam Partners, Tillotson Design
            Associates, Wrightson Johnson Haddon & Williams, RBA Group
          </TextSection>
          <TextSection logoMark>site credit: Mental Gymnastics</TextSection>
          {/* contact block */}
          <ContactBlock />
        </div>
      </div>
    </PageContainer>
  );
}
