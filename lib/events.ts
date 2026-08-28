export type Event = {
  slug: string;
  title: string;
  date: string;
  description: string;
  /** Path to a real photo in /public, e.g. "/events/meetup-2026.jpg". Required to show the card. */
  image: string;
  url?: string;
};

/** Add real events here once you have a photo for each. Empty on purpose, no placeholder content. */
export const events: Event[] = [];
