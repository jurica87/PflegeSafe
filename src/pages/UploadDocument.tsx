import { useNavigate } from 'react-router-dom';
import { DocumentForm } from '../components/documents/DocumentForm';
export default function UploadDocument(){const navigate=useNavigate();return <DocumentForm onCreated={()=>navigate('/documents')}/>}
