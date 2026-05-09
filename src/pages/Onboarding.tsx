import { useAuth } from '../App';
import { ProfileForm } from '../components/profile/ProfileForm';
import { Card } from '../components/ui/Card';

export default function Onboarding(){const{profile}=useAuth();if(!profile)return <Card>Profil wird geladen…</Card>;return <ProfileForm profile={profile}/>}
