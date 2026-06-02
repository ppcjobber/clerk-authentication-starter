import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Homepage — highest priority
  const home: MetadataRoute.Sitemap = [
    {
      url: 'https://pacemap.co.uk',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  // Method section — the long-form content hub
  const method_pages: MetadataRoute.Sitemap = [
    {
      url: 'https://pacemap.co.uk/method',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://pacemap.co.uk/method/the-part-you-do-by-feel',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pacemap.co.uk/method/what-the-draw-is-worth',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pacemap.co.uk/method/what-the-figures-dont-say',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pacemap.co.uk/method/when-form-is-information',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pacemap.co.uk/method/race-shape-before-runners',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pacemap.co.uk/method/a-rating-is-a-sentence',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Static pages — pricing, archive, about etc.
  const static_pages: MetadataRoute.Sitemap = [
    {
      url: 'https://pacemap.co.uk/archive',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://pacemap.co.uk/pricing',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://pacemap.co.uk/about',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://pacemap.co.uk/contact',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://pacemap.co.uk/responsible-gambling',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://pacemap.co.uk/privacy',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://pacemap.co.uk/terms',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic meeting pages — pull from the archive list
  let meeting_pages: MetadataRoute.Sitemap = []
  try {
    const res = await fetch('https://pacemap.co.uk/api/meeting-data-list', {
      next: { revalidate: 3600 } // refresh hourly
    })
    const data = await res.json()
    const meetings = [...(data.today || []), ...(data.tomorrow || [])]
    meeting_pages = meetings.map((m: { slug: string }) => ({
      url: `https://pacemap.co.uk/meetings/${m.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  } catch {
    // If the fetch fails, return the rest without meeting pages
  }

  return [...home, ...method_pages, ...static_pages, ...meeting_pages]
}
