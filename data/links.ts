// /data/links.ts
export const links: Record<
  string,
  {
    live?: string | null;
    github?: string | null;
  }
> = {
  // --- Featured project overrides ---
  "keeper-dapp": {
    github: "https://github.com/aryanc193/keeper-dapp",
    live: null,
  },
  "myotrek": {
    github: "https://github.com/aryanc193/myotrek",
    live: "https://play.google.com/store/apps/details?id=com.myotrek.fitness",
  },
  "book notes project": {
    github: "https://github.com/aryanc193/book-notes-project",
    live: null,
  },
  "find your poison": {
    github: "https://github.com/aryanc193/Find-your-poison",
    live: "https://find-your-poison.onrender.com/",
  },
  "ciphers": {
    github: "https://github.com/aryanc193/ciphers",
    live: "https://ciphers.onrender.com/",
  },
};
