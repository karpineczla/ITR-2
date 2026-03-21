import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import '../../styles/VideoSection.css'

interface VideoSectionProps {
  videoUrl?: string;
  altText?: string;
  className?: string;
}

const getEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }

    return url;
  } catch {
    return url;
  }
};

const isDirectVideoFile = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

export default function VideoSection({ videoUrl, altText, className }: VideoSectionProps) {
  const [fetchedVideo, setFetchedVideo] = useState<{ videoUrl?: string; altText?: string } | null>(null);

  useEffect(() => {
    if (videoUrl) {
      return;
    }

    const fetchVideoSection = async () => {
      try {
        const query = `*[_type == "videoSection"][0]{
          videoUrl,
          altText
        }`;
        const result = await client.fetch(query);
        setFetchedVideo(result ?? null);
      } catch {
        setFetchedVideo(null);
      }
    };

    fetchVideoSection();
  }, [videoUrl]);

  const resolvedVideoUrl = videoUrl ?? fetchedVideo?.videoUrl;
  const resolvedAltText = altText ?? fetchedVideo?.altText;

  if (!resolvedVideoUrl) {
    return null;
  }

  const embedUrl = getEmbedUrl(resolvedVideoUrl);

  return (
    <section className={`videoSection${className ? ` ${className}` : ''}`}>
      <div className="videoWrapper">
        {isDirectVideoFile(resolvedVideoUrl) ? (
          <video
            className="videoFrame"
            controls
            preload="metadata"
            src={resolvedVideoUrl}
            aria-label={resolvedAltText || 'About page video'}
          />
        ) : (
          <iframe
            className="videoFrame"
            src={embedUrl}
            title={resolvedAltText || 'About page video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
}
