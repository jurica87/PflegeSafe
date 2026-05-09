import { QRCodeSVG } from 'qrcode.react';
import { Card } from '../ui/Card';

export function QRCodeCard({ value }: { value: string }) {
  return <Card className="text-center"><h2 className="text-lg font-bold">QualiPass QR-Code</h2><div className="mt-4 inline-block rounded-2xl bg-white p-4"><QRCodeSVG value={value} size={180} /></div><p className="mt-3 break-all text-sm text-slate-600">{value}</p></Card>;
}
