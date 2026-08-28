export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
};

/** Add real posts here as you publish them. Empty on purpose, no placeholder content. */
export const blogPosts: BlogPost[] = [];
