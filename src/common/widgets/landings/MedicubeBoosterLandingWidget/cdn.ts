/**
 * Shared CDN root for the Medicube Age-R Booster Pro Ex landing assets.
 * The full asset set (section-prefixed names, e.g. hero-device.webp,
 * technologies-devices.webp) is uploaded to this CDN folder; no images live in
 * the repo and nothing is inlined in the bundle.
 */
export const ASSETS_BASE =
  'https://static.ksisters.com/public/cdn/website/landing/products/medicube-age-r-booster-pro-ex-v2';

export function asset(name: string): string {
  return `${ASSETS_BASE}/${name}`;
}
