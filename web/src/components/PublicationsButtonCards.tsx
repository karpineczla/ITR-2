import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../sanityClient'
import { createImageUrlBuilder } from '@sanity/image-url'
import '../styles/PublicationsButtonCards.css'
const builder = createImageUrlBuilder(client)

interface Card {
  _key: string
  title: string
  description?: string
  image: {
    asset: {
      _ref: string
      url?: string
    }
  }
  link?: string //make sure in sanity the link is an internal path
}

interface PublicationsButtonCardsData {
  _id: string
  cards: Card[]
}

interface PublicationsButtonCardsProps {
  data?: PublicationsButtonCardsData
}

export default function PublicationsButtonCards({ data }: PublicationsButtonCardsProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(!data)
  const [cardsData, setCardsData] = useState<PublicationsButtonCardsData | null>(data || null)

  useEffect(() => {
    if (!data) {
      const fetchCards = async () => {
        try {
          const query = `*[_type == "publicationsButtonCards"][0]{
            _id,
            cards[]{
              _key,
              title,
              description,
              image{asset->{_ref, url}},
              link
            }
          }`
          const result = await client.fetch(query)
          setCardsData(result)
          //console.log('Cards data:', result)
        } catch (error) {
          //console.error('Failed to fetch button cards data:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchCards()
    }
  }, [data])

  if (loading) return <div className="publications-cards-container">Loading...</div>
  if (!cardsData?.cards || cardsData.cards.length === 0) return null

  return (
    <div className="publications-cards-container">
      {cardsData.cards.map((card) => (
        <button
          key={card._key}
          className="publications-card-button"
          onClick={() => card.link && navigate(card.link)}
        >
          <div className="publications-card-content">
            {card.image && (
              <img
                src={card.image.asset.url || builder.image(card.image).url()}
                alt={card.title}
                className="publications-card-image"
              />
            )}
            <div className="publications-card-text">
              <h3 className="publications-card-title">{card.title}</h3>
              <h2 className="publications-card-description">{card.description}</h2>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
