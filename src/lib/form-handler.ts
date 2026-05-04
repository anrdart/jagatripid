export function initFormHandler(): void {
  const waNumber = import.meta.env.PUBLIC_WA_NUMBER ?? '6285643972139';
  const form = document.getElementById('konsultasi-form') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nama = data.get('nama') as string;
    const sekolah = data.get('sekolah') as string;
    const wa = data.get('wa') as string;
    const negara = data.get('negara') as string;
    const peserta = data.get('peserta') as string;

    if (!nama || !sekolah || !wa || !negara || !peserta) return;

    const msg = encodeURIComponent(
      `Halo JAGATRIP! Saya ingin konsultasi edutrip:\n\n` +
      `Nama: ${nama}\nSekolah/Instansi: ${sekolah}\nNo. WA: ${wa}\n` +
      `Negara Tujuan: ${negara}\nEstimasi Peserta: ${peserta}\n\nMohon informasinya. Terima kasih!`
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  });
}
