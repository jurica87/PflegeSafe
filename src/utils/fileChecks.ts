const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
const maxBytes = 15 * 1024 * 1024;

export function validateEvidenceFile(file: File): string | null {
  if (!allowedTypes.includes(file.type)) return 'Nur PDF, JPG oder PNG sind erlaubt.';
  if (file.size > maxBytes) return 'Die Datei darf maximal 15 MB groß sein.';
  return null;
}
