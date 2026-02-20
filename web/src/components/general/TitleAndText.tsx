import { useState, useEffect } from 'react'
import { client } from '../../sanityClient'
import '../../styles/TitleAndText.css'

interface TitleTextData {
  _id: string
  title?: string
  subtitle?: string
  text: string
  titleAlignment?: 'left' | 'center'
  subtitleAlignment?: 'left' | 'center'
  textAlignment?: 'left' | 'center'
}

interface TitleAndTextProps {
  title?: string
  subtitle?: string
}

export default function TitleAndText({ title, subtitle }: TitleAndTextProps) {
  const [loading, setLoading] = useState(true)
  const [blockData, setBlockData] = useState<TitleTextData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = title
          ? `*[_type == "titleAndText" && title == $title][0]{
              _id,
              title,
              subtitle,
              titleAlignment,
              subtitleAlignment,
              textAlignment,
              text
            }`
          : subtitle
            ? `*[_type == "titleAndText" && subtitle == $subtitle][0]{
              _id,
              title,
              subtitle,
              titleAlignment,
              subtitleAlignment,
              textAlignment,
              text
            }`
          : `*[_type == "titleAndText"][0]{
              _id,
              title,
              subtitle,
              titleAlignment,
              subtitleAlignment,
              textAlignment,
              text
            }`
        const params = title ? { title } : subtitle ? { subtitle } : undefined
        const result = await client.fetch(query, params)
        setBlockData(result)
        //console.log('Title & Text data:)', result)
      } catch (error) {
        //console.error('Failed to fetch title & text data :(', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [title, subtitle])

  if (loading) return <div className="title-text-container">Loading...</div>
  if (!blockData)
    return (
      <div className="title-text-container">
        No data returned for `titleTextBlock`.
      </div>
    )

  const titleAlignmentClass =
    blockData.titleAlignment === 'center' ? 'title-text-align-center' : 'title-text-align-left'
  const subtitleAlignmentClass =
    blockData.subtitleAlignment === 'center' ? 'title-text-align-center' : 'title-text-align-left'
  const textAlignmentClass =
    blockData.textAlignment === 'center' ? 'title-text-align-center' : 'title-text-align-left'

  return (
    <div className="title-text-container">
      {blockData.title && <h2 className={`title-text-title ${titleAlignmentClass}`}>{blockData.title}</h2>}
      {blockData.subtitle && (
        <h3 className={`title-text-subtitle ${subtitleAlignmentClass}`}>{blockData.subtitle}</h3>
      )}
      <p className={`title-text-body ${textAlignmentClass}`}>{blockData.text}</p>
    </div>
  )
}

