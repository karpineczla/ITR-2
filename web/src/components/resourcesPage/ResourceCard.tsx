import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faExternalLinkAlt, faImage } from '@fortawesome/free-solid-svg-icons'
import { PortableText } from '@portabletext/react'
import { client } from '../../sanityClient'
import '../../styles/ResourcesCards.css'

interface Resource {
  _id?: string
  _key?: string
  title: string
  resourceType: 'pdf' | 'link' | 'image'
  pdfFile?: { asset?: { url?: string } }
  externalUrl?: string
  imageFile?: { asset?: { url?: string } }
  description?: unknown
}

interface ResourceSectionDocument {
  _id: string
  sectionKey?: string
  cards?: Resource[]
}

interface ResourceCardProps {
  sectionKey?: string
}

const portableTextComponents = {
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || ''
      const isExternal = /^https?:\/\//i.test(href)
      return (
        <a
          href={href}
          className="resource-description-link"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }
  }
}

export default function ResourceCard({ sectionKey }: ResourceCardProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const query = sectionKey
          ? `*[_type == "resourceCards" && sectionKey == $sectionKey][0]{
              _id,
              sectionKey,
              cards[]{
                _key,
                title,
                resourceType,
                pdfFile{asset->{url}},
                externalUrl,
                imageFile{asset->{url}},
                description
              }
            }`
          : `*[_type == "resourceCards"]|order(_createdAt desc){
              _id,
              sectionKey,
              cards[]{
                _key,
                title,
                resourceType,
                pdfFile{asset->{url}},
                externalUrl,
                imageFile{asset->{url}},
                description
              }
            }`

        const result = await client.fetch<ResourceSectionDocument | ResourceSectionDocument[]>(query, sectionKey ? { sectionKey } : {})

        if (sectionKey) {
          setResources((result as ResourceSectionDocument | null)?.cards || [])
        } else {
          const documents = (result as ResourceSectionDocument[]) || []
          const flattened = documents.flatMap((doc) => doc.cards || [])
          setResources(flattened)
        }
      } catch (error) {
        console.error('Failed to fetch resources:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [sectionKey])

  if (loading) return <div>Loading...</div>

  return (
    <div className="resources-grid">
      {resources.map((resource) => {
        const href =
          resource.resourceType === 'pdf'
            ? resource.pdfFile?.asset?.url
            : resource.resourceType === 'image'
              ? resource.imageFile?.asset?.url
              : resource.externalUrl

        const opensInNewTab = resource.resourceType === 'link' || resource.resourceType === 'image'

        const icon =
          resource.resourceType === 'pdf'
            ? faFilePdf
            : resource.resourceType === 'image'
              ? faImage
              : faExternalLinkAlt

        if (resource.resourceType === 'image' && href) {
          return (
            <a
              key={resource._key || resource._id || resource.title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
            >
              <div className="resource-card-content">
                <h3>{resource.title}</h3>
                {resource.description as any && (
                  <div className="resource-card-description">
                    <PortableText value={resource.description as any} components={portableTextComponents} />
                  </div>
                )}
              </div>
              <span className="resource-icon-link" aria-hidden="true">
                <FontAwesomeIcon icon={icon} className="resource-icon" />
              </span>
            </a>
          )
        }

        return (
          <div key={resource._key || resource._id || resource.title} className="resource-card">
            <div className="resource-card-content">
              <h3>{resource.title}</h3>
              {resource.description as any && (
                <div className="resource-card-description">
                  <PortableText value={resource.description as any} components={portableTextComponents} />
                </div>
              )}
            </div>
            {href ? (
              <a
                href={href}
                target={opensInNewTab ? '_blank' : undefined}
                rel={opensInNewTab ? 'noopener noreferrer' : undefined}
                download={resource.resourceType === 'pdf'}
                className="resource-icon-link"
              >
                <FontAwesomeIcon icon={icon} className="resource-icon" />
              </a>
            ) : (
              <span className="resource-icon-link" aria-hidden="true">
                <FontAwesomeIcon icon={icon} className="resource-icon" />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
