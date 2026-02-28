import { useEffect, useState } from 'react'
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from '../../sanityClient'
import LearnMoreButton from '../general/LearnMoreButton'
import '../../styles/EventRow.css'

const builder = createImageUrlBuilder(client)

interface EventRowData {
  _id: string
  title?: string
  text?: string
  image?: {
    asset?: {
      _ref?: string
    }
  }
}

export default function EventRow() {
  const [loading, setLoading] = useState(true)
  const [eventRowData, setEventRowData] = useState<EventRowData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "eventsRow"]|order(_createdAt desc){
          _id,
          title,
          text,
          image{
            asset{
              _ref
            }
          }
        }`
        const result = await client.fetch(query)
        setEventRowData(result || [])
      } catch (error) {
        console.error('Failed to fetch events row data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="events-rows">Loading...</div>
  if (!eventRowData.length) return <div className="events-rows">No events found.</div>

  return (
    <section className="events-rows">
      {eventRowData.map((item) => {
        const imageUrl = item.image?.asset?._ref
          ? builder.image(item.image).width(900).height(600).url()
          : ''

        return (
          <article key={item._id} className="event-row">
            <div className="event-row-image-wrap">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={item.title || 'Event image'}
                  className="event-row-image"
                />
              )}
            </div>

            <div className="event-row-content">
              <div className="event-row-header">
                <h3 className="event-row-title">{item.title || 'Untitled event'}</h3>
                <div className="event-row-actions">
                  <LearnMoreButton
                    buttonKey="events-row-learn-more"
                    fallbackDestination="/events"
                  />
                </div>
              </div>
              <p className="event-row-text">{item.text || ''}</p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
