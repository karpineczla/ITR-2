import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import TitleAndText from "../components/general/TitleAndText";
import InteractiveDataLinksBox from "../components/interactiveDataPage/InteractiveDataLinksBox";
import "../styles/interactiveData.css";

export default function InteractiveData() {
    return (
        <main className="interactive-data-page">
            <Header />
            <TitleAndText sectionKey="interactive-data" />

            <InteractiveDataLinksBox />

            <Footer />
        </main>
    );
}