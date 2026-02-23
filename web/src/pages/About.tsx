import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import historyImage from "../assets/historyImage.png";
import '../styles/aboutPage.css'


export default function About() {
  return (
        <main className="about-page">
            <Header />
    <div className="aboutContainer">
      
      {/* 2. hero video part */}
      <section className="videoSection">
        <div className="videoWrapper">
          {/* Replace with teh real video */}
          <div className="videoPlaceholder">
            <div className="playButton">▶</div>
          </div>
        </div>
      </section>

      {/* history  */}
      <section className="contentSection">
        <h2 className="sectionTitle">HISTORY</h2>
        <div className="historyGrid">
          <div className="imageCol">
            <img src={historyImage} alt="University Statue" className="historyImg" />
          </div>
          <div className="textCol">
            <p>
              The Institute for Tourism and Recreation Research (ITRR) was created in 1987 to 
              research travel, recreation, and tourism. Located in <u>The University of Montana</u>, 
              <u>W.A. Franke College of Forestry and Conservation</u>, ITRR serves as the 
              research arm for Montana's tourism and recreation industry.
            </p>
          </div>
        </div>
        
        <div className="historyFullWidth">
          <p>
            Two general sources fund the Institute's research. A portion of the state Lodging Facility Use Tax 
            revenues supports studies of statewide significance. More specialized studies of interest to particular 
            regions, counties, agencies, or businesses are funded through cooperative agreements, grants, or 
            contracts. ITRR provides some opportunities for research assistantships for graduate students 
            enrolled in the Society and Conservation Department at UM's <u>W.A. Franke College of Forestry and 
            Conservation</u>.
          </p>
        </div>
      </section>

      {/*  Mission */}
      <section className="contentSection missionSection">
        <h2 className="sectionTitle">OUR MISSION</h2>
        <p className="centeredText">
          The mission of the Institute for Tourism & Recreation Research (ITRR) is to conduct rigorous and 
          impartial research that empowers the tourism and recreation industries in Montana to make 
          informed decisions in planning, marketing, policy, and management. As part of the W.A. Franke 
          College of Forestry and Conservation at the University of Montana, ITRR is committed to the highest 
          academic integrity, ensuring transparency and excellence in all research efforts.
        </p>
      </section>
    </div>
            <Footer />
        </main>
    )
}