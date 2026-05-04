import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router'
import Header from '../components/general/Header'
import Footer from '../components/general/Footer'
import BackButton from '../components/general/BackButton'
import { client } from '../sanityClient'
import '../styles/Search.css'

interface SearchResult {
  id: string
  title: string
  summary: string
  source: string
  url: string
  external: boolean
}

interface ReportItem {
  _id: string
  title?: string
  author?: string
  abstract?: string
  tags?: string[]
  content?: string
}

interface ResourceDocument {
  _id: string
  sectionKey?: string
  cards?: ResourceItem[]
}

interface ResourceItem {
  _key?: string
  title?: string
  description?: unknown
  resourceType?: 'pdf' | 'link' | 'image'
  pdfFile?: { asset?: { url?: string } }
  imageFile?: { asset?: { url?: string } }
  externalUrl?: string
}

interface CardDocument {
  _id?: string
  sectionKey?: string
  cards?: CardItem[]
  links?: CardItem[]
}

interface CardItem {
  _key?: string
  title?: string
  description?: string
  link?: string
  href?: string
  label?: string
  pdf?: {
    asset?: {
      url?: string
    }
  }
}

interface LearnMoreButtonDoc {
  _id: string
  buttonKey?: string
  label?: string
  destination?: string
  pdfUrl?: string
}

interface PortableTextBlock {
  _type?: string
  children?: { text?: string }[]
}

const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)

// Static site pages index — keywords matched against user query
const SITE_PAGES: { title: string; description: string; url: string; keywords: string[] }[] = [
  {
    title: 'Home',
    description: 'Institute for Tourism and Recreaction Research home page',
    url: '/',
    keywords: ['home', 'itr', 'itrr', 'welcome', 'main'],
  },
  {
    title: 'About',
    description: 'Learn more about the ITRR and it\'s people',
    url: '/about',
    keywords: ['about', 'mission', 'team', 'overview', 'who we are', 'background','staff','faculty'],
  },
  {
    title: 'Contact',
    description: 'Get in touch with ITRR',
    url: '/contact',
    keywords: ['contact', 'email', 'reach', 'connect', 'phone', 'address', 'get in touch'],
  },
  {
    title: 'Publications & Reports',
    description: 'Browse published reports and documents',
    url: '/publications-and-reports',
    keywords: ['publications', 'reports', 'documents', 'papers', 'research', 'findings', 'pdf', 'publish'],
  },
  {
    title: 'Events',
    description: 'Upcoming and past ITRR events',
    url: '/events',
    keywords: ['events', 'calendar', 'schedule', 'upcoming', 'webinar', 'conference', 'meeting', 'training'],
  },
  {
    title: 'Interactive Data',
    description: 'Explore interactive data visualizations',
    url: '/interactive-data',
    keywords: ['interactive', 'data', 'charts', 'graphs', 'visualizations', 'statistics', 'dashboard', 'explore'],
  },
  {
    title: 'Interactive Dashboard',
    description: 'View the interactive data dashboard',
    url: '/interactive-dashboard',
    keywords: ['dashboard', 'interactive', 'data', 'charts', 'analytics', 'metrics'],
  },
  {
    title: 'Need Help?',
    description: 'Help and support resources',
    url: '/help',
    keywords: ['help', 'support', 'faq', 'questions', 'assistance', 'guide', 'how to'],
  },
  {
    title: 'Resources',
    description: 'Resource library and downloads',
    url: '/resources',
    keywords: ['resources', 'library', 'downloads', 'tools', 'materials', 'links', 'documents'],
  },
  {
    title: 'Subscribe',
    description: 'Subscribe to ITRR updates and newsletters',
    url: '/subscribe',
    keywords: ['subscribe', 'newsletter', 'email', 'updates', 'notifications', 'sign up', 'mailing list'],
  },
  {
    title: 'Employment Opportunities',
    description: 'Job openings and career opportunities at ITRR',
    url: '/employment-opportunities',
    keywords: ['employment', 'jobs', 'careers', 'hiring', 'openings', 'positions', 'work', 'apply', 'job posting', 'opportunity', 'opportunities'],
  },
  {
    title: 'Survey Kit',
    description: 'Access the ITRR survey kit',
    url: '/survey-kit',
    keywords: ['survey', 'kit','kits', 'questionnaire', 'assessment', 'toolkit', 'surveys'],
  },
  {
    title: 'Pilot Community',
    description: 'Connect with the ITRR pilot community',
    url: '/pilot-community',
    keywords: ['pilot', 'community', 'network', 'connect', 'peers', 'cohort'],
  },
  {
    title: 'Sessions',
    description: 'Browse ITRR sessions',
    url: '/sessions',
    keywords: ['sessions', 'workshops', 'classes', 'training', 'learning'],
  },
  {
    title: 'Education & Workshops',
    description: 'Educational resources and workshop information',
    url: '/education-and-workshops',
    keywords: ['education', 'workshops', 'training', 'learning', 'courses', 'curriculum', 'teach'],
  },
  {
    title: 'Continuing the Conversation',
    description: 'Ongoing discussions and community dialogue',
    url: '/continuing-the-conversation',
    keywords: ['conversation', 'dialogue', 'discussion', 'community', 'forum', 'talk', 'engage'],
  },
  {
    title: 'Get Involved & Resources',
    description: 'Ways to get involved with ITRR',
    url: '/get-involved-and-resources',
    keywords: ['get involved', 'volunteer', 'participate', 'resources', 'engage', 'contribute', 'join'],
  },
]

const getSearchQuery = (locationSearch: string) => {
  const params = new URLSearchParams(locationSearch)
  return (params.get('q') || '').trim()
}

const matchesSearch = (query: string, ...fields: Array<string | undefined>) => {
  const normalizedQuery = query.toLowerCase()
  return fields.some((field) => (field || '').toLowerCase().includes(normalizedQuery))
}

const portableTextToPlainText = (value: unknown) => {
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return (value as PortableTextBlock[])
    .map((block) => (block.children || []).map((child) => child.text || '').join(''))
    .join(' ')
    .trim()
}

export default function Search() {
  const location = useLocation()
  const query = useMemo(() => getSearchQuery(location.search), [location.search])

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  
  // --- Filter and Sort State ---
  const [filterSource, setFilterSource] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const fetchSearchResults = async () => {
      setLoading(true)
      try {
        const [reports, resources, newsDocs, findingsDocs, interactiveDocs, buttonCardDocs, learnMoreButtons] =
          await Promise.all([
            client.fetch<ReportItem[]>(`*[_type == "report"]{_id, title, author, abstract, tags, content}`),
            client.fetch<ResourceDocument[]>(`*[_type == "resourceCards"]{_id, sectionKey, cards[]{_key, title, description, resourceType, pdfFile{asset->{url}}, imageFile{asset->{url}}, externalUrl}}`),
            client.fetch<CardDocument[]>(`*[_type == "newsCards"]{_id, cards[]{_key, title, link}}`),
            client.fetch<CardDocument[]>(`*[_type == "recentFindingsCards"]{_id, cards[]{_key, title, pdf{asset->{url}}}}`),
            client.fetch<CardDocument[]>(`*[_type == "interactiveData"]{_id, links[]{_key, label, href}, cards[]{_key, title, description, link}}`),
            client.fetch<CardDocument[]>(`*[_type == "buttonCards"]{_id, sectionKey, cards[]{_key, title, description, link}}`),
            client.fetch<LearnMoreButtonDoc[]>(`*[_type == "learnMoreButton"]{_id, buttonKey, label, destination, "pdfUrl": pdfFile.asset->url}`),
          ])

        const aggregatedResults: SearchResult[] = []
        const seenResultIds = new Set<string>()

        const pushResult = (result: SearchResult) => {
          if (seenResultIds.has(result.id)) return
          seenResultIds.add(result.id)
          aggregatedResults.push(result)
        }

        // Logic for mapping Sanity data to SearchResult objects
        for (const report of reports || []) {
          if (matchesSearch(query, report.title, report.author, report.abstract, report.tags?.join(' '))) {
            pushResult({
              id: `report-${report._id}`,
              title: report.title || 'Untitled Report',
              summary: report.abstract || report.author || 'Report',
              source: 'Report',
              url: report.content || '/publications-and-reports',
              external: !!report.content && isExternalUrl(report.content),
            })
          }
        }

        for (const resourceDoc of resources || []) {
          for (const resource of resourceDoc.cards || []) {
            const descriptionText = portableTextToPlainText(resource.description)
            const resourceUrl = resource.resourceType === 'pdf' ? resource.pdfFile?.asset?.url : resource.resourceType === 'image' ? resource.imageFile?.asset?.url : resource.externalUrl
            if (matchesSearch(query, resource.title, descriptionText, resource.resourceType)) {
              pushResult({
                id: `resource-${resourceDoc._id}-${resource._key || resource.title}`,
                title: resource.title || 'Untitled Resource',
                summary: descriptionText || 'Resource',
                source: resourceDoc.sectionKey ? `Resource (${resourceDoc.sectionKey})` : 'Resource',
                url: resourceUrl || '/resources',
                external: !!resourceUrl && isExternalUrl(resourceUrl),
              })
            }
          }
        }

        for (const doc of newsDocs || []) {
          for (const newsCard of doc.cards || []) {
            if (matchesSearch(query, newsCard.title, newsCard.link)) {
              pushResult({
                id: `news-${doc._id}-${newsCard._key || newsCard.title}`,
                title: newsCard.title || 'Untitled News Item',
                summary: 'In the News',
                source: 'News',
                url: newsCard.link || '/news',
                external: !!newsCard.link && isExternalUrl(newsCard.link),
              })
            }
          }
        }

        for (const doc of findingsDocs || []) {
          for (const findingCard of doc.cards || []) {
            if (matchesSearch(query, findingCard.title)) {
              const findingPdfUrl = findingCard.pdf?.asset?.url
              pushResult({
                id: `finding-${doc._id}-${findingCard._key || findingCard.title}`,
                title: findingCard.title || 'Untitled Finding',
                summary: 'Recent Findings',
                source: 'Recent Finding',
                url: findingPdfUrl || '/recent-findings',
                external: !!findingPdfUrl,
              })
            }
          }
        }

        for (const doc of interactiveDocs || []) {
          for (const linkItem of doc.links || []) {
            if (matchesSearch(query, linkItem.label, linkItem.href)) {
              pushResult({
                id: `interactive-link-${doc._id}-${linkItem._key || linkItem.label}`,
                title: linkItem.label || 'Interactive Data Link',
                summary: linkItem.href || 'Interactive Data',
                source: 'Interactive Data',
                url: linkItem.href || '/interactive-data',
                external: !!linkItem.href && isExternalUrl(linkItem.href),
              })
            }
          }
          for (const cardItem of doc.cards || []) {
            if (matchesSearch(query, cardItem.title, cardItem.description, cardItem.link)) {
              pushResult({
                id: `interactive-card-${doc._id}-${cardItem._key || cardItem.title}`,
                title: cardItem.title || 'Interactive Data Card',
                summary: cardItem.description || 'Interactive Data',
                source: 'Interactive Data',
                url: cardItem.link || '/interactive-data',
                external: !!cardItem.link && isExternalUrl(cardItem.link),
              })
            }
          }
        }

        for (const doc of buttonCardDocs || []) {
          for (const cardItem of doc.cards || []) {
            if (matchesSearch(query, cardItem.title, cardItem.description, cardItem.link)) {
              pushResult({
                id: `button-card-${doc._id}-${cardItem._key || cardItem.title}`,
                title: cardItem.title || 'Button Card',
                summary: cardItem.description || 'Button Card',
                source: doc.sectionKey ? `Button Card (${doc.sectionKey})` : 'Button Card',
                url: cardItem.link || '/',
                external: !!cardItem.link && isExternalUrl(cardItem.link),
              })
            }
          }
        }

        for (const buttonDoc of learnMoreButtons || []) {
          if (matchesSearch(query, buttonDoc.buttonKey, buttonDoc.label, buttonDoc.destination, buttonDoc.pdfUrl)) {
            const destination = (buttonDoc.destination || buttonDoc.pdfUrl || '').trim()
            pushResult({
              id: `learn-more-${buttonDoc._id}`,
              title: buttonDoc.label || buttonDoc.buttonKey || 'Learn More Button',
              summary: buttonDoc.buttonKey || destination || 'Reusable button destination',
              source: 'Learn More Button',
              url: destination || '/',
              external: !!destination && isExternalUrl(destination),
            })
          }
        }

        // Site pages — match against title, description, and keywords
        for (const page of SITE_PAGES) {
          if (matchesSearch(query, page.title, page.description, page.keywords.join(' '))) {
            pushResult({
              id: `page-${page.url}`,
              title: page.title,
              summary: page.description,
              source: 'Page',
              url: page.url,
              external: false,
            })
          }
        }

        setResults(aggregatedResults)
      } catch (error) {
        console.error('Failed to fetch search results:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  // --- UI Derived Data ---
  const categories = useMemo(() => {
    const sources = results.map(r => r.source)
    return ['All', ...Array.from(new Set(sources))]
  }, [results])

  const filteredAndSortedResults = useMemo(() => {
    let processed = [...results]

    // 1. Filtering
    if (filterSource !== 'All') {
      processed = processed.filter(r => r.source === filterSource)
    }

    // 2. Sorting
    processed.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title)
    })

    return processed
  }, [results, filterSource, sortOrder])

  return (
    <main className="search-page">
      <title>ITRR | Search Site</title>
      <Header />
      <BackButton to="/" />

      <section className="search-content">
        <h1 className="search-title">Search Results</h1>
        <p className="search-subtitle">
          {query ? `Showing results for "${query}"` : 'Type a term in the header search box to begin.'}
        </p>

        {/* --- Controls Panel --- */}
        {!!results.length && !loading && (
          <div className="search-controls">
            <div className="control-group">
              <label htmlFor="category-filter">Filter by Type: </label>
              <select 
                id="category-filter"
                value={filterSource} 
                onChange={(e) => setFilterSource(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="sort-order">Sort Alphabetically:</label>
              <select 
                id="sort-order"
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              >
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
              </select>
            </div>
          </div>
        )}
        {!loading && !!query && !results.length && (
          <p className="search-status">No results found. Try another keyword.</p>
        )}

        {loading && <p className="search-status">Searching...</p>}

        {!loading && !!query && !filteredAndSortedResults.length && (
          <p className="search-status">No results found for your selection. Try adjusting your filters.</p>
        )}

        {!loading && !!query && !!filteredAndSortedResults.length && (
          <ul className="search-results-list">
            {filteredAndSortedResults.map((result) => (
              <li key={result.id} className="search-result-item">
                {result.external ? (
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="search-result-card-link">
                    {/* <p className="search-result-source">{result.source}</p> */}
                    <h2 className="search-result-title">{result.title}</h2>
                    <p className="search-result-summary">{result.summary}</p>
                  </a>
                ) : (
                  <Link to={result.url} className="search-result-card-link">
                    {/* <p className="search-result-source">{result.source}</p> */}
                    <h2 className="search-result-title">{result.title}</h2>
                    <p className="search-result-summary">{result.summary}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <Footer />
    </main>
  )
}