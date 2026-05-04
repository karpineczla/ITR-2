import { useState, useEffect } from 'react'
import { client } from '../../sanityClient'
import '../../styles/TitleAndText.css'

interface TitleTextData {
  _id: string
  sectionKey?: string
  title?: string
  subtitle?: string
  text?: unknown
  titleAlignment?: 'left' | 'center'
  subtitleAlignment?: 'left' | 'center'
  textAlignment?: 'left' | 'center'
}

interface TitleAndTextProps {
  sectionKey?: string
  title?: string
  subtitle?: string
}

type PortableTextMarkDef = {
  _key: string
  _type?: string
  href?: string
}

type PortableTextChild = {
  _type?: string
  text?: string
  marks?: string[]
}

type PortableTextBlock = {
  _key?: string
  _type?: string
  style?: string
  children?: PortableTextChild[]
  markDefs?: PortableTextMarkDef[]
}

function renderPortableText(value: unknown, linkClassName: string) {
  if (!Array.isArray(value)) {
    return <p>{String(value ?? '')}</p>
  }

  return (value as PortableTextBlock[]).map((block, blockIndex) => {
    const key = block._key ?? `block-${blockIndex}`
    const markDefs = block.markDefs ?? []
    const textChildren = (block.children ?? []).map((child, childIndex) => {
      const text = child.text ?? ''
      const marks = child.marks ?? []
      const linkMark = marks.find((mark) => markDefs.some((def) => def._key === mark && def.href))
      const linkDef = markDefs.find((def) => def._key === linkMark)

      if (linkDef?.href) {
        return (
          <a key={`${key}-${childIndex}`} className={linkClassName} href={linkDef.href}>
            {text}
          </a>
        )
      }

      return <span key={`${key}-${childIndex}`}>{text}</span>
    })

    switch (block.style) {
      case 'h2':
        return <h2 key={key}>{textChildren}</h2>
      case 'h3':
        return <h3 key={key}>{textChildren}</h3>
      default:
        return <p key={key}>{textChildren}</p>
    }
  })
}

export default function TitleAndText({ sectionKey, title, subtitle }: TitleAndTextProps) {
  const [loading, setLoading] = useState(true)
  const [blockData, setBlockData] = useState<TitleTextData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = sectionKey
          ? `*[_type == "titleAndText" && (
              sectionKey == $sectionKey ||
              lower(sectionKey) == lower($sectionKey) ||
              lower(sectionKey) == lower($sectionKeySpaced)
            )][0]{
              _id,
              sectionKey,
              title,
              subtitle,
              titleAlignment,
              subtitleAlignment,
              textAlignment,
              text
            }`
          : title
          ? `*[_type == "titleAndText" && title == $title][0]{
              _id,
              sectionKey,
              title,
              subtitle,
              titleAlignment,
              subtitleAlignment,
              textAlignment,
              text
            }`
          : subtitle
            ? `*[_type == "titleAndText" && subtitle == $subtitle][0]{
              _id,
              sectionKey,
              title,
              subtitle,
              titleAlignment,
              subtitleAlignment,
              textAlignment,
              text
            }`
          : `*[_type == "titleAndText"][0]{
              _id,
              sectionKey,
              title,
              subtitle,
              titleAlignment,
              subtitleAlignment,
              textAlignment,
              text
            }`
        const params = sectionKey
          ? { sectionKey, sectionKeySpaced: sectionKey.replace(/-/g, ' ') }
          : title
          ? { title }
          : subtitle
          ? { subtitle }
          : undefined
        const result = await client.fetch(query, params)
        setBlockData(result)
        //console.log('Title & Text data:)', result)
      } catch (error) {
        //console.error('Failed to fetch title & text data :(', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [sectionKey, title, subtitle])

  if (loading) return null
  if (!blockData)
    return (
      <div className="title-text-container">
        No data returned for `titleTextBlock`.
      </div>
    )

  const titleAlignmentClass =
    blockData.titleAlignment === 'center' ? 'title-text-align-center' : 'title-text-align-left'
  const subtitleAlignmentClass =
    blockData.subtitleAlignment === 'center' ? 'title-text-align-center' : 'title-text-align-left'
  const textAlignmentClass =
    blockData.textAlignment === 'center' ? 'title-text-align-center' : 'title-text-align-left'

  const isPortableText = Array.isArray(blockData.text)
  const sectionClass = sectionKey ? `title-text-${sectionKey.replace(/[^a-zA-Z0-9-]/g, '-')}` : ''

  return (
    <div className={`title-text-container ${sectionClass}`.trim()}>
      {blockData.title && <h2 className={`title-text-title ${titleAlignmentClass}`}>{blockData.title}</h2>}
      {blockData.subtitle && (
        <h3 className={`title-text-subtitle ${subtitleAlignmentClass}`}>{blockData.subtitle}</h3>
      )}
      <div className={`title-text-body ${textAlignmentClass}`}>
        {isPortableText ? (
          renderPortableText(blockData.text, 'title-text-link')
        ) : (
          <p>{(blockData.text as string) || ''}</p>
        )}
      </div>
    </div>
  )
}

