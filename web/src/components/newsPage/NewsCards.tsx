import { useEffect, useState } from 'react'
import { client } from '../../sanityClient'
import '../../styles/ReportsCard.css'
import '../../styles/NewsCards.css'

interface NewsItem {
    _key: string
    title?: string
    link?: string
}

export default function NewsCards() {
    const [loading, setLoading] = useState(true)
    const [newsData, setNewsData] = useState<NewsItem[]>([])

    useEffect(() => {
                const fetchNews = async () => {
            try {
                        const query = `*[_type == "newsCards"]{
                            cards[]{
                                _key,
                                title,
                                link
                            }
                        }`
                        const result = await client.fetch(query)
                        const cards = (result || []).flatMap((doc: { cards?: NewsItem[] }) =>
                            doc.cards || []
                        )
                        setNewsData(cards)
            } catch (error) {
                console.error('Failed to fetch news data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    if (loading) return <section className="reports-grid news-cards-grid">Loading...</section>
    if (!newsData.length)
        return <section className="reports-grid news-cards-grid">No news items found.</section>

    return (
        <section className="reports-grid news-cards-grid">
            {newsData.map((newsItem, index) => (
                <article key={newsItem._key || `news-${index}`} className="report-card">
                    <div className="report-card-inner">
                        <div className="report-card-face report-card-front news-card-face">
                            <h3 className="report-title">
                                {newsItem.link ? (
                                    <a
                                        className="news-title-link"
                                        href={newsItem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {newsItem.title || 'Untitled News Item'}
                                    </a>
                                ) : (
                                    newsItem.title || 'Untitled News Item'
                                )}
                            </h3>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    )
}
