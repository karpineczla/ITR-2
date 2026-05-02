import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import LearnMoreButton from "../components/general/LearnMoreButton";
import TitleAndText from "../components/general/TitleAndText";
import TextWithImage from "../components/general/TextWithImage";
import BackButton from "../components/general/BackButton";
import "../styles/SurveyKit.css";

export default function SurveyKit() {
    return (
        <main className="survey-kit-page">
            <title>ITRR | Survey Kits</title>
            <Header />
            <BackButton to='/get-involved-and-resources' />
            <TitleAndText sectionKey="survey-kit" />
            <TitleAndText sectionKey="survey-kit-prices" />
            <section className="survey-kit-buttons-grid" aria-label="Survey kit links">
                <div className="survey-kit-buttons-column">
                    <h3 className="survey-kit-column-title">Samples</h3>
                    <LearnMoreButton buttonKey="survey-template-for-registered-participants" />
                    <LearnMoreButton buttonKey="montana-folk-festival-2019" />
                </div>
                <div className="survey-kit-buttons-column">
                    <h3 className="survey-kit-column-title">Examples</h3>
                    <LearnMoreButton buttonKey="survey-template-for-events" />
                </div>
            </section>
            <TextWithImage sectionKey="timeframe-and-contact-information" />
            <Footer />
        </main>
    )
}