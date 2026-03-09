import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import VideoSection from "../components/general/VideoSection";
import TitleAndText from "../components/general/TitleAndText";
import TextWithImage from "../components/general/TextWithImage";
import '../styles/aboutPage.css';

export default function About() {
    return (
        <main className="about-page">
            <Header />
            <VideoSection />
            <TextWithImage sectionKey="about-history-row" />
            <TitleAndText sectionKey="history-part-2" />
            <TitleAndText sectionKey="about-mission" />
            <Footer />
        </main>
    );
}