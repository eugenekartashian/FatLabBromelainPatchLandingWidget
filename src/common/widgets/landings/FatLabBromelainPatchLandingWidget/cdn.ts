export const ASSETS_BASE = '/assets';

export function asset(name: string): string {
  return `${ASSETS_BASE}/${name}`;
}
