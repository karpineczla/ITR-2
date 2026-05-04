import { useState, useEffect } from 'react'
import { client } from '../../sanityClient'
import { createImageUrlBuilder } from '@sanity/image-url'
import LearnMoreButton from '../general/LearnMoreButton'
import '../../styles/Hero.css'

const builder = createImageUrlBuilder(client)

interface HeroData {
  _id: string
  images: Array<{
    _type: string
    alt?: string
    overlayTitle?: string
    overlayText?: string
    buttonKey?: string
    fallbackDestination?: string
    asset: {
      _ref: string
    }
  }>
}

interface HeroProps {
  data?: HeroData
}

export default function Hero({ data }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(!data)
  const [heroData, setHeroData] = useState<HeroData | null>(data || null)

  useEffect(() => {
    if (!data) {
      const fetchHero = async () => {
        try {
          const query = `*[_type == "hero"][0]{
            _id,
            images[]{
              alt,
              overlayTitle,
              overlayText,
              buttonKey,
              fallbackDestination,
              asset->{_ref,url}
            }
          }`
          const result = await client.fetch(query)
          setHeroData(result)
        } catch (error) {
          console.error('Failed to fetch hero data:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchHero()
    }
  }, [data])

  //Auto-scroll images
  useEffect(() => {
    if (!heroData?.images || heroData.images.length === 0) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroData.images.length)
    }, 5000) //change every 5 seconds

    return () => clearInterval(interval)
  }, [heroData])

  if (loading) {
    return null
  }

  if (!heroData?.images || heroData.images.length === 0) {
    return <div className="hero-empty">No hero images configured</div>
  }

  const currentImage = heroData.images[currentImageIndex]
  const imageUrl = builder.image(currentImage).url()
  const hasOverlayContent =
    !!currentImage.overlayTitle?.trim() ||
    !!currentImage.overlayText?.trim() ||
    !!currentImage.buttonKey?.trim() ||
    !!currentImage.fallbackDestination?.trim()

  return (
    <div className="hero">
      <div className="hero-container">
        <img
          src={imageUrl}
          alt={currentImage.alt?.trim() || currentImage.overlayTitle?.trim() || 'Hero image'}
          className="hero-image"
        />
        {hasOverlayContent && (
          <div className="hero-overlay" aria-label="Hero content overlay">
            {currentImage.overlayTitle?.trim() && (
              <h2 className="hero-overlay-title">{currentImage.overlayTitle}</h2>
            )}
            {currentImage.overlayText?.trim() && (
              <p className="hero-overlay-text">{currentImage.overlayText}</p>
            )}
            {(currentImage.buttonKey?.trim() || currentImage.fallbackDestination?.trim()) && (
              <div className="hero-overlay-action">
                <LearnMoreButton
                  buttonKey={currentImage.buttonKey?.trim() || 'hero-default'}
                  fallbackDestination={currentImage.fallbackDestination?.trim() || '/'}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
