// Dummy content sketched to mirror the intended Sanity schema. Images are plain
// string paths here; in Sanity `mainImage` and stack images become image assets.

export type InformationItem = {
  label: string;
  value: string;
};

// A project stack is an ordered list of image or text (textArea) blocks.
export type StackBlock =
  | { type: "image"; image: string; alt: string }
  | { type: "text"; text: string };

export type Project = {
  slug: string;
  title: string;
  mainImage: string;
  projectBlurb: string;
  information: InformationItem[];
  projectStack: StackBlock[];
};

export const projects: Project[] = [
  {
    slug: "sebastian-gladstone-gallery",
    title: "Sebastian Gladstone Gallery",
    mainImage: "/images/sebastian.jpg",
    projectBlurb:
      "A gallery renovation that merges the sensibility of the location with the material and construction.",
    information: [
      { label: "Client", value: "Sebastian Gladstone" },
      { label: "Location", value: "Los Angeles (Hollywood)" },
      { label: "Type", value: "Commercial Renovation" },
      { label: "Program", value: "Art Gallery" },
      { label: "Scope", value: "Architecture" },
      { label: "Size", value: "2,400 SF" },
      { label: "Status", value: "Built" },
      { label: "General Contractor", value: "Downtown Builders" },
      { label: "Millwork", value: "Fancy Wood Carpentry" },
      { label: "Photo Credit", value: "Taylor Zanke" },
    ],
    projectStack: [
      {
        type: "image",
        image: "/images/sebastian-2.JPEG",
        alt: "Sebastian Gladstone Gallery interior",
      },
      {
        type: "text",
        text: "The project draws on the characteristics of the tile and combines the proportions of the room, including a skylight, with the dimensions of the tiles to create a unified and aesthetic outcome.",
      },
    ],
  },
  {
    slug: "barryknoll",
    title: "Barryknoll",
    mainImage: "/images/barryknoll.jpg",
    projectBlurb:
      "This renovation project merges the sensibility of the location with the material and construction.",
    information: [
      { label: "Client", value: "Private" },
      { label: "Location", value: "Los Angeles (Bel Air)" },
      { label: "Type", value: "Residential Remodel" },
      { label: "Program", value: "Bath" },
      { label: "Scope", value: "Architecture" },
      { label: "Size", value: "1,500 SF" },
      { label: "Status", value: "Built" },
      { label: "Interior Designer", value: "Los Angeles Interiors" },
      { label: "General Contractor", value: "Downtown Builders" },
      { label: "Millwork", value: "Fancy Wood Carpentry" },
      { label: "Photo Credit", value: "Taylor Zanke" },
    ],
    projectStack: [
      {
        type: "image",
        image: "/images/barryknoll-2.jpg",
        alt: "Barryknoll interior",
      },
      {
        type: "text",
        text: "The palette is drawn from the surrounding landscape, pairing warm woods with quiet, tactile surfaces to create a calm and cohesive interior.",
      },
    ],
  },
];
