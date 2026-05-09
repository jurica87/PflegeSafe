import { Badge } from '../ui/Badge';

export function UserTable({ users }: { users: Array<Record<string, unknown>> }) {
  return <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white"><table className="min-w-full text-sm"><thead className="bg-slate-50 text-left"><tr><th className="p-3">E-Mail</th><th className="p-3">Rolle</th><th className="p-3">Profilstatus</th><th className="p-3">Account</th></tr></thead><tbody>{users.map((user) => <tr key={String(user.id)} className="border-t"><td className="p-3">{String(user.email ?? '')}</td><td className="p-3"><Badge tone="blue">{String(user.role)}</Badge></td><td className="p-3">{String(user.profile_status)}</td><td className="p-3">{String(user.account_status)}</td></tr>)}</tbody></table></div>;
}
