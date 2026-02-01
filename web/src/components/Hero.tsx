import { useState, useEffect } from 'react'
import { client } from '../sanityClient'
import { createImageUrlBuilder } from '@sanity/image-url'
import '../styles/Hero.css'

const builder = createImageUrlBuilder(client)

interface HeroData {
  _id: string
  images: Array<{
    _type: string
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
            images[]{asset->{_ref,url}}
          }`
          const result = await client.fetch(query)
          setHeroData(result)
          console.log(result)
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
    return <div className="hero-loading">Loading hero section...</div>
  }

  if (!heroData?.images || heroData.images.length === 0) {
    return <div className="hero-empty">No hero images configured</div>
  }

  const currentImage = heroData.images[currentImageIndex]
  const imageUrl = builder.image(currentImage).url()

  return (
    <div className="hero">
      <div className="hero-container">
        <img
          src={imageUrl}
          alt="Hero image"
          className="hero-image"
        />
      </div>
    </div>
  )
}
