import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import LearnMoreButton from "../components/general/LearnMoreButton";
import InteractiveDataLinksBox from "../components/interactiveDataPage/InteractiveDataLinksBox";
import "../styles/interactiveData.css";

export default function InteractiveData() {
    return (
        <main className="interactive-data-page">
            <Header />
            <TitleAndText sectionKey="interactive-data" />
            <InteractiveDataLinksBox />
            <div className="interactive-links__cta">
                <LearnMoreButton buttonKey="data-request" />
            </div>
            <Footer />
        </main>
    );
}