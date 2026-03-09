import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  content?: {
    asset?: {
      url?: string
    }
  }
}

interface ResourceItem {
  _id: string
  title?: string
  description?: string
  resourceType?: 'pdf' | 'link'
  pdfFile?: { asset?: { url?: string } }
  externalUrl?: string
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

interface CardDocument {
  _id?: string
  cards?: CardItem[]
  links?: CardItem[]
}

const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)

const getSearchQuery = (locationSearch: string) => {
  const params = new URLSearchParams(locationSearch)
  return (params.get('q') || '').trim()
}

const matchesSearch = (query: string, ...fields: Array<string | undefined>) => {
  const normalizedQuery = query.toLowerCase()
  return fields.some((field) => (field || '').toLowerCase().includes(normalizedQuery))
}

export default function Search() {
  const location = useLocation()
  const query = useMemo(() => getSearchQuery(location.search), [location.search])

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const fetchSearchResults = async () => {
      setLoading(true)
      try {
        const [reports, resources, newsDocs, findingsDocs, interactiveDocs, homeButtonDocs, publicationButtonDocs] =
          await Promise.all([
            client.fetch<ReportItem[]>(`*[_type == "report"]{_id, title, author, abstract, tags, content{asset->{url}}}`),
            client.fetch<ResourceItem[]>(`*[_type == "resource"]{_id, title, description, resourceType, pdfFile{asset->{url}}, externalUrl}`),
            client.fetch<CardDocument[]>(`*[_type == "newsCards"]{_id, cards[]{_key, title, link}}`),
            client.fetch<CardDocument[]>(`*[_type == "recentFindingsCards"]{_id, cards[]{_key, title, pdf{asset->{url}}}}`),
            client.fetch<CardDocument[]>(`*[_type == "interactiveData"]{_id, links[]{_key, label, href}, cards[]{_key, title, description, link}}`),
            client.fetch<CardDocument[]>(`*[_type == "homeButtonCards"]{_id, cards[]{_key, title, description, link}}`),
            client.fetch<CardDocument[]>(`*[_type == "publicationsButtonCards"]{_id, cards[]{_key, title, description, link}}`),
          ])

        const aggregatedResults: SearchResult[] = []

        for (const report of reports || []) {
          if (!matchesSearch(query, report.title, report.author, report.abstract, report.tags?.join(' '))) {
            continue
          }

          aggregatedResults.push({
            id: `report-${report._id}`,
            title: report.title || 'Untitled Report',
            summary: report.abstract || report.author || 'Report',
            source: 'Report',
            url: report.content?.asset?.url || '/spending',
            external: !!report.content?.asset?.url,
          })
        }

        for (const resource of resources || []) {
          const resourceUrl = resource.resourceType === 'pdf' ? resource.pdfFile?.asset?.url : resource.externalUrl
          if (!matchesSearch(query, resource.title, resource.description, resource.resourceType)) {
            continue
          }

          aggregatedResults.push({
            id: `resource-${resource._id}`,
            title: resource.title || 'Untitled Resource',
            summary: resource.description || 'Resource',
            source: 'Resource',
            url: resourceUrl || '/resources',
            external: !!resourceUrl && isExternalUrl(resourceUrl),
          })
        }

        for (const doc of newsDocs || []) {
          for (const newsCard of doc.cards || []) {
            if (!matchesSearch(query, newsCard.title, newsCard.link)) {
              continue
            }

            aggregatedResults.push({
              id: `news-${doc._id || 'doc'}-${newsCard._key || newsCard.title || Math.random().toString(36)}`,
              title: newsCard.title || 'Untitled News Item',
              summary: 'In the News',
              source: 'News',
              url: newsCard.link || '/news',
              external: !!newsCard.link && isExternalUrl(newsCard.link),
            })
          }
        }

        for (const doc of findingsDocs || []) {
          for (const findingCard of doc.cards || []) {
            if (!matchesSearch(query, findingCard.title)) {
              continue
            }

            const findingPdfUrl = findingCard.pdf?.asset?.url
            aggregatedResults.push({
              id: `finding-${doc._id || 'doc'}-${findingCard._key || findingCard.title || Math.random().toString(36)}`,
              title: findingCard.title || 'Untitled Finding',
              summary: 'Recent Findings',
              source: 'Recent Finding',
              url: findingPdfUrl || '/recent-findings',
              external: !!findingPdfUrl,
            })
          }
        }

        for (const doc of interactiveDocs || []) {
          for (const linkItem of doc.links || []) {
            if (!matchesSearch(query, linkItem.label, linkItem.href)) {
              continue
            }

            aggregatedResults.push({
              id: `interactive-link-${doc._id || 'doc'}-${linkItem._key || linkItem.label || Math.random().toString(36)}`,
              title: linkItem.label || 'Interactive Data Link',
              summary: linkItem.href || 'Interactive Data',
              source: 'Interactive Data',
              url: linkItem.href || '/interactive-data',
              external: !!linkItem.href && isExternalUrl(linkItem.href),
            })
          }

          for (const cardItem of doc.cards || []) {
            if (!matchesSearch(query, cardItem.title, cardItem.description, cardItem.link)) {
              continue
            }

            aggregatedResults.push({
              id: `interactive-card-${doc._id || 'doc'}-${cardItem._key || cardItem.title || Math.random().toString(36)}`,
              title: cardItem.title || 'Interactive Data Card',
              summary: cardItem.description || 'Interactive Data',
              source: 'Interactive Data',
              url: cardItem.link || '/interactive-data',
              external: !!cardItem.link && isExternalUrl(cardItem.link),
            })
          }
        }

        for (const doc of homeButtonDocs || []) {
          for (const cardItem of doc.cards || []) {
            if (!matchesSearch(query, cardItem.title, cardItem.description, cardItem.link)) {
              continue
            }

            aggregatedResults.push({
              id: `home-card-${doc._id || 'doc'}-${cardItem._key || cardItem.title || Math.random().toString(36)}`,
              title: cardItem.title || 'Home Card',
              summary: cardItem.description || 'Home Navigation',
              source: 'Home Card',
              url: cardItem.link || '/',
              external: !!cardItem.link && isExternalUrl(cardItem.link),
            })
          }
        }

        for (const doc of publicationButtonDocs || []) {
          for (const cardItem of doc.cards || []) {
            if (!matchesSearch(query, cardItem.title, cardItem.description, cardItem.link)) {
              continue
            }

            aggregatedResults.push({
              id: `publications-card-${doc._id || 'doc'}-${cardItem._key || cardItem.title || Math.random().toString(36)}`,
              title: cardItem.title || 'Publications Card',
              summary: cardItem.description || 'Publications Navigation',
              source: 'Publications Card',
              url: cardItem.link || '/publications-and-reports',
              external: !!cardItem.link && isExternalUrl(cardItem.link),
            })
          }
        }

        aggregatedResults.sort((first, second) => first.title.localeCompare(second.title))
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

  return (
    <main className="search-page">
      <Header />
      <BackButton to="/" />

      <section className="search-content">
        <h1 className="search-title">Search Results</h1>
        <p className="search-subtitle">
          {query ? `Showing results for "${query}"` : 'Type a term in the header search box to begin.'}
        </p>

        {loading && <p className="search-status">Searching...</p>}

        {!loading && !!query && !results.length && (
          <p className="search-status">No results found. Try another keyword.</p>
        )}

        {!loading && !!query && !!results.length && (
          <ul className="search-results-list">
            {results.map((result) => (
              <li key={result.id} className="search-result-item">
                <p className="search-result-source">{result.source}</p>
                <h2 className="search-result-title">
                  {result.external ? (
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="search-result-link">
                      {result.title}
                    </a>
                  ) : (
                    <Link to={result.url} className="search-result-link">
                      {result.title}
                    </Link>
                  )}
                </h2>
                <p className="search-result-summary">{result.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Footer />
    </main>
  )
}
