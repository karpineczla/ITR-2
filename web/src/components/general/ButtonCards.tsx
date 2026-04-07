import { useState, useEffect } from 'react'
import { client } from '../../sanityClient'
import { createImageUrlBuilder } from '@sanity/image-url'
import '../../styles/ButtonCards.css'
const builder = createImageUrlBuilder(client)

interface Card {
  _key: string
  title: string
  description?: string
  cardTypeKey?: string
  openInNewTab?: boolean
  image: {
    asset: {
      _ref: string
      url?: string
    }
  }
  link?: string //make sure in sanity the link is an internal path
}

interface ButtonCardsData {
  _id: string
  sectionKey?: string
  cards: Card[]
}

interface ButtonCardsProps {
  data?: ButtonCardsData
  sectionKey?: string
}

export default function ButtonCards({ data, sectionKey }: ButtonCardsProps) {
  const [loading, setLoading] = useState(!data)
  const [cardsData, setCardsData] = useState<ButtonCardsData | null>(data || null)
  const isPublicationsReports = sectionKey === 'publications-and-reports'

  useEffect(() => {
    if (!data) {
      const fetchCards = async () => {
        try {
          const query = sectionKey
            ? `*[_type == "buttonCards" && sectionKey == $sectionKey][0]{
            _id,
            sectionKey,
            cards[]{
              _key,
              title,
              description,
              cardTypeKey,
              openInNewTab,
              image{asset->{_ref, url}},
              link
            }
          }`
            : `*[_type == "buttonCards"][0]{
            _id,
            sectionKey,
            cards[]{
              _key,
              title,
              description,
              cardTypeKey,
              openInNewTab,
              image{asset->{_ref, url}},
              link
            }
          }`
          const result = await client.fetch(query, sectionKey ? { sectionKey } : undefined)
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
  }, [data, sectionKey])

  if (loading) return null
  if (!cardsData?.cards || cardsData.cards.length === 0) return null

  return (
    <div
      className={`publications-cards-container ${isPublicationsReports ? 'publications-reports-layout' : ''}`.trim()}
    >
      {cardsData.cards.map((card) => {
        const imageSrc = card.image?.asset?.url || (card.image ? builder.image(card.image).url() : '')

        return (
          <button
            key={card._key}
            className={`publications-card-button ${card.cardTypeKey || ''}`.trim()}
            onClick={() => {
              if (!card.link) return
              window.open(card.link, card.openInNewTab ? '_blank' : '_self')
            }}
          >
            <div className="publications-card-content">
              {card.image && (
                <div className="publications-card-media">
                  {card.cardTypeKey === 'report-card' && (
                    <span className="publications-card-image-overlay" aria-hidden="true">
                      REPORT
                    </span>
                  )}
                  <img
                    src={imageSrc}
                    alt={card.title}
                    className="publications-card-image"
                  />
                </div>
              )}
              <div className="publications-card-text">
                <h3 className="publications-card-title">{card.title}</h3>
                <h2 className="publications-card-description">{card.description}</h2>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
