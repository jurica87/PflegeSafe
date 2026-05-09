import { TagInput } from '../ui/TagInput';
export function SpecialtyTagInput(props: { value: string[]; onChange: (tags: string[]) => void }) { return <TagInput {...props} placeholder="Fachbereich frei eingeben" />; }
