import { useState, useEffect } from 'react'
import { client } from '../../sanityClient'
import '../../styles/CenteredTitleAndText.css'

interface CenteredTitleTextData {
  _id: string
  title: string
  subtitle: string
  text: string
}

interface CenteredTitleAndTextProps {
  title?: string
}

export default function CenteredTitleAndText({ title }: CenteredTitleAndTextProps) {
  const [loading, setLoading] = useState(true)
  const [blockData, setBlockData] = useState<CenteredTitleTextData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = title
          ? `*[_type == "centeredTitleAndText" && title == $title][0]{
              _id,
              title,
              subtitle,
              text
            }`
          : `*[_type == "centeredTitleAndText"][0]{
              _id,
              title,
              subtitle,
              text
            }`
        const result = await client.fetch(query, title ? { title } : undefined)
        setBlockData(result)
        //console.log('Centered Title & Text data:)', result)
      } catch (error) {
        //console.error('Failed to fetch centered title & text data :(', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [title])

  if (loading) return <div className="title-text-container">Loading...</div>
  if (!blockData)
    return (
      <div className="centered-title-text-container">
        No data returned for `centeredTitleAndText`.
      </div>
    )

  return (
    <div className="centered-title-text-container">
      <h2 className="centered-title-text-title">{blockData.title}</h2>
      <h3 className="centered-title-text-subtitle">{blockData.subtitle}</h3>
      <p className="centered-title-text-body">{blockData.text}</p>
    </div>
  )
}

