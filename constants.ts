interface NavLink {
  label: string;
  path: string;
}

export const navLinks: NavLink[] = [
  {
    label: "Shop",
    path: "/shop"
  },
  {
    label: "Catalog",
    path: "/catalog",
  },
  {
    label: "Artists",
    path: "/artists",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Printing",
    path: "/printing",
  },
];

export const printNavLinks: NavLink[] = [
  {
    label: "Printing with Issue Press",
    path: "/printing"
  },
  {
    label: "Intro to Stencil Printing",
    path: "/printing/intro-to-riso"
  },
  {
    label: "Ink Colors",
    path: "/printing/colors"
  },
  {
    label: "Paper",
    path: "/printing/paper"
  },
  {
    label: "File Prep",
    path: "/printing/file-prep"
  },
  {
    label: "Request a Quote",
    path: "/printing/request-quote"
  },
];
