import { useEffect, useState } from 'react';
import { listProfilesForAdmin } from '../lib/admin';
import { UserTable } from '../components/admin/UserTable';
export default function AdminUsers(){const[users,setUsers]=useState<Record<string,unknown>[]>([]);useEffect(()=>{listProfilesForAdmin().then((data)=>setUsers(data??[]))},[]);return <div className="space-y-4"><h1 className="text-2xl font-bold">Nutzerverwaltung</h1><UserTable users={users}/></div>}
