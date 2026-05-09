export function publicProfileUrl(publicId: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://pflegesafe.example';
  return `${origin}/p/${publicId}`;
}
