import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { LogoMark } from "@/components/LogoMark";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { ProjectList } from "@/data/projects";

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
      <div>
        <div className="-mt-6">
          <div className="flex flex-col gap-24">
            {/* homepage top text */}
            <div className="max-w-[440px] mx-auto">
              <p>
                <LogoMark visible={false} />
                is an architecture and design studio based in Los Angeles,
                California.
              </p>
            </div>
            {/* projects list */}
            <div>
              {/* project item */}
              {ProjectList.map((project) => (
                <Link href={`/project/${project.id}`} key={project.title}>
                  <div className="relative" key={project.title}>
                    <img
                      src={project.image}
                      alt="sebastian"
                      className="max-h-screen w-full h-full object-contain"
                    />
                    <div className="absolute top-6 sm:top-12 right-0 left-0">
                      <div className="max-w-[440px] mx-auto">
                        <p>
                          <LogoMark visible={false} />
                          <span className="uppercase">{project.title}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* homepage footer item*/}
            <div className="max-w-[440px] mx-auto">
              <p>
                <LogoMark visible={false} />
                clients and collaborators: LACA, The Broad, Hauser & Wirth, LA
                County Arts Commission, Hammer Museum, 18th Street Arts Center,
                Self Help Graphics & Art, Los Angeles Conservancy, Night
                Gallery, Clockshop.
              </p>
            </div>
            <div className="max-w-[440px] mx-auto">
              <p>
                <LogoMark visible={false} />
                consultants: ARUP, Buro Happold, Thornton Tomasetti, WSP,
                Glumac, Rios, SALT Landscape Architects, Lam Partners, Tillotson
                Design Associates, Wrightson Johnson Haddon & Williams, RBA
                Group
              </p>
            </div>
            <div className="max-w-[440px] mx-auto">
              <p>
                <LogoMark visible={false} />
                site credit: Mental Gymnastics
              </p>
            </div>
            {/* contact block */}
            <ContactBlock />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
