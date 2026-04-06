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
  content?: string
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

type PortableTextMarkDef = {
  _key?: string
  href?: string
}

type PortableTextChild = {
  _type?: string
  text?: string
  marks?: string[]
}

type PortableTextBlock = {
  _type?: string
  children?: PortableTextChild[]
  markDefs?: PortableTextMarkDef[]
}

interface ResourceDocument {
  _id: string
  sectionKey?: string
  cards?: ResourceItem[]
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
  sectionKey?: string
  cards?: CardItem[]
  links?: CardItem[]
}

interface LearnMoreButtonDoc {
  _id: string
  buttonKey?: string
  label?: string
  destination?: string
  pdfUrl?: string
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

const portableTextToPlainText = (value: unknown) => {
  if (typeof value === 'string') {
    return value
  }

  if (!Array.isArray(value)) {
    return ''
  }

  return (value as PortableTextBlock[])
    .map((block) =>
      (block.children || [])
        .map((child) => child.text || '')
        .join('')
    )
    .join(' ')
    .trim()
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
          if (seenResultIds.has(result.id)) {
            return
          }
          seenResultIds.add(result.id)
          aggregatedResults.push(result)
        }

        for (const report of reports || []) {
          if (!matchesSearch(query, report.title, report.author, report.abstract, report.tags?.join(' '))) {
            continue
          }

          pushResult({
            id: `report-${report._id}`,
            title: report.title || 'Untitled Report',
            summary: report.abstract || report.author || 'Report',
            source: 'Report',
            url: report.content || '/publications-and-reports',
            external: !!report.content && isExternalUrl(report.content),
          })
        }

        for (const resourceDoc of resources || []) {
          for (const resource of resourceDoc.cards || []) {
            const descriptionText = portableTextToPlainText(resource.description)
            const resourceUrl =
              resource.resourceType === 'pdf'
                ? resource.pdfFile?.asset?.url
                : resource.resourceType === 'image'
                  ? resource.imageFile?.asset?.url
                  : resource.externalUrl
            if (!matchesSearch(query, resource.title, descriptionText, resource.resourceType)) {
              continue
            }

            pushResult({
              id: `resource-${resourceDoc._id}-${resource._key || resource.title || Math.random().toString(36)}`,
              title: resource.title || 'Untitled Resource',
              summary: descriptionText || 'Resource',
              source: resourceDoc.sectionKey ? `Resource (${resourceDoc.sectionKey})` : 'Resource',
              url: resourceUrl || '/resources',
              external: !!resourceUrl && isExternalUrl(resourceUrl),
            })
          }
        }

        for (const doc of newsDocs || []) {
          for (const newsCard of doc.cards || []) {
            if (!matchesSearch(query, newsCard.title, newsCard.link)) {
              continue
            }

            pushResult({
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
            pushResult({
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

            pushResult({
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

            pushResult({
              id: `interactive-card-${doc._id || 'doc'}-${cardItem._key || cardItem.title || Math.random().toString(36)}`,
              title: cardItem.title || 'Interactive Data Card',
              summary: cardItem.description || 'Interactive Data',
              source: 'Interactive Data',
              url: cardItem.link || '/interactive-data',
              external: !!cardItem.link && isExternalUrl(cardItem.link),
            })
          }
        }

        for (const doc of buttonCardDocs || []) {
          for (const cardItem of doc.cards || []) {
            if (!matchesSearch(query, cardItem.title, cardItem.description, cardItem.link)) {
              continue
            }

            pushResult({
              id: `button-card-${doc._id || 'doc'}-${cardItem._key || cardItem.title || Math.random().toString(36)}`,
              title: cardItem.title || 'Button Card',
              summary: cardItem.description || 'Button Card',
              source: doc.sectionKey ? `Button Card (${doc.sectionKey})` : 'Button Card',
              url: cardItem.link || '/',
              external: !!cardItem.link && isExternalUrl(cardItem.link),
            })
          }
        }

        for (const buttonDoc of learnMoreButtons || []) {
          if (!matchesSearch(query, buttonDoc.buttonKey, buttonDoc.label, buttonDoc.destination, buttonDoc.pdfUrl)) {
            continue
          }

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
