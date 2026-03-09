import { useEffect, useState } from 'react';
import '../styles/Subscribe.css'; 
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';

const Subscribe = () => {
  const [content, setContent] = useState<any>(null);

  const PROJECT_ID = "a9qy1267"; 
  const DATASET = "production";

  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "subscribePage"][0]{
      "imageUrl": mainImage.asset->url,
      description,
      externalLink
    }`);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setContent(json.result))
      .catch((err) => console.error("Error fetching subscribe data:", err));
  }, []);

  if (!content) return null;

  return (
    <main className="subscribe-page">
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
          
          <p className="subscribe-paragraph">
            {content.description}
          </p>

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