import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { backgroundClient } from '../../sanityClient'
import '../../styles/LearnMoreButton.css'

interface LearnMoreButtonData {
	label?: string
	destination?: string
	pdfUrl?: string
	openInNewTab?: boolean
}

interface LearnMoreButtonProps {
	buttonKey: string
	fallbackDestination?: string
}

const isExternalDestination = (value: string) => {
	const normalized = value.trim().toLowerCase()
	return (
		normalized.startsWith('http://') ||
		normalized.startsWith('https://') ||
		normalized.startsWith('mailto:') ||
		normalized.startsWith('tel:')
	)
}

export default function LearnMoreButton({ buttonKey, fallbackDestination }: LearnMoreButtonProps) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [buttonData, setButtonData] = useState<LearnMoreButtonData | null>(null)

	useEffect(() => {
		const fetchButtonData = async () => {
			try {
				const query = `*[_type == "learnMoreButton" && buttonKey == $buttonKey][0]{
					label,
					destination,
					"pdfUrl": pdfFile.asset->url,
					openInNewTab
				}`
				const result = await backgroundClient.fetch(query, { buttonKey })
				setButtonData(result || null)
			} catch (error) {
				console.error('Failed to fetch Learn More button data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchButtonData()
	}, [buttonKey])

	if (loading) return null

	const destination = (buttonData?.destination || buttonData?.pdfUrl || fallbackDestination || '').trim()
	if (!destination) return null

	const label = (buttonData?.label || 'Learn More').trim() || 'Learn More'
	const openInNewTab = !!buttonData?.openInNewTab

	const handleClick = () => {
		if (isExternalDestination(destination)) {
			if (openInNewTab) {
				window.open(destination, '_blank', 'noopener,noreferrer')
				return
			}
			window.location.href = destination
			return
		}

		navigate(destination)
	}

	return (
        <div className="btn-cont">
            <button className="learn-more-btn"type="button" onClick={handleClick} aria-label={label}>
                {label}
            </button>
        </div>
	)
}
