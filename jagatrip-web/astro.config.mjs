import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jagatrip.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700, 800],
    },
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: [400, 500, 700, 900],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 500, 700],
    },
  ],
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public', default: 'https://jagatrip.com' }),
      PUBLIC_WA_NUMBER: envField.string({ context: 'client', access: 'public', default: '6281234567890' }),
      PUBLIC_PHONE: envField.string({ context: 'client', access: 'public', default: '+62 812-3456-7890' }),
      PUBLIC_EMAIL: envField.string({ context: 'client', access: 'public', default: 'info@jagatrip.com' }),
    },
  },
});
