import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import '../styles/ReportsCard.css'

interface ReportItem {
    _id: string
    title?: string
    author?: string
    abstract?: string
    citation?: string
    date?: string
    tags?: string[]
    content?: {
        asset?: {
            url?: string
        }
    }
}

export default function ReportsCard() {
    const [loading, setLoading] = useState(true)
    const [reportData, setReportData] = useState<ReportItem[]>([])
    const [flippedId, setFlippedId] = useState<string | null>(null)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const query = `*[_type == "report"]|order(date desc){
                    _id,
                    title,
                    author,
                    abstract,
                    citation,
                    date,
                    tags,
                    content{asset->{url}}
                }`
                const result = await client.fetch(query)
                setReportData(result || [])
            } catch (error) {
                console.error('Failed to fetch report data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchReports()
    }, [])

    const handleFlip = (id: string) => {
        setFlippedId((current) => (current === id ? null : id))
    }

    if (loading) return <div className="reports-grid">Loading...</div>
    if (!reportData.length) return <div className="reports-grid">No reports found.</div>

    return (
        <section className="reports-grid">
            {reportData.map((report) => {
                const isFlipped = flippedId === report._id
                const reportDate = report.date ? new Date(report.date) : null
                const formattedDate = reportDate
                    ? reportDate.toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                    : ''

                return (
                    <article
                        key={report._id}
                        className={`report-card ${isFlipped ? 'is-flipped' : ''}`}
                    >
                        <div className="report-card-inner">
                            <div className="report-card-face report-card-front">
                                <h3 className="report-title">{report.title || 'Untitled Report'}</h3>
                                {report.author && (
                                    <p className="report-meta">By {report.author}</p>
                                )}
                                {formattedDate && (
                                    <p className="report-meta">{formattedDate}</p>
                                )}
                                {!!report.tags?.length && (
                                    <div className="report-tags">
                                        {report.tags.map((tag) => (
                                            <span key={tag} className="report-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="report-actions">
                                    {report.content?.asset?.url && (
                                        <a
                                            className="report-link"
                                            href={report.content.asset.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View PDF
                                        </a>
                                    )}
                                    <button
                                        type="button"
                                        className="report-button"
                                        onClick={() => handleFlip(report._id)}
                                    >
                                        Show more
                                    </button>
                                </div>
                            </div>

                            <div className="report-card-face report-card-back">
                                <h4 className="report-title">Abstract</h4>
                                <p className="report-abstract">
                                    {report.abstract || 'No abstract available.'}
                                </p>
                                {report.citation && (
                                    <p className="report-citation">{report.citation}</p>
                                )}
                                <button
                                    type="button"
                                    className="report-button"
                                    onClick={() => handleFlip(report._id)}
                                >
                                    Show less
                                </button>
                            </div>
                        </div>
                    </article>
                )
            })}
        </section>
    )
}