import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const static_pages = [
    'https://pacemap.co.uk',
    'https://pacemap.co.uk/archive',
    'https://pacemap.co.uk/pricing',
    'https://pacemap.co.uk/contact',
    'https://pacemap.co.uk/privacy',
    'https://pacemap.co.uk/terms',
    'https://pacemap.co.uk/responsible-gambling',
  ].map(url => ({ url, lastModified: new Date() }))

  // Dynamic meeting pages — pull from your archive list
  try {
    const res = await fetch('https://pacemap.co.uk/api/meeting-data-list', {
      next: { revalidate: 3600 } // refresh hourly
    })
    const meetings = await res.json()
    const meeting_pages = meetings.map((m: { slug: string, date: string }) => ({
      url: `https://pacemap.co.uk/meetings/${m.slug}`,
      lastModified: new Date(m.date),
    }))
    return [...static_pages, ...meeting_pages]
  } catch {
    return static_pages
  }
}
