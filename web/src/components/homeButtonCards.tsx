import { useState, useEffect } from 'react'
import { client } from '../sanityClient'
import { createImageUrlBuilder } from '@sanity/image-url'
import '../styles/HomeButtonCards.css'
const builder = createImageUrlBuilder(client)

interface Card {
  _key: string
  title: string
  image: {
    asset: {
      _ref: string
      url?: string
    }
  }
  link?: string
}

interface ButtonCardsData {
  _id: string
  cards: Card[]
}

interface HomeButtonCardsProps {
  data?: ButtonCardsData
}

export default function HomeButtonCards({ data }: HomeButtonCardsProps) {
  const [loading, setLoading] = useState(!data)
  const [cardsData, setCardsData] = useState<ButtonCardsData | null>(data || null)

  useEffect(() => {
    if (!data) {
      const fetchCards = async () => {
        try {
          const query = `*[_type == "homeButtonCards"][0]{
            _id,
            cards[]{
              _key,
              title,
              image{asset->{_ref, url}},
              link
            }
          }`
          const result = await client.fetch(query)
          setCardsData(result)
          console.log('Cards data:', result)
        } catch (error) {
          console.error('Failed to fetch button cards data:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchCards()
    }
  }, [data])

  if (loading) return <div className="cards-container">Loading...</div>
  if (!cardsData?.cards || cardsData.cards.length === 0) return null

  return (
    <div className="cards-container">
      {cardsData.cards.map((card) => (
        <button
          key={card._key}
          className="card-button"
          onClick={() => card.link && window.open(card.link, '_blank')}
          disabled={!card.link}
        >
          <div className="card-content">
            <h3 className="card-title">{card.title}</h3>
            {card.image && (
              <img
                src={card.image.asset.url || builder.image(card.image).url()}
                alt={card.title}
                className="card-image"
              />
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
