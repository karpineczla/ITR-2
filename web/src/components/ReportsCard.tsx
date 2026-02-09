import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
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
    const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({})

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
                setFlippedMap({})
            } catch (error) {
                console.error('Failed to fetch report data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchReports()
    }, [])

    //each card has a state map so that only that card changes when clicked
    const handleFlip = (id: string) => {
        setFlippedMap((current) => ({
            ...current,
            [id]: !current[id],
        }))
    }

    if (loading) return <div className="reports-grid">Loading...</div>
    if (!reportData.length) return <div className="reports-grid">No reports found.</div>

    return (
        <section className="reports-grid">
            {reportData.map((report, index) => {
                const flipKey = `${report._id}-${index}`
                const isFlipped = !!flippedMap[flipKey]
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
                        key={flipKey}
                        className={`report-card ${isFlipped ? 'is-flipped' : ''}`}
                    >
                        <div className="report-card-inner">
                            <div className="report-card-face report-card-front">
                                <div className="report-header">
                                    <h3 className="report-title">{report.title || 'Untitled Report'}</h3>
                                    <button
                                        type="button"
                                        className="report-button"
                                        onClick={() => handleFlip(flipKey)}
                                    >
                                        Show more
                                    </button>
                                </div>
                                {report.author && <p className="report-meta">By {report.author}</p>}
                                {formattedDate && <p className="report-meta">{formattedDate}</p>}
                                <div className="report-actions">
                                    {report.content?.asset?.url && (
                                        <a
                                            className="report-icon-pdf"
                                            href={report.content.asset.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FontAwesomeIcon icon={faFilePdf} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="report-card-face report-card-back">
                                <div className="report-header">
                                    <h4 className="report-title">Abstract</h4>
                                    <button
                                        type="button"
                                        className="report-button"
                                        onClick={() => handleFlip(flipKey)}
                                    >
                                        Show less
                                    </button>
                                </div>
                                <p className="report-abstract">
                                    {report.abstract || 'No abstract available.'}
                                </p>
                                {report.citation && <p className="report-citation">{report.citation}</p>}
                            </div>
                        </div>
                    </article>
                )
            })}
        </section>
    )
}