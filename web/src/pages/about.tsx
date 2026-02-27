import { useEffect, useState } from "react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import '../styles/aboutPage.css';

export default function About() {
  const [data, setData] = useState<any>(null);

  const PROJECT_ID = "a9qy1267"; 
  const DATASET = "production";

  useEffect(() => {
    // This query tells Sanity to return the .url of the image 
    const query = encodeURIComponent(`*[_type == "aboutPage"][0]{
      ...,
      "historyImageUrl": historyImage.asset->url
    }`);
    
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.result));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <main className="about-page">
      <Header />
      <div className="aboutContainer">
        
        {/* video */}
        <section className="videoSection">
          <div className="videoWrapper">
            <div className="videoPlaceholder">
              <p>{data.heroVideoUrl || "Video URL goes here"}</p>
            </div>
          </div>
        </section>

        {/* History  */}
        <section className="contentSection">
          <h2 className="sectionTitle">HISTORY</h2>
          <div className="historyGrid">
            <div className="imageCol">
              
              {data.historyImageUrl && (
                <img src={data.historyImageUrl} alt="History" className="historyImg" />
              )}
            </div>
            <div className="textCol">
              <p>{data.historyTextSide}</p>
            </div>
          </div>
          <div className="historyFullWidth">
            <p>{data.historyTextBottom}</p>
          </div>
        </section>

        {/* Mission  */}
        <section className="contentSection missionSection">
          <h2 className="sectionTitle">OUR MISSION</h2>
          <p className="centeredText">{data.missionText}</p>
        </section>
      </div>
      <Footer />
    </main>
  );
}