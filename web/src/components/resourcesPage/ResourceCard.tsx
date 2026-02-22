import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { client } from '../../sanityClient'
import '../../styles/ResourcesCards.css'

interface Resource {
  _id: string
  title: string
  resourceType: 'pdf' | 'link'
  pdfFile?: { asset?: { url?: string } }
  externalUrl?: string
  description?: string
}

export default function ResourceCard() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const query = `*[_type == "resource"]|order(_createdAt desc){
          _id,
          title,
          resourceType,
          pdfFile{asset->{url}},
          externalUrl,
          description
        }`
        const result = await client.fetch(query)
        setResources(result || [])
      } catch (error) {
        console.error('Failed to fetch resources:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="resources-grid">
      {resources.map((resource) => (
        <div key={resource._id} className="resource-card">
          <div className="resource-card-content">
            <h3>{resource.title}</h3>
            {resource.description && <p>{resource.description}</p>}
          </div>
          <a 
            href={resource.resourceType === 'pdf' ? resource.pdfFile?.asset?.url : resource.externalUrl}
            target={resource.resourceType === 'link' ? '_blank' : undefined}
            rel={resource.resourceType === 'link' ? 'noopener noreferrer' : undefined}
            download={resource.resourceType === 'pdf'}
            className="resource-icon-link"
          >
            <FontAwesomeIcon 
              icon={resource.resourceType === 'pdf' ? faFilePdf : faExternalLinkAlt}
              className="resource-icon"
            />
          </a>
        </div>
      ))}
    </div>
  )
}
