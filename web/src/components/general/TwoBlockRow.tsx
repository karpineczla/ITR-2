
import { useEffect, useState } from 'react'
import { client } from '../../sanityClient'
import '../../styles/TwoBlockRow.css'

interface TwoBlockRowProps {
  title?: string
}

interface TwoBlockRowData {
  _id: string
  cards?: Array<{
    _key: string
    title?: string
    text?: string
  }>
}

export default function TwoBlockRow({ title }: TwoBlockRowProps) {
  const [loading, setLoading] = useState(true)
  const [rowData, setRowData] = useState<TwoBlockRowData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = title
          ? `*[_type == "twoBlockRow" && title == $title][0]{
              _id,
              cards[]{
                _key,
                title,
                text
              }
            }`
          : `*[_type == "twoBlockRow"][0]{
              _id,
              cards[]{
                _key,
                title,
                text
              }
            }`

        const result = await client.fetch(query, title ? { title } : undefined)
        setRowData(result)
      } catch {
        setRowData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [title])

  if (loading) return null
  if (!rowData) return null

  const cards = rowData.cards ?? []


  return (
    <div className="two-block-row">
      <div className="two-block-row-cards">
        {cards.map((card) => (
          <div key={card._key} className="two-block-row-card">
            {card.title && <h3 className="two-block-row-card-title">{card.title}</h3>}
            {card.text && <p className="two-block-row-text">{card.text}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
