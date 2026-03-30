import VideoSection from './VideoSection'
import TitleAndText from './TitleAndText'
import '../../styles/VideoWithTextRow.css'

interface VideoWithTextRowProps {
  side?: 'left' | 'right'
  sectionKey: string
}

export default function VideoWithTextRow({ side = 'left', sectionKey }: VideoWithTextRowProps) {
  return (
    <section className={`video-text-row video-text-row-${side}`}>
      <VideoSection className="video-text-row-video" />
      <div className="video-text-row-content">
        <TitleAndText sectionKey={sectionKey} />
      </div>
    </section>
  )
}
