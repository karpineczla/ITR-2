import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import '../styles/ReportsCard.css'
import '../styles/NewsCards.css'
import '../styles/RecentFindings.css'

interface NewsItem {
    _key: string
    title?: string
    pdf?: {
        asset?: {
            url?: string
        }
    }
}

export default function RecentFindingsCards() {
    const [loading, setLoading] = useState(true)
    const [newsData, setNewsData] = useState<NewsItem[]>([])

    useEffect(() => {
                const fetchRecentFindings = async () => {
            try {
                        const query = `*[_type == "recentFindingsCards"]{
                            cards[]{
                                _key,
                                title,
                                pdf{asset->{url}}
                            }
                        }`
                        const result = await client.fetch(query)
                        const cards = (result || []).flatMap((doc: { cards?: NewsItem[] }) =>
                            doc.cards || []
                        )
                        setNewsData(cards)
            } catch (error) {
                console.error('Failed to fetch recent findings data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecentFindings()
    }, [])

    if (loading) return <section className="reports-grid news-cards-grid">Loading...</section>
    if (!newsData.length)
        return <section className="reports-grid news-cards-grid">No recent findings items found.</section>

    return (
        <section className="reports-grid news-cards-grid">
            {newsData.map((newsItem, index) => (
                <article key={newsItem._key || `news-${index}`} className="report-card">
                    <div className="report-card-inner">
                        <div className="report-card-face report-card-front news-card-face recent-findings-card-face">
                            <div className="recent-findings-header">
                                <h3 className="report-title recent-findings-title">
                                    {newsItem.title || 'Untitled Recent Findings Item'}
                                </h3>
                                {newsItem.pdf?.asset?.url && (
                                    <a
                                        className="recent-findings-pdf"
                                        href={newsItem.pdf.asset.url}
                                        download
                                        aria-label="Download PDF"
                                    >
                                        <FontAwesomeIcon icon={faFilePdf} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    )
}
