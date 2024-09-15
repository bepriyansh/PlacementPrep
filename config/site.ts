import { FcMindMap } from "react-icons/fc";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DSA Questions",
  description: "Here you'll get questions asked in various tech companies",
  logo: FcMindMap,
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/priyaaanshh/PlacementPrep",
  },
};
