export function required(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
