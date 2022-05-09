interface NavLink {
  label: string;
  path: string;
}

export const navLinks: NavLink[] = [
  {
    label: "Catalog",
    path: "/collections/all",
  },
  {
    label: "Artists",
    path: "/artists",
  },
  {
    label: "About",
    path: "/about",
  },
];
