import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import '../styles/NewsCards.css'

interface RecentFindingsItem {
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
    const [recentFindingsData, setRecentFindingsData] = useState<RecentFindingsItem[]>([])

    useEffect(() => {
                const fetchRecentFindings = async () => {
            try {
                        const query = `*[_type == "recentFindingsCards"]{
                            cards[]{
                                _key,
                                title,
                                pdf
                            }
                        }`
                        const result = await client.fetch(query)
                        const cards = (result || []).flatMap((doc: { cards?: RecentFindingsItem[] }) =>
                            doc.cards || []
                        )
                        setRecentFindingsData(cards)
            } catch (error) {
                console.error('Failed to fetch recent findings data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecentFindings()
    }, [])

    if (loading) return <section className="reports-grid news-cards-grid">Loading...</section>
    if (!recentFindingsData.length)
        return <section className="reports-grid news-cards-grid">No recent findings items found.</section>

    return (
        <section className="reports-grid news-cards-grid">
            {recentFindingsData.map((newsItem, index) => (
                <article key={newsItem._key || `news-${index}`} className="report-card">
                    <div className="report-card-inner">
                        <div className="report-card-face report-card-front news-card-face">
                            <h3 className="report-title">
                                {newsItem.pdf?.asset?.url ? (
                                    <a
                                        className="news-title-link"
                                        href={newsItem.pdf.asset.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {newsItem.title || 'Untitled Recent Findings Item'}
                                    </a>
                                ) : (
                                    newsItem.title || 'Untitled Recent Findings Item'
                                )}
                            </h3>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    )
}
