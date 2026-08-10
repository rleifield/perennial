import { ContactBlock } from "@/components/ContactBlock";
import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";
import { LogoMark } from "@/components/LogoMark";

const ProjectPage = () => {
  return (
    <PageContainer>
      <Navigation />
      <div className="-mt-6">
        <div className="flex flex-col gap-24">
          {/* homepage top text */}
          <div className="max-w-[440px] mx-auto">
            <p>
              <LogoMark visible={false} />
              SEBASTIAN GLADSTONE GALLERY
            </p>
          </div>
          {/* Project stack */}
          <div className="flex flex-col gap-24 items-center">
            {/* main image */}
            <div className="w-full sm:w-auto">
              <img
                src="/images/sebastian.jpg"
                alt="sebastian"
                className="w-full h-auto object-contain sm:w-auto sm:max-w-[960px] sm:max-h-[960px]"
              />
            </div>
            {/* text block */}
            <div className="max-w-[440px] mx-auto flex flex-col gap-6">
              <p>
                This renovation project merges the sensibility of the location
                with the material and construction.
              </p>
              <div className="flex flex-col gap-6">
                <p>Information</p>
                <ul>
                  <li>Client: Private</li>
                  <li>Location: Los Angeles (Bel Air)</li>
                  <li>Type: Residential Remodel</li>
                  <li>Program: Bath</li>
                  <li>Scope: Architecture</li>
                  <li>Size: 1,500 SF</li>
                  <li>Status: Built</li>
                  <li>Interior Designer: Los Angeles Interiors</li>
                  <li>General Contractor: Downtown Builders</li>
                  <li>Millwork: Fancy Wood Carpentry</li>
                  <li>Photo Credit: Taylor Zanke</li>
                </ul>
              </div>
            </div>
            {/* image */}
            <div className="w-full sm:w-auto">
              <img
                src="/images/sebastian-2.JPEG"
                alt="sebastian"
                className="w-full h-auto object-contain sm:w-auto sm:max-w-[960px] sm:max-h-[960px]"
              />
            </div>
            {/* text block */}
            <div className="max-w-[440px] mx-auto">
              <p>
                This renovation project merges the sensibility of the location
                with the material and construction. The project draws on the
                characteristics of the tile and combines the proportions of the
                room, including a skylight, with the dimensions of the tiles to
                create a unified and aesthetic outcome.
              </p>
            </div>
          </div>
          {/* homepage footer item*/}
          {/* <div className="max-w-[440px] mx-auto">
            <p>
              <LogoMark visible={false} />
              clients and collaborators: LACA, The Broad, Hauser & Wirth, LA
              County Arts Commission, Hammer Museum, 18th Street Arts Center,
              Self Help Graphics & Art, Los Angeles Conservancy, Night Gallery,
              Clockshop.
            </p>
          </div>
          <div className="max-w-[440px] mx-auto">
            <p>
              <LogoMark visible={false} />
              consultants: ARUP, Buro Happold, Thornton Tomasetti, WSP, Glumac,
              Rios, SALT Landscape Architects, Lam Partners, Tillotson Design
              Associates, Wrightson Johnson Haddon & Williams, RBA Group
            </p>
          </div>
          <div className="max-w-[440px] mx-auto">
            <p>
              <LogoMark visible={false} />
              site credit: Mental Gymnastics
            </p>
          </div> */}
          {/* contact block */}
          <ContactBlock />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProjectPage;
