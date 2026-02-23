import { useEffect, useState } from 'react'
import { client } from '../../sanityClient'
import { createImageUrlBuilder } from '@sanity/image-url'
import '../../styles/BulletPointsWithImage.css'

const builder = createImageUrlBuilder(client)

interface BulletPoint {
	textTitle?: string
	text?: string
}

interface BulletsWithImgData {
	_id: string
	title?: string
	textTitle1?: string
	text1?: string
	textTitle2?: string
	text2?: string
	textTitle3?: string
	text3?: string
	image?: {
		asset?: {
			_ref?: string
			url?: string
		}
	}
}

interface BulletPointsWithImageProps {
	title?: string
}

export default function BulletPointsWithImage({ title }: BulletPointsWithImageProps) {
	const [loading, setLoading] = useState(true)
	const [sectionData, setSectionData] = useState<BulletsWithImgData | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = title
					? `*[_type == "bulletsWithImg" && title == $title][0]{
							_id,
							title,
							textTitle1,
							text1,
							textTitle2,
							text2,
							textTitle3,
							text3,
							image{asset->{_ref, url}}
						}`
					: `*[_type == "bulletsWithImg"][0]{
							_id,
							title,
							textTitle1,
							text1,
							textTitle2,
							text2,
							textTitle3,
							text3,
							image{asset->{_ref, url}}
						}`

				const result = await client.fetch(query, title ? { title } : undefined)
				setSectionData(result)
			} catch {
				setSectionData(null)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [title])

	if (loading) return <div className="bullets-with-image">Loading...</div>
	if (!sectionData) return null

	const bulletPoints: BulletPoint[] = [
		{ textTitle: sectionData.textTitle1, text: sectionData.text1 },
		{ textTitle: sectionData.textTitle2, text: sectionData.text2 },
		{ textTitle: sectionData.textTitle3, text: sectionData.text3 },
	].filter((item) => item.textTitle || item.text)

	const imageUrl = sectionData.image?.asset?.url
		? sectionData.image.asset.url
		: sectionData.image
			? builder.image(sectionData.image).url()
			: undefined

	return (
		<section className="bullets-with-image">
			{sectionData.title && <h2 className="bullets-with-image-title">{sectionData.title}</h2>}

			<div className="bullets-with-image-row">
				<div className="bullets-with-image-left">
					<ul className="bullets-with-image-list">
						{bulletPoints.map((item, index) => (
							<li key={`${item.textTitle ?? 'bullet'}-${index}`} className="bullets-with-image-item">
								{item.textTitle && <strong>{item.textTitle}</strong>}
								{item.textTitle && item.text ? ': ' : ''}
								{item.text}
							</li>
						))}
					</ul>
				</div>

				<div className="bullets-with-image-right">
					{imageUrl && <img src={imageUrl} alt={sectionData.title ?? 'Section image'} />}
				</div>
			</div>
		</section>
	)
}

