import { useState, useEffect } from 'react'
import { client } from '../sanityClient'
import '../styles/TitleAndText.css'

interface TitleTextData {
  _id: string
  title: string
  text: string
}

interface TitleAndTextProps {
  title?: string
}

export default function TitleAndText({ title }: TitleAndTextProps) {
  const [loading, setLoading] = useState(true)
  const [blockData, setBlockData] = useState<TitleTextData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = title
          ? `*[_type == "titleAndText" && title == $title][0]{
              _id,
              title,
              text
            }`
          : `*[_type == "titleAndText"][0]{
              _id,
              title,
              text
            }`
        const result = await client.fetch(query, title ? { title } : undefined)
        setBlockData(result)
        //console.log('Title & Text data:)', result)
      } catch (error) {
        //console.error('Failed to fetch title & text data :(', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [title])

  if (loading) return <div className="title-text-container">Loading...</div>
  if (!blockData)
    return (
      <div className="title-text-container">
        No data returned for `titleTextBlock`.
      </div>
    )

  return (
    <div className="title-text-container">
      <h2 className="title-text-title">{blockData.title}</h2>
      <p className="title-text-body">{blockData.text}</p>
    </div>
  )
}

