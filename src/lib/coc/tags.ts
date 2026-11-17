/** Clash of Clans player tags. Alphabet excludes ambiguous characters. */
const TAG_BODY = /^[0289PYLQGRJCUV]{3,}$/;

export function normalizeTag(input: string): string | null {
  const trimmed = input.trim().toUpperCase().replace(/\s+/g, "");
  const body = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (!TAG_BODY.test(body)) return null;
  return `#${body}`;
}

export function tagsEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  return a.toUpperCase() === b.toUpperCase();
}
