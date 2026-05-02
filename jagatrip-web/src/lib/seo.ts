import type { Site } from '../data/site';

export function buildJsonLd(site: Site) {
  const base = site.url;
  const faqs = [
    { q: 'Apakah JAGATRIP punya legalitas resmi?', a: 'Ya. Kami terdaftar resmi sebagai PT JAGATRIP MITRA EDUKASI dengan NIB, Sertifikat Standar Usaha Pariwisata, dan keanggotaan ASITA.' },
    { q: 'Bagaimana sistem keamanan & asuransi peserta?', a: 'Setiap peserta dilindungi asuransi travel internasional premium. Tour leader bersertifikat HPI mendampingi 24/7.' },
    { q: 'Apakah makanan halal & jadwal ibadah terjamin?', a: 'Ya. Restoran halal-certified, jadwal sholat dalam itinerary, dan info masjid terdekat di setiap destinasi.' },
    { q: 'Berapa minimum peserta untuk paket grup?', a: 'Minimum 15 peserta. Sekolah dengan 30+ peserta mendapat 1-2 free seat untuk guru pendamping.' },
    { q: 'Apakah ada sistem cicilan?', a: 'Ya. Cicilan 6-12 bulan tanpa bunga bersama BCA, Mandiri, BSI. Skema kolektif: DP 30%, pelunasan H-30.' },
  ];

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: base,
    foundingDate: site.foundingDate,
    address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: site.address.region },
    contactPoint: { '@type': 'ContactPoint', telephone: site.phone, contactType: 'customer service', availableLanguage: 'Indonesian' },
    sameAs: [`https://wa.me/${site.waNumber}`],
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: site.legalName,
    url: base,
    telephone: site.phone,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: site.address.region },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-17:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '50', bestRating: '5' },
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Edutrip Internasional JAGATRIP',
    description: site.description,
    provider: { '@type': 'Organization', name: site.legalName },
    areaServed: 'Indonesia',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '8 Destinasi Edutrip Internasional',
      itemListElement: [
        'Jepang', 'Korea Selatan', 'Singapura', 'Malaysia',
        'Australia', 'Turki', 'Mesir', 'Arab Saudi',
      ].map((dest, i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'TouristTrip', name: `Edutrip ${dest}`, touristType: 'Educational' },
        position: i + 1,
      })),
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: base,
    inLanguage: site.lang,
    potentialAction: { '@type': 'SearchAction', target: `${base}/?s={search_term_string}`, 'query-input': 'required name=search_term_string' },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Beranda', item: base }],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const aggregateRating = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Layanan Edutrip JAGATRIP',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '50', bestRating: '5', worstRating: '1' },
  };

  return [organization, localBusiness, service, website, breadcrumb, faqPage, aggregateRating];
}
