const url    = import.meta.env.PUBLIC_SITE_URL  ?? 'https://jagatrip.com';
const phone  = import.meta.env.PUBLIC_PHONE     ?? '+62 812-3456-7890';
const email  = import.meta.env.PUBLIC_EMAIL     ?? 'info@jagatrip.com';
const waNum  = import.meta.env.PUBLIC_WA_NUMBER ?? '6281234567890';

export const site = {
  name: 'JAGATRIP',
  legalName: 'PT JAGATRIP MITRA EDUKASI',
  tagline: 'Buka Jendela Dunia untuk Generasi Indonesia',
  niche: 'Edutrip internasional untuk sekolah (SMA/SMP) & kampus Indonesia',
  description: 'Mitra edutrip internasional terpercaya untuk sekolah & kampus Indonesia. Tour leader bersertifikat HPI, asuransi 100%, kurikulum-aligned, halal terjamin.',
  url,
  phone,
  email,
  waNumber: waNum,
  waLink: `https://wa.me/${waNum}`,
  address: { city: 'Jakarta', country: 'Indonesia', region: 'ID' },
  foundingDate: '2026',
  lang: 'id',
  stats: { countries: '7+', students: '500+', schools: '50+', safety: '100%' },
} as const;

export type Site = typeof site;
