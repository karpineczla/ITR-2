import { useState, useEffect } from 'react'
import { client } from '../sanityClient'
import '../styles/TitleAndText.css'

interface TitleTextData {
  _id: string
  title: string
  text: string
}

export default function TitleAndText() {
  const [loading, setLoading] = useState(true)
  const [blockData, setBlockData] = useState<TitleTextData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "titleTextBlock"][0]{
          _id,
          title,
          text
        }`
        const result = await client.fetch(query)
        setBlockData(result)
        //console.log('Title & Text data:)', result)
      } catch (error) {
        //console.error('Failed to fetch title & text data :(', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="title-text-container">Loading...</div>
  if (!blockData) return null

  return (
    <div className="title-text-container">
      <h2 className="title-text-title">{blockData.title}</h2>
      <p className="title-text-body">{blockData.text}</p>
    </div>
  )
}

