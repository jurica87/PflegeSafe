import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
export default function AdminDashboard(){return <div className="grid gap-4 md:grid-cols-2"><Card><h1 className="text-2xl font-bold">Admin & Prüfung</h1><p className="mt-2 text-slate-600">Nachvollziehbare Prüfung, Sperrungen und Audit-Logs vorbereitet.</p><div className="mt-4 flex gap-2"><Link to="/admin/verification"><Button>Prüfqueue</Button></Link><Link to="/admin/users"><Button variant="secondary">Nutzerverwaltung</Button></Link></div></Card></div>}
