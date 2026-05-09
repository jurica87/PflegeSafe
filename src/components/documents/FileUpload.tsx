import { Input } from '../ui/Input';

export function FileUpload({ onFile }: { onFile: (file: File | null) => void }) {
  return <Input type="file" accept="application/pdf,image/jpeg,image/png" onChange={(event) => onFile(event.target.files?.[0] ?? null)} />;
}
