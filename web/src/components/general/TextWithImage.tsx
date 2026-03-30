import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { client } from '../../sanityClient'
import '../../styles/TextWithImage.css'

interface TextWithImageData {
  _id: string
  title?: string
  rowWidth?: string
  imagePosition?: 'left' | 'right'
  textMode?: 'paragraph' | 'bullets'
  text?: unknown
  bulletPoints?: string[]
  altText?: string
  imageUrl?: string
}

interface TextWithImageProps {
  sectionKey?: string
}

export default function TextWithImage({ sectionKey }: TextWithImageProps) {
  const [loading, setLoading] = useState(true)
  const [rowData, setRowData] = useState<TextWithImageData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = sectionKey
          ? `*[_type == "textWithImage" && sectionKey == $sectionKey][0]{
              _id,
              title,
              rowWidth,
              imagePosition,
              textMode,
              text,
              bulletPoints,
              altText,
              "imageUrl": image.asset->url
            }`
          : `*[_type == "textWithImage"][0]{
              _id,
              title,
              rowWidth,
              imagePosition,
              textMode,
              text,
              bulletPoints,
              altText,
              "imageUrl": image.asset->url
            }`

        const result = await client.fetch(query, sectionKey ? { sectionKey } : undefined)
        setRowData(result)
      } catch {
        setRowData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sectionKey])

  if (loading) return <div className="text-with-image-row">Loading...</div>
  if (!rowData) return null

  const width = rowData.rowWidth || '80vw'
  const imageOnRight = rowData.imagePosition === 'right'
  const stackImageTop = sectionKey === 'about-history-row'
  const isRichText = Array.isArray(rowData.text)

  return (
    <section className="text-with-image-row" style={{ width }}>
      {rowData.title && <h2 className="text-with-image-title">{rowData.title}</h2>}

      <div
        className={`text-with-image-content ${imageOnRight ? 'image-right' : 'image-left'} ${stackImageTop ? 'stack-image-top' : ''}`}
      >
        <div className="text-with-image-text">
          {rowData.textMode === 'bullets' ? (
            <ul className="text-with-image-list">
              {(rowData.bulletPoints || []).map((point, index) => (
                <li key={`${point}-${index}`}>{point}</li>
              ))}
            </ul>
          ) : isRichText ? (
            <PortableText value={rowData.text as any} />
          ) : (
            <p>{String(rowData.text ?? '')}</p>
          )}
        </div>

        <div className="text-with-image-image">
          {rowData.imageUrl && (
            <img src={rowData.imageUrl} alt={rowData.altText || rowData.title || 'Section image'} />
          )}
        </div>
      </div>
    </section>
  )
}
