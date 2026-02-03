import { useState, useEffect } from 'react'
import { client } from '../sanityClient'
import HomeGridCard from './homeGridCard'
import '../styles/HomeGridCard.css'

interface GridCard {
  _key: string
  title: string
  description?: string
  icon?: string
}

interface GridCardsData {
  _id: string
  title?: string
  cards: GridCard[]
}

interface HomeGridProps {
  data?: GridCardsData
}

export default function HomeGrid({ data }: HomeGridProps) {
  const [loading, setLoading] = useState(!data)
  const [gridData, setGridData] = useState<GridCardsData | null>(data || null)

  useEffect(() => {
    if (!data) {
        console.log('Fetching grid cards data...')
      const fetchGridCards = async () => {
        console.log('Starting fetchGridCards...')
        try {
          const query = `*[_type == "HomeGridCards"][0]{
            _id,
            title,
            cards[]{
              _key,
              title,
              description,
              icon
            }
          }`
          const result = await client.fetch(query)
          setGridData(result)
          console.log('Grid cards data:', result)
        } catch (error) {
          console.error('Failed to fetch grid cards data:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchGridCards()
      console.log('fetchGridCards called')
    }
  }, [data])

  if (loading) return <div className="grid-container">Loading...</div>
  if (!gridData?.cards || gridData.cards.length === 0) return null

  return (
    <div className="grid-container">
      {gridData.cards.map((item) => (
        <HomeGridCard
          key={item._key}
          icon={item.icon || '📄'}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  )
}
  

