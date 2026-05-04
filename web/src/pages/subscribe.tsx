import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import '../styles/Subscribe.css'; 
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import { client } from '../sanityClient';

interface SubscribeContent {
  imageUrl?: string;
  description?: unknown;
  externalLink?: string;
}

const Subscribe = () => {
  const [content, setContent] = useState<SubscribeContent | null>(null);

  const portableTextComponents = {
    marks: {
      link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
        const href = value?.href || '';
        const isExternal = /^https?:\/\//i.test(href);
        if (!href) {
          return <>{children}</>;
        }

        return (
          <a
            href={href}
            className="subscribe-paragraph-link"
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        );
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch<SubscribeContent>(`*[_type == "subscribePage"][0]{
          "imageUrl": mainImage.asset->url,
          description,
          externalLink
        }`);
        setContent(result || null);
      } catch (err) {
        console.error('Error fetching subscribe data:', err);
        setContent(null);
      }
    };

    fetchData();
  }, []);

  if (!content) return null;

  return (
    <main className="subscribe-page">
      <title>ITRR | Subcribe to Newsletter</title>
      <Header />
    <div className="subscribe-page-wrapper">
      <div className="subscribe-container">
       
        <div className="subscribe-graphic">
          <div className="graphic-circle">
            <img src={content.imageUrl} alt="Icon" className="envelope-icon" />
          </div>
        </div>

      
        <div className="subscribe-text">
          <h1 className="subscribe-heading">Subscribe</h1>
          
          <div className="subscribe-paragraph">
            <PortableText value={content.description as any} components={portableTextComponents} />
          </div>

          <div className="button-container">
            <a 
              href={content.externalLink} 
              className="subscribe-button"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Subscribe to Newsletter
              <span className="button-arrow">➔</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </main>
  );
};

export default Subscribe;