export type Photo = { src: string; alt: string };

/**
 * Carousel photos for the Background section. Add real photos here as you get
 * them (drop the file in /public first), aiming for 4-5. Only real, provided
 * photos belong here, never placeholders.
 *
 * TEMP: the same real photo is repeated below just so you can preview the
 * carousel's slide/dot behavior. Swap entries 2-5 for real distinct photos
 * once you have them, don't ship duplicates.
 */
export const photos: Photo[] = [
  { src: "/marwan-photo.jpg", alt: "Marwan Bukhori" },
  { src: "/marwan-photo.jpg", alt: "Marwan Bukhori" },
  { src: "/marwan-photo.jpg", alt: "Marwan Bukhori" },
  { src: "/marwan-photo.jpg", alt: "Marwan Bukhori" },
];
