import { useEffect, useState } from 'react'
import { createImageUrlBuilder } from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import { client } from '../../sanityClient'
import LearnMoreButton from '../general/LearnMoreButton'
import '../../styles/EventRow.css'

const builder = createImageUrlBuilder(client)

interface EventRowData {
  _id: string
  title?: string
  text?: unknown
  buttonKey?: string
  rowKey?: string
  image?: {
    asset?: {
      _ref?: string
    }
  }
}

interface EventRowProps {
  rowKey?: string
  title?: string
}

const portableTextComponents = {
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || ''
      const isExternal = /^https?:\/\//i.test(href)
      if (!href) {
        return <>{children}</>
      }

      return (
        <a
          href={href}
          className="event-row-text-link"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }
  }
}

//can use the rowkey or title to say which row you want 
export default function EventRow({ rowKey, title }: EventRowProps) {
  const [loading, setLoading] = useState(true)
  const [eventRowData, setEventRowData] = useState<EventRowData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "eventsRow" ${rowKey ? '&& rowKey == $rowKey' : title ? '&& title == $title' : ''}]|order(_createdAt desc){
          _id,
          title,
          text,
          buttonKey,
          rowKey,
          image{
            asset{
              _ref
            }
          }
        }`
        const params = rowKey ? { rowKey } : title ? { title } : {}
        const result = await client.fetch(query, params)
        setEventRowData(result || [])
      } catch (error) {
        console.error('Failed to fetch events row data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [rowKey, title])

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
            {imageUrl && (
              <div className="event-row-image-wrap">
                <img
                  src={imageUrl}
                  alt={item.title || 'Event image'}
                  className="event-row-image"
                />
              </div>
            )}

            <div className={`event-row-content ${!imageUrl ? 'event-row-content-no-image' : ''}`.trim()}>
              <h3 className="event-row-title">{item.title || 'Untitled event'}</h3>
              <div className="event-row-text">
                {Array.isArray(item.text) ? (
                  <PortableText value={item.text} components={portableTextComponents} />
                ) : (
                  <p>{typeof item.text === 'string' ? item.text : ''}</p>
                )}
              </div>
              <div className="event-row-actions">
                <LearnMoreButton
                  buttonKey={item.buttonKey || ''}
                  fallbackDestination="/events"
                />
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
