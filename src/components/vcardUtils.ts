// Génère une vCard simple à partir des infos du profil
export function generateVCard({ name, occupation, email, phone }: { name: string; occupation?: string; email?: string; phone?: string; }) {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    occupation ? `TITLE:${occupation}` : '',
    email ? `EMAIL:${email}` : '',
    phone ? `TEL:${phone}` : '',
    'END:VCARD',
  ].filter(Boolean).join('\n');
}

export function downloadVCard(vcardString: string, filename = 'contact.vcf') {
  const blob = new Blob([vcardString], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
