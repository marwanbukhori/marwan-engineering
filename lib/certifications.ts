export type Certification = {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  /** Path to a real badge/certificate image in /public, e.g. "/certifications/aws-saa.png". Required to show the card. */
  image: string;
  url?: string;
};

/** Add real certifications here once you have a badge image for each. Empty on purpose, no placeholder content. */
export const certifications: Certification[] = [];
