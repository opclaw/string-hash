import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://string-hash.vercel.app'),
  alternates: {
    canonical: 'https://string-hash.vercel.app',
  },
  title: 'String Hash Generator — MD5, SHA256, SHA512 | Free Tool',
  description: 'Generate MD5, SHA256, and SHA512 hashes from any string. Free online hash generator for developers.',
  keywords: ['hash generator', 'md5 hash', 'sha256 hash', 'sha512 hash', 'string hash'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://string-hash.vercel.app',
    siteName: 'String Hash Generator',
    title: 'String Hash Generator — MD5, SHA256, SHA512',
    description: 'Generate MD5, SHA256, and SHA512 hashes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'String Hash Generator',
    description: 'Generate MD5, SHA256, and SHA512 hashes.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'String Hash Generator',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'MD5 hash, SHA256 hash, SHA512 hash, Real-time generation',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
